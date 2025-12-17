"use client";

import Image from "next/image";

interface HeroPostProps {
  title: string;
  imageUrl?: string;
  tag?: string;
  readTime?: string;
  postId?: string | number;
}

export default function HeroPost({
  title,
  imageUrl,
  tag = "Diversity & Inclusion",
  readTime = "6 mins",
  postId,
}: HeroPostProps) {
  const handleClick = () => {
    console.log("Navigating to post:", postId || title);
  };

  const bgImage =
    imageUrl && imageUrl.trim() ? imageUrl : "/images/hero-default.png";

  return (
    <section className="hero-section">
      <h2 className="hero-title">Today story</h2>

      <div
        className="hero-card"
        style={{backgroundImage: `url(${bgImage})`}}
        onClick={handleClick}
      >
        <div className="hero-tag-container">
          <div className="hero-tag">
            <span className="hero-tag-text">{tag}</span>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-article-title">{title}</h1>

            <div className="hero-bottom-row">
              <button className="hero-read-button" onClick={handleClick}>
                <span className="hero-read-text">Read</span>
                <Image
                  src="/purple-arrow-right.svg"
                  alt="arrow"
                  width={24}
                  height={24}
                  priority
                  className="header-button-icon"
                />
              </button>

              <div className="hero-time">
                <Image
                  src="/read-icon.svg"
                  alt="read"
                  width={16}
                  height={16}
                  priority
                  className="hero-time-icon"
                />
                <span className="hero-time-text">{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
