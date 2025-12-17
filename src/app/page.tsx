"use client";

import HeroPost from "@/components/HeroPost";
import TopicsFilter from "@/components/TopicFilters";
import BlogContentWrapper from "@/components/BlogContentWrapper";
import Footer from "@/components/Footer";

export default function Home() {
  const handleFilterChange = (selectedTopics: string[]) => {
    console.log("Filter changed:", selectedTopics);
  };

  return (
    <div className="min-h-screen bg-black py-16 gap-8 flex flex-col items-center">
      <HeroPost
        title="Your Kid May Already Be Watching AI-Generated Videos on YouTube"
        tag="Diversity & Inclusion"
        readTime="6 mins"
        postId={1}
      />

      <TopicsFilter onFilterChange={handleFilterChange} />

      <BlogContentWrapper />
  
      <Footer />
    </div>
  );
}
