"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {fetchBlogPosts, getImageUrl} from "@/services/api";
import {Post} from "@/types/post";
import NewPostModal from "./NewPostModal";

interface RelatedPostsProps {
  currentPostId: string | number;
  topic?: string;
}

export default function RelatedPosts({
  currentPostId,
  topic,
}: RelatedPostsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await fetchBlogPosts();

        const filteredPosts = allPosts.filter((post) => {
          const isCurrentPost = String(post.id) === String(currentPostId);
          return !isCurrentPost;
        });

        const selectedPosts = filteredPosts.slice(0, 3);

        const processedPosts = selectedPosts.map((post) => ({
          ...post,
          imageUrl: post.imageUrl.startsWith("http")
            ? post.imageUrl
            : getImageUrl(post.imageUrl),
        }));

        setPosts(processedPosts);
      } catch (error) {
        console.error("Error loading related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedPosts();
  }, [currentPostId, topic]);

  const handlePostClick = (postId: string | number) => {
    router.push(`/post/${postId}`);
  };

  if (loading) {
    return null;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts-section">
      <div className="related-posts-header">
        <h2 className="related-posts-title">Related posts</h2>

        <button
          className="related-posts-view-all"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="related-posts-view-all-text">New post</span>
          <Image
            src="/purple-arrow-right.svg"
            alt="arrow"
            width={24}
            height={24}
            className="related-posts-arrow"
          />
        </button>
      </div>

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="related-posts-grid">
        {posts.map((post) => (
          <article
            key={post.id}
            className="related-post-card"
            onClick={() => handlePostClick(post.id)}
          >
            <div
              className="related-post-bg"
              style={{backgroundImage: `url(${post.imageUrl})`}}
            />

            <div className="related-post-content">
              <div className="related-post-tag-container">
                <div className="related-post-tag">
                  <span className="related-post-tag-text">{post.topic}</span>
                </div>
              </div>

              <div className="related-post-info">
                <div className="related-post-info-inner">
                  <h3 className="related-post-title">{post.title}</h3>

                  <div className="related-post-meta">
                    <a
                      href="#"
                      className="related-post-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePostClick(post.id);
                      }}
                    >
                      <span className="related-post-link-text">Read</span>
                      <Image
                        src="/purple-arrow-right.svg"
                        alt="arrow"
                        width={24}
                        height={24}
                        className="related-post-link-icon"
                      />
                    </a>

                    <div className="related-post-time">
                      <Image
                        src="/read-icon.svg"
                        alt="read"
                        width={16}
                        height={16}
                        priority
                        className="related-post-icon-time"
                      />
                      <span className="related-post-time-text">
                        {post.readTime} mins
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
