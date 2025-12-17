"use client";

import {useState} from "react";

interface MostViewedPost {
  id: string | number;
  title: string;
  imageUrl: string;
}

const mockPosts: MostViewedPost[] = [
  {
    id: 1,
    title: "Your TV Sounds Awful. These Soundbars Can Fix That",
    imageUrl: "/images/most-viewed-1.png",
  },
  {
    id: 2,
    title: "The Small Company at the Center of 'Gamergate 2.0'",
    imageUrl: "/images/most-viewed-2.png",
  },
  {
    id: 3,
    title:
      "Craig Wright Is Not Bitcoin Creator Satoshi Nakamoto, Judge Declares",
    imageUrl: "/images/most-viewed-3.png",
  },
  {
    id: 4,
    title:
      "Robert F. Kennedy Jr. Targets a Generation of Politically Disaffected, Extremely Online Men",
    imageUrl: "/images/most-viewed-4.png",
  },
];

export default function MostViewed() {
  const [posts, setPosts] = useState<MostViewedPost[]>(mockPosts);

  const handlePostClick = (postId: string | number) => {
    console.log("Navigate to post:", postId);
  };

  return (
    <aside className="most-viewed-section">
      <div className="most-viewed-list">
        {posts.map((post, index) => (
          <div key={post.id}>
            <article
              className="most-viewed-item"
              onClick={() => handlePostClick(post.id)}
            >
              <h3 className="most-viewed-item-title">{post.title}</h3>

              <div
                className="most-viewed-item-image"
                style={{backgroundImage: `url(${post.imageUrl})`}}
              >
                <div
                  className="most-viewed-item-icon"
                  style={{display: "none"}}
                />
              </div>
            </article>

            {index < posts.length - 1 && (
              <div className="most-viewed-divider" />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
