// Replace with the real Gabo en Asia Facebook page link
const FACEBOOK_URL = "https://www.facebook.com/";

const steps = [
  { title: "Comment", text: "Leave a comment on our latest Facebook post." },
  { title: "Share", text: "Share the post with your friends who want to learn Chinese too." },
  { title: "Send a private message", text: "Message the Gabo en Asia Facebook page and receive your access link." },
];

export default function FreeClass() {
  return (
    <section className="free-class" id="clase-gratis">
      <div className="free-class-container">
        <div>
          <span className="section-tag">Free Class · Every Saturday</span>
          <h2>
            Your First Chinese Class <span>Is On Us</span>
          </h2>
          <p className="free-class-intro">
            Every Saturday we open a free live class so you can try Mandarin with
            Gabo before you commit to anything. Spots are limited to 20 participants
            so everyone gets the chance to practice and ask questions.
          </p>

          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-number">{i + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="spot-card">
          <p className="spot-day">Saturday Live Class</p>
          <p className="spot-price">FREE</p>
          <p className="spot-limit">Only 20 spots available</p>
          <div className="spot-bar"><span></span></div>

          <a href={FACEBOOK_URL} target="_blank" rel="noopener" className="btn-free">
            I Want My Place for Free <span className="arrow">→</span>
          </a>

          <p className="live-note">
            <span className="live-dot"></span>
            Didn&apos;t get a spot? Don&apos;t worry, you can still watch the class on our{" "}
            <a href={FACEBOOK_URL} target="_blank" rel="noopener">Facebook Live</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
