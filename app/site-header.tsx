"use client";

import Image from "next/image";
import { type CSSProperties, useRef } from "react";

const navigation = [
  { href: "/#bo-suu-tap", label: "Collection" },
  { href: "/#chuyen-xuong", label: "Studio" },
  { href: "/#faq", label: "FAQ" },
];

function RollingLabel({ text }: { text: string }) {
  return (
    <span className="nav-label" aria-hidden="true">
      {Array.from(text, (character, index) => {
        const glyph = character === " " ? "\u00a0" : character;
        return (
          <span className="nav-glyph" key={index} style={{ "--glyph-index": index } as CSSProperties}>
            <span>{glyph}</span><span>{glyph}</span>
          </span>
        );
      })}
    </span>
  );
}

export default function SiteHeader() {
  const menu = useRef<HTMLDivElement>(null);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="/" aria-label="Cloud Post Studio — Home">
          <Image src="/mail-mark.svg" alt="" width={27} height={27} />
          Cloud Post Studio
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <a className="nav-roll" href={href} key={href} aria-label={label}>
              <RollingLabel text={label} />
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="button header-link nav-roll" href="/#demo" aria-label="Subscribe">
            <RollingLabel text="Subscribe" />
            <span className="header-arrow" aria-hidden="true">↗</span>
          </a>
          <button className="menu-trigger" type="button" popoverTarget="mobile-navigation">
            <span className="menu-open-label">Menu</span>
            <span className="menu-close-label">Close</span>
            <span className="menu-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="menu-panel" id="mobile-navigation" popover="auto" ref={menu}>
        <nav className="shell" aria-label="Mobile navigation">
          {navigation.map(({ href, label }) => (
            <a href={href} key={href} onClick={() => menu.current?.hidePopover()}>
              {label}<span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
