const faqs = [
  {
    q: "Do I need any previous knowledge of Chinese?",
    a: "Not at all. Our courses start from zero, with your very first “nǐ hǎo”. We guide you step by step through pronunciation, tones and basic characters before moving on to real conversations.",
  },
  {
    q: "How do the classes work?",
    a: "All classes are live and online, so you can join from anywhere. Each class lasts 50 minutes and is taught in small groups, giving you plenty of time to speak and ask questions.",
  },
  {
    q: "How can I get into the free Saturday class?",
    a: "Comment on our latest Facebook post, share it with your friends and send a private message to the Gabo en Asia Facebook page. You'll receive your access link there.",
  },
  {
    q: "What happens if the free class is full?",
    a: "The live class is limited to 20 participants, but you can still watch it on our Facebook Live and follow along.",
  },
  {
    q: "Are the explanations in Spanish?",
    a: "Yes. The method is designed for Spanish speakers, and you can ask questions and get explanations in Spanish whenever you need them.",
  },
  {
    q: "Is it safe to pay for the courses online?",
    a: "Yes. Your payment information is protected on every purchase, so you can book your classes with confidence.",
  },
  {
    q: "Will I receive study material?",
    a: "You'll get exclusive guides, vocabulary lists and exercises created by Gabo to practice between classes.",
  },
];

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="why-us-header">
        <span className="section-tag">FAQ · 常见问题</span>
        <h2>
          Frequently Asked <span>Questions</span>
        </h2>
        <p>
          Everything you need to know before starting your Chinese journey with
          Gabo en Asia.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>
              {item.q}
              <span className="faq-icon" aria-hidden="true">+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
