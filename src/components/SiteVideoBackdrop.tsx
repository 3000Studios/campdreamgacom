export const SiteVideoBackdrop = (): JSX.Element => (
  <div aria-hidden="true" className="site-video-backdrop">
    <video
      autoPlay
      className="site-video-backdrop-media"
      loop
      muted
      playsInline
      poster="/media/252131-poster.jpg"
      preload="auto"
    >
      <source src="/media/252131-web.mp4" type="video/mp4" />
    </video>
    <div className="site-video-backdrop-overlay" />
  </div>
);
