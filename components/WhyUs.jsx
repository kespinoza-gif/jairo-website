const features = [
  {
    title: "Native Pronunciation",
    text: "Learn the tones and sounds exactly as they are spoken in China, so people understand you from day one.",
    icon: (
      <>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </>
    ),
  },
  {
    title: "Small Groups",
    text: "Fewer students per class means more time to speak, practice and get personal feedback from your teacher.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "100% Secure Payments",
    text: "Book your classes with confidence. Your payment information is protected on every purchase.",
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16.5" r="1.5" />
      </>
    ),
  },
  {
    title: "Exclusive Material",
    text: "Get guides, vocabulary lists and exercises created by Gabo that you won't find anywhere else.",
    icon: (
      <>
        <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
        <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
      </>
    ),
  },
  {
    title: "50-Minute Classes",
    text: "Focused lessons that fit into your day, long enough to learn and short enough to stay fully concentrated.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
  {
    title: "Support in Spanish",
    text: "Ask questions and get explanations in Spanish whenever you need them, so nothing gets lost in translation.",
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="13" y2="13" />
      </>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="why-us" id="por-que">
      <div className="why-us-header">
        <span className="section-tag">Why Gabo en Asia</span>
        <h2>
          Why Learn <span>With Us?</span>
        </h2>
        <p>
          We combine real experience living in China with a teaching method made
          for Spanish speakers. Every detail is designed so you learn faster,
          feel confident speaking and actually enjoy the process.
        </p>
      </div>

      <div className="features">
        {features.map((feature) => (
          <article className="feature" key={feature.title}>
            <div className="feature-image">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {feature.icon}
              </svg>
            </div>
            <div className="feature-body">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
