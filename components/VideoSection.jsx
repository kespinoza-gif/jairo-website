const VIDEO_ID = "e9x2Cy2rP4U";

export default function VideoSection() {
  return (
    <section className="video-section" id="video">
      <div className="video-container">
        <div className="video-text">
          <span className="section-tag">Watch · 看一看</span>
          <h2>
            See How We <span>Teach Chinese</span>
          </h2>
          <p>
            Get a quick taste of a Gabo en Asia lesson. Real Mandarin, real
            situations and explanations in Spanish, all in under a minute.
          </p>
          <a href="#clase-gratis" className="btn-hero">Join the Free Class</a>
        </div>

        <div className="video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
            title="Gabo en Asia on YouTube"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
