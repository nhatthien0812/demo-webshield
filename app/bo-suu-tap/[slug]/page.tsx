import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collection } from "../../collection";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return collection.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = collection.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return { title: item.title + " — Cloud Post Studio", description: item.detail };
}

export default async function CollectionDetail({ params }: Props) {
  const { slug } = await params;
  const index = collection.findIndex((entry) => entry.slug === slug);
  const item = collection[index];
  if (!item) notFound();
  const next = collection[(index + 1) % collection.length];

  return (
    <main id="main" className="detail">
      <header className="detail-header" data-tone={item.tone}>
        <div className="shell">
          <nav className="detail-crumb" aria-label="Breadcrumb">
            <a href={"/#item-" + item.slug}>← Collection</a>
            <span>{item.category}</span>
          </nav>
          <h1>{item.title}</h1>
          <p>{item.detail}</p>
        </div>
      </header>

      <div className="detail-visual">
        <div className="product-media" style={{ viewTransitionName: "paper-" + item.slug }}>
          <Image src={item.image} alt={item.alt} width={1200} height={900} sizes="(max-width: 720px) 100vw, 73vw" preload />
        </div>
      </div>

      <section className="shell detail-story" aria-labelledby="story-title">
        <div className="scroll-reveal">
          <h2 id="story-title">Behind the paper.</h2>
          <p>{item.story}</p>
        </div>
        <dl>
          <div><dt>Materials</dt><dd>{item.materials}</dd></div>
          <div><dt>Size</dt><dd>{item.format}</dd></div>
        </dl>
      </section>

      <a className="detail-next" href={"/bo-suu-tap/" + next.slug} data-tone={next.tone}>
        <div className="shell">
          <span className="section-label">Up next</span>
          <span className="detail-next-title">{next.title} <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </main>
  );
}
