export const SiteVideoBackdrop = (): JSX.Element => (
  <div aria-hidden="true" className="site-video-backdrop">
    <video
      autoPlay
      className="site-video-backdrop-media"
      loop
      muted
      playsInline
      poster="/media/temp-site-video-poster.jpg"
      preload="auto"
    >
      <source src="/media/temp-site-video.mp4" type="video/mp4" />
    </video>
    <div className="site-video-backdrop-overlay" />
  </div>
);
