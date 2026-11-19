import Image from "next/image";
import { collection } from "./collection";
import DemoForm from "./demo-form";

const steps = [
  { title: "Collect little things", description: "An old ticket stub or the color of the evening sky can be the start of a postcard." },
  { title: "Put it on paper", description: "We pick the colors, try a few papers, and pull a proof to see how the idea feels in your hands." },
  { title: "Send it off", description: "Write a few lines, add a stamp, and give someone something good to find in their mailbox." },
];

const questions = [
  { question: "What does Cloud Post Studio make?", answer: "It is an imaginary stationery studio making postcards, notebooks, and envelopes for little notes." },
  { question: "What is in the newsletter?", answer: "Think of it as a letter from our workbench, with fresh sketches, seasonal colors, and an occasional writing prompt." },
  { question: "Will I receive a real newsletter?", answer: "This is a demo. The form sends a sample subscription and shows the result on this page. Your email address is never stored." },
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-marquee">
          <div className="marquee-track" aria-hidden="true">
            {[1, 2].map((copy) => (
              <div className="marquee-copy" key={copy}>CLOUD POST STUDIO <span>✦</span></div>
            ))}
          </div>
          <label className="marquee-control">
            <input type="checkbox" />
            Pause scrolling text
          </label>
        </div>
        <div className="hero-index">
          <div className="shell"><span>An imaginary stationery studio</span><span>Postcards · Notebooks · Envelopes</span></div>
        </div>
        <div className="shell hero-inner">
          <div className="hero-copy">
            <h1 id="hero-title">Little things,<br />sent on paper.</h1>
            <p className="hero-description">Postcards, notebooks, and envelopes for the things worth writing by hand.</p>
            <a className="button hero-button" href="#bo-suu-tap">Explore the collection <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <Image className="hero-art" src="/buu-dien-may.webp" alt="" width={1000} height={1000} sizes="(max-width: 720px) 88vw, 45vw" preload />
          </div>
        </div>
      </section>

      <section className="collection" id="bo-suu-tap" aria-labelledby="collection-title">
        <div className="shell collection-inner">
          <div className="collection-pin">
            <div className="collection-intro scroll-reveal">
              <p className="section-label">The collection</p>
              <h2 id="collection-title">Things worth dropping in the mail.</h2>
              <p>Three pieces of stationery, each with a story from the studio.</p>
            </div>
          </div>
          <div className="collection-grid">
            {collection.map((item) => (
              <article className="product-card" id={"item-" + item.slug} key={item.slug}>
                <a href={"/bo-suu-tap/" + item.slug}>
                  <div className="product-media" style={{ viewTransitionName: "paper-" + item.slug }}>
                    <Image src={item.image} alt="" width={1200} height={900} sizes="(max-width: 720px) 92vw, 44vw" />
                  </div>
                  <div className="product-caption scroll-reveal">
                    <span className="section-label">{item.category}</span>
                    <h3>{item.title}</h3>
                    <span className="product-arrow" aria-hidden="true">↗</span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process" id="chuyen-xuong" aria-labelledby="process-title">
        <div className="studio-scene">
          <div className="shell studio-stage">
            <div className="studio-heading">
              <p className="section-label">From the studio</p>
              <h2 id="process-title">From workbench to mailbox.</h2>
            </div>
            <ol className="steps">
              {steps.map(({ title, description }, index) => (
                <li key={title}>
                  <span className="step-index" aria-hidden="true">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="subscribe" id="demo" aria-labelledby="demo-title">
        <div className="shell subscribe-layout">
          <div className="scroll-reveal">
            <p className="section-label">The studio newsletter</p>
            <h2 id="demo-title">Good mail<br />incoming.</h2>
            <p>A peek at our workbench, with new sketches, seasonal paper colors, and ideas for your next letter.</p>
          </div>
          <div className="subscribe-form">
            <DemoForm />
            <span className="postmark" aria-hidden="true">✦</span>
          </div>
        </div>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div className="shell faq-layout">
          <h2 className="scroll-reveal" id="faq-title">A few things<br />people ask.</h2>
          <div className="faq-list scroll-reveal">
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
