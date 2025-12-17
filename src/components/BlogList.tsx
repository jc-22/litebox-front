"use client";

import {JSX, useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Post} from "@/types/post";
import Newsletter from "./Newsletter";
import {fetchBlogPosts, getPosts, getImageUrl} from "@/services/api";

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);
      const initialPosts = await fetchBlogPosts();
      setPosts(initialPosts);
      setLoading(false);
    };

    loadInitialPosts();
  }, []);

  const handleLoadMore = async () => {
    try {
      const localPosts = await getPosts();

      const newPosts: Post[] = localPosts.slice(0, 3).map((post, index) => ({
        id: `local-${Date.now()}-${index}`,
        title: post.title,
        topic: "All",
        readTime: 5,
        imageUrl: getImageUrl(post.imageUrl),
        type: index === 2 ? "portrait" : "square",
      }));

      setPosts((prev) => [...prev, ...newPosts]);
      setShowLoadMore(false);
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  if (loading) {
    return <div className="blog-list-loading">Loading posts...</div>;
  }

  const renderPosts = () => {
    const elements: JSX.Element[] = [];

    if (posts.length >= 3) {
      elements.push(
        <div key="row-1" className="blog-grid">
          <div className="blog-grid-row">
            <BlogPostCard post={posts[0]} />
            <div className="blog-grid-column">
              <BlogPostCard post={posts[1]} />
              <BlogPostCard post={posts[2]} />
            </div>
          </div>
        </div>
      );
    }

    elements.push(<Newsletter key="subscribe" />);

    if (posts.length >= 6) {
      elements.push(
        <div key="row-2" className="blog-grid">
          <div className="blog-grid-row">
            <div className="blog-grid-column">
              <BlogPostCard post={posts[3]} />
              <BlogPostCard post={posts[4]} />
            </div>
            <BlogPostCard post={posts[5]} />
          </div>
        </div>
      );
    }

    if (posts.length >= 9) {
      elements.push(
        <div key="row-3" className="blog-grid">
          <div className="blog-grid-row">
            <BlogPostCard post={posts[6]} />
            <div className="blog-grid-column">
              <BlogPostCard post={posts[7]} />
              <BlogPostCard post={posts[8]} />
            </div>
          </div>
        </div>
      );
    }

    if (posts.length >= 12) {
      elements.push(
        <div key="row-4" className="blog-grid">
          <div className="blog-grid-row">
            <div className="blog-grid-column">
              <BlogPostCard post={posts[9]} />
              <BlogPostCard post={posts[10]} />
            </div>
            <BlogPostCard post={posts[11]} />
          </div>
        </div>
      );
    }

    return elements;
  };

  return (
    <section className="blog-list-section">
      {renderPosts()}

      {showLoadMore && posts.length >= 9 && (
        <div className="blog-list-load-more">
          <button className="blog-load-more-button" onClick={handleLoadMore}>
            <span className="blog-load-more-text">Load more</span>
          </button>
        </div>
      )}
    </section>
  );
}

interface BlogPostCardProps {
  post: Post;
}
function BlogPostCard({post}: BlogPostCardProps) {
  const router = useRouter();
  const isPortrait = post.type === "portrait";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/post/${post.id}`);
    console.log("Navigate to post:", post.id);
  };

  return (
    <article
      className={`blog-post ${
        isPortrait ? "portrait-blog-post" : "square-blog-post"
      }`}
    >
      <div
        className="blog-post-image"
        style={{backgroundImage: `url(${post.imageUrl})`}}
      />

      <div className="blog-post-content">
        <div className="blog-post-tag-container">
          <div className="blog-post-tag">
            <span className="blog-post-tag-text">{post.topic}</span>
          </div>
        </div>

        <div className="blog-post-info">
          <div className="blog-post-info-inner">
            <h3 className="blog-post-title">{post.title}</h3>

            <div className="blog-post-bottom">
              <a href="#" className="blog-post-link" onClick={handleClick}>
                <div className="blog-post-link-inner">
                  <span className="blog-post-link-text">Read</span>
                  <Image
                    src="/purple-arrow-right.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                    className="blog-post-link-icon"
                  />
                </div>
              </a>

              <div className="blog-post-time">
                <Image
                  src="/read-icon.svg"
                  alt="read"
                  width={16}
                  height={16}
                  priority
                  className="blog-post-time-icon"
                />
                <span className="blog-post-time-text">
                  {post.readTime} mins
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
