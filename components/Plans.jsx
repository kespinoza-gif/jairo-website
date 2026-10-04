const plans = [
  {
    name: "Free Class",
    price: "$0",
    period: "every Saturday",
    description: "Try Mandarin with Gabo before you commit to anything.",
    features: [
      "One free live class every Saturday",
      "Limited to 20 participants",
      "Watch on Facebook Live if it's full",
      "Basic phrases and pronunciation",
    ],
    cta: "Get My Free Spot",
    href: "#clase-gratis",
  },
  {
    name: "VIP Subscription",
    price: "$40",
    period: "per month",
    description: "Everything you need to go from zero to real conversations.",
    features: [
      "Live online 50-minute classes",
      "Small groups with personal feedback",
      "Exclusive guides, vocabulary and exercises",
      "Support in Spanish whenever you need it",
      "Pronunciation, tones and characters step by step",
    ],
    cta: "Subscribe Now",
    // Replace with the real checkout link
    href: "#contacto",
    featured: true,
  },
  {
    name: "Private Classes",
    price: "Custom",
    period: "contact us",
    description: "One-on-one lessons built around your goals and schedule.",
    features: [
      "One-on-one classes with Gabo",
      "Schedule that fits your routine",
      "Content tailored to your goals",
      "Support in Spanish",
    ],
    cta: "Contact Us",
    href: "#contacto",
  },
];

export default function Plans() {
  return (
    <section className="plans" id="cursos">
      <div className="why-us-header">
        <span className="section-tag">Plans · 课程</span>
        <h2>
          Choose Your <span>Plan</span>
        </h2>
        <p>
          Start for free, go further with the VIP subscription or learn at your
          own pace with private classes.
        </p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <article className={`plan${plan.featured ? " plan-featured" : ""}`} key={plan.name}>
            {plan.featured && <span className="plan-badge">Most Popular</span>}
            <h3>{plan.name}</h3>
            <p className="plan-price">
              {plan.price} <span>{plan.period}</span>
            </p>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a href={plan.href} className="plan-button">{plan.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
