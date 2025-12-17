"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import PostDetail from "@/components/PostDetail";

interface PostData {
  id: string | number;
  title: string;
  author: string;
  authorImage: string;
  readTime: number;
  topic: string;
  heroImage: string;
  markdownContent: string;
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const markdownResponse = await fetch(`/content/posts/markdown.md`);

        if (!markdownResponse.ok) {
          throw new Error("Markdown file not found");
        }

        const markdownContent = await markdownResponse.text();

        const postData: PostData = {
          id: params.id as string,
          title:
            "Your Kid May Already Be Watching AI-Generated Videos on YouTube",
          author: "Natsu Kim",
          authorImage: "/images/avatar-photo.png",
          readTime: 6,
          topic: "Diversity & Inclusion",
          heroImage: "/images/hero-default.png",
          markdownContent: markdownContent,
        };

        setPost(postData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#FFFFFF",
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "18px",
          color: "#000000",
        }}
      >
        Loading post...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#FFFFFF",
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "18px",
          color: "#000000",
          gap: "16px",
        }}
      >
        <p>{error || "Post not found"}</p>
        <button
          onClick={() => router.push("/")}
          style={{
            color: "#9C73F7",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Back to blog
        </button>
      </div>
    );
  }

  return <PostDetail {...post} />;
}
