"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";
import MostViewed from "./MostViewed";
import Link from "next/link";
import RelatedPosts from "./RelatedPosts";
import {JSX} from "react";
import ShareButtons from "./SharedButton";
import Footer from "./Footer";

interface PostDetailProps {
  id: string | number;
  title: string;
  author?: string;
  authorImage?: string;
  readTime?: number;
  topic?: string;
  heroImage: string;
  markdownContent: string;
}

export default function PostDetail({
  id,
  title,
  author = "Natsu Kim",
  authorImage = "/images/avatar.jpg",
  readTime = 6,
  topic = "Tech",
  heroImage,
  markdownContent,
}: PostDetailProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="post-detail-page">
      <section
        className="post-hero"
        style={{backgroundImage: `url(${heroImage})`}}
      >
        <div className="post-hero-content">
          <div className="post-breadcrumbs">
            <button
              className="post-back-icon"
              onClick={handleBack}
              aria-label="Back to blog"
            >
              <Image
                src="/white-arrow-left.svg"
                alt="arrow"
                width={24}
                height={24}
                priority
                className="header-button-icon"
              />
            </button>
            <Link href="/" className="post-breadcrumb-link">
              <span className="post-breadcrumb-text">Blog</span>
            </Link>
          </div>

          <div className="post-info-card">
            <div className="post-author-container">
              <div className="post-author-info">
                <div
                  className="post-author-avatar"
                  style={{backgroundImage: `url(${authorImage})`}}
                />
                <span className="post-author-name">By {author}</span>
              </div>
            </div>

            <div className="post-header-info">
              <div className="post-header-inner">
                <h1 className="post-title">{title}</h1>

                <div className="post-meta">
                  <div className="post-meta-item">
                    <Image
                      src="/read-icon.svg"
                      alt="read"
                      width={16}
                      height={16}
                      priority
                      className="post-meta-icon"
                    />
                    <span className="post-meta-text">{readTime} mins read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="post-content-wrapper">
        <div className="post-share-sidebar">
          <ShareButtons />
        </div>

        <article className="post-article">
          <PostContent markdownContent={markdownContent} />
        </article>

        <aside className="post-sidebar">
          <MostViewed />
        </aside>
      </div>

      <section className="post-related">
        <RelatedPosts currentPostId={id} topic={topic} />
      </section>
      <Footer variant="white" />
    </div>
  );
}

interface PostContentProps {
  markdownContent: string;
}

function PostContent({markdownContent}: PostContentProps) {
  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${key++}`} className="post-paragraph">
            {currentParagraph.join(" ")}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("# ")) {
        flushParagraph();
        elements.push(
          <h2 key={`h2-${key++}`} className="post-heading">
            {trimmed.substring(2)}
          </h2>
        );
      } else if (trimmed.startsWith("![")) {
        flushParagraph();
        const match = trimmed.match(/!\[.*?\]\((.*?)\)/);
        if (match) {
          elements.push(
            <div key={`img-${key++}`} className="post-image-wrapper">
              <img src={match[1]} alt="Post image" className="post-image" />
            </div>
          );
        }
      } else if (trimmed.startsWith("> ")) {
        flushParagraph();
        elements.push(
          <blockquote key={`quote-${key++}`} className="post-blockquote">
            {trimmed.substring(2)}
          </blockquote>
        );
      } else if (trimmed === "") {
        flushParagraph();
      } else if (trimmed) {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph();
    return elements;
  };

  const content = parseMarkdown(markdownContent);

  return <div className="post-content">{content}</div>;
}
