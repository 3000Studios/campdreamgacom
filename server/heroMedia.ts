import type { ServerEnv } from './config.js';

type HeroVideoProvider = 'pexels' | 'pixabay';

export interface HeroVideoAsset {
  attributionName: string;
  attributionUrl: string;
  duration: number;
  height: number;
  id: string;
  posterUrl: string;
  provider: HeroVideoProvider;
  sourceUrl: string;
  videoUrl: string;
  width: number;
}

export interface HeroMediaPayload {
  query: string;
  results: HeroVideoAsset[];
  selected: HeroVideoAsset | null;
}

interface PexelsVideoFile {
  file_type?: string;
  height?: number | null;
  link?: string;
  quality?: string;
  width?: number | null;
}

interface PexelsVideo {
  duration?: number;
  height?: number;
  id: number;
  image?: string;
  url?: string;
  user?: {
    name?: string;
    url?: string;
  };
  video_files?: PexelsVideoFile[];
  width?: number;
}

interface PixabayVideoVariant {
  height?: number;
  thumbnail?: string;
  url?: string;
  width?: number;
}

interface PixabayVideoHit {
  duration?: number;
  id: number;
  pageURL?: string;
  type?: string;
  user?: string;
  videos?: {
    large?: PixabayVideoVariant;
    medium?: PixabayVideoVariant;
    small?: PixabayVideoVariant;
    tiny?: PixabayVideoVariant;
  };
}

type RankedPexelsVideoFile = PexelsVideoFile & { height: number; link: string; width: number };
type RankedPixabayVariant = PixabayVideoVariant & { url: string; width: number; height: number };

const cacheTtlMs = 1000 * 60 * 60 * 24;
const defaultHeroVideoSearchQuery = 'summer camp outdoors';
const requestTimeoutMs = 8000;
const topResultCount = 6;
const heroMediaCache = new Map<string, { expiresAt: number; payload: HeroMediaPayload }>();

const sanitizeQuery = (requestedQuery: string | undefined, fallbackQuery: string): string => {
  const candidate = requestedQuery?.trim() || fallbackQuery.trim();
  return candidate.slice(0, 100) || defaultHeroVideoSearchQuery;
};

const scoreVideoDimensions = (width: number, height: number): number => {
  if (width <= 0 || height <= 0) {
    return 0;
  }

  const aspectRatio = width / height;
  const aspectPenalty = Math.abs(aspectRatio - 16 / 9) * 28;
  const widthPenalty = Math.abs(width - 1280) / 210;
  const heightPenalty = Math.abs(height - 720) / 120;

  return 100 - aspectPenalty - widthPenalty - heightPenalty;
};

const scoreHeroVideo = (video: HeroVideoAsset): number => {
  let score = scoreVideoDimensions(video.width, video.height);

  if (video.duration >= 6 && video.duration <= 18) {
    score += 10;
  } else if (video.duration >= 4 && video.duration <= 24) {
    score += 4;
  }

  if (video.provider === 'pexels') {
    score += 0.25;
  }

  return score;
};

const compareHeroVideos = (left: HeroVideoAsset, right: HeroVideoAsset): number =>
  scoreHeroVideo(right) - scoreHeroVideo(left) || right.width - left.width || right.height - left.height;

const selectPexelsVideoFile = (videoFiles: PexelsVideoFile[] | undefined): RankedPexelsVideoFile | null => {
  if (!videoFiles?.length) {
    return null;
  }

  const candidates = videoFiles.filter(
    (videoFile): videoFile is RankedPexelsVideoFile =>
      videoFile.file_type === 'video/mp4' &&
      typeof videoFile.link === 'string' &&
      videoFile.link.length > 0 &&
      typeof videoFile.width === 'number' &&
      typeof videoFile.height === 'number',
  );

  if (candidates.length === 0) {
    return null;
  }

  const [selectedVideoFile] = [...candidates].sort((left, right) => {
    const qualityWeight = (videoFile: PexelsVideoFile): number => (videoFile.quality === 'hd' ? 1 : 0);
    return (
      scoreVideoDimensions(right.width, right.height) +
      qualityWeight(right) -
      scoreVideoDimensions(left.width, left.height) -
      qualityWeight(left)
    );
  });

  return selectedVideoFile ?? null;
};

