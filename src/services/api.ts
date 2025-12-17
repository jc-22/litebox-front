import axios from "axios";
import {ApiPost, LocalPost, Post} from "@/types/post";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPosts = async (): Promise<LocalPost[]> => {
  const response = await api.get<LocalPost[]>("/api/posts/related");
  return response.data;
};

export const createPost = async (title: string, image: File): Promise<Post> => {
  console.log("llego");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);

  console.log("armo el form");

  const response = await api.post<Post>("/api/post/related", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("response");
  console.log(response);

  return response.data;
};

export const getImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }
  return `${API_URL}${imageUrl}`;
};

export async function fetchBlogPosts(): Promise<Post[]> {
  try {
    const url = "https://lite-tech-api.litebox.ai";

    const response = await fetch(`${url}/api/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");

    const data = await response.json();

    return data.data.slice(0, 9).map((post: ApiPost, index: number) => ({
      id: post.id,
      title: post.attributes.title,
      topic: post.attributes.topic,
      readTime: post.attributes.readTime,
      imageUrl:
        url + post.attributes.coverImg?.data?.attributes?.url ||
        "/images/hero-default.png",
      type: getPostTypeByIndex(index),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

function getPostTypeByIndex(index: number): "portrait" | "square" {
  const portraitIndices = [0, 5, 6];
  return portraitIndices.includes(index) ? "portrait" : "square";
}
