'use client';

import BlogList from './BlogList';
import MostViewed from './MostViewed';

export default function BlogContentWrapper() {
  return (
    <div className="blog-content-wrapper">
      <BlogList />
      <MostViewed />
    </div>
  );
}