const selectPixabayVariant = (variants: PixabayVideoHit['videos']): RankedPixabayVariant | null => {
  if (!variants) {
    return null;
  }

  const orderedVariants = [variants.medium, variants.small, variants.large, variants.tiny].filter(
    (variant): variant is RankedPixabayVariant =>
      typeof variant?.url === 'string' &&
      typeof variant.width === 'number' &&
      typeof variant.height === 'number',
  );

  return orderedVariants[0] ?? null;
};

const fetchJson = async <T>(url: URL, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(requestTimeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Request to ${url.origin} failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
};

const searchPexelsVideos = async (apiKey: string, query: string): Promise<HeroVideoAsset[]> => {
  const url = new URL('https://api.pexels.com/v1/videos/search');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('size', 'medium');
  url.searchParams.set('per_page', String(topResultCount));

  const payload = await fetchJson<{ videos?: PexelsVideo[] }>(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  return (payload.videos ?? []).flatMap((video) => {
    const videoFile = selectPexelsVideoFile(video.video_files);
    const posterUrl = video.image?.trim() ?? '';
    const sourceUrl = video.url?.trim() ?? 'https://www.pexels.com/';

    if (!videoFile || !posterUrl) {
      return [];
    }

    const width = videoFile.width || video.width || 0;
    const height = videoFile.height || video.height || 0;

    if (width <= 0 || height <= 0) {
      return [];
    }

    return [
      {
        attributionName: video.user?.name?.trim() || 'Pexels contributor',
        attributionUrl: video.user?.url?.trim() || sourceUrl,
        duration: video.duration ?? 0,
        height,
        id: `pexels-${video.id}`,
        posterUrl,
        provider: 'pexels',
        sourceUrl,
        videoUrl: videoFile.link,
        width,
      } satisfies HeroVideoAsset,
    ];
  });
};

const searchPixabayVideos = async (apiKey: string, query: string): Promise<HeroVideoAsset[]> => {
  const url = new URL('https://pixabay.com/api/videos/');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', query);
  url.searchParams.set('video_type', 'film');
  url.searchParams.set('safesearch', 'true');
  url.searchParams.set('order', 'popular');
  url.searchParams.set('per_page', String(topResultCount));

  const payload = await fetchJson<{ hits?: PixabayVideoHit[] }>(url);

  return (payload.hits ?? []).flatMap((hit) => {
    if (hit.type === 'animation') {
      return [];
    }

    const variant = selectPixabayVariant(hit.videos);
    const sourceUrl = hit.pageURL?.trim() ?? 'https://pixabay.com/videos/';
    const posterUrl = variant?.thumbnail?.trim() ?? '';

    if (!variant || !posterUrl) {
      return [];
    }

    return [
      {
        attributionName: hit.user?.trim() || 'Pixabay contributor',
        attributionUrl: sourceUrl,
        duration: hit.duration ?? 0,
        height: variant.height,
        id: `pixabay-${hit.id}`,
        posterUrl,
        provider: 'pixabay',
        sourceUrl,
        videoUrl: variant.url,
        width: variant.width,
      } satisfies HeroVideoAsset,
    ];
  });
};

export const findHeroMedia = async (
  env: Pick<ServerEnv, 'HERO_VIDEO_SEARCH_QUERY' | 'PEXELS_API_KEY' | 'PIXABAY_API_KEY'>,
  requestedQuery?: string,
): Promise<HeroMediaPayload> => {
  const query = sanitizeQuery(requestedQuery, env.HERO_VIDEO_SEARCH_QUERY);
  const cacheKey = query.toLowerCase();
  const cached = heroMediaCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.payload;
  }

  const tasks: Promise<HeroVideoAsset[]>[] = [];

  if (env.PEXELS_API_KEY) {
    tasks.push(searchPexelsVideos(env.PEXELS_API_KEY, query));
  }

  if (env.PIXABAY_API_KEY) {
    tasks.push(searchPixabayVideos(env.PIXABAY_API_KEY, query));
  }

  const settledResults = await Promise.allSettled(tasks);
  const results = settledResults.flatMap((result) => {
    if (result.status === 'rejected') {
      console.warn('Hero media provider lookup failed.', result.reason);
      return [];
    }

    return result.value;
  });

  const payload: HeroMediaPayload = {
    query,
    results: [...results].sort(compareHeroVideos).slice(0, topResultCount),
    selected: null,
  };

  payload.selected = payload.results[0] ?? null;

  heroMediaCache.set(cacheKey, {
    expiresAt: Date.now() + cacheTtlMs,
    payload,
  });

  return payload;
};
