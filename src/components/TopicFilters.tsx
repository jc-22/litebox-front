"use client";

import {useState} from "react";

interface Topic {
  id: string;
  label: string;
}

interface TopicsFilterProps {
  topics?: Topic[];
  onFilterChange?: (selectedTopics: string[]) => void;
}

const DEFAULT_TOPICS: Topic[] = [
  {id: "all", label: "All"},
  {id: "diversity", label: "Diversity & Inclusion"},
  {id: "tech-companies", label: "Tech companies"},
  {id: "crypto", label: "Crypto"},
  {id: "security", label: "Security"},
  {id: "global", label: "Global"},
  {id: "leaks", label: "Leaks"},
];

export default function TopicsFilter({
  topics = DEFAULT_TOPICS,
  onFilterChange,
}: TopicsFilterProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "all",
    "tech-companies",
  ]);

  const handleTopicClick = (topicId: string) => {
    let newSelected: string[];

    if (topicId === "all") {
      newSelected = ["all"];
    } else {
      if (selectedTopics.includes(topicId)) {
        newSelected = selectedTopics.filter((id) => id !== topicId);

        if (newSelected.length === 0) {
          newSelected = ["all"];
        }
      } else {
        newSelected = [...selectedTopics.filter((id) => id !== "all"), topicId];
      }
    }

    setSelectedTopics(newSelected);

    if (onFilterChange) {
      onFilterChange(newSelected);
    }

    console.log("Selected topics:", newSelected);
  };

  const isActive = (topicId: string) => {
    return selectedTopics.includes(topicId);
  };

  return (
    <section className="topics-section">
      <div className="topics-container">
        <h2 className="topics-title">Topics</h2>

        <div className="topics-list">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className={`topic-button ${
                isActive(topic.id) ? "active" : "inactive"
              }`}
              onClick={() => handleTopicClick(topic.id)}
            >
              <span className="topic-text">{topic.label}</span>

              {isActive(topic.id) && (
                <div className="topic-close-icon">
                  <svg viewBox="0 0 9 10" fill="none">
                    <line
                      x1="0"
                      y1="0"
                      x2="9"
                      y2="9.6"
                      stroke="#000000"
                      strokeWidth="1"
                    />
                    <line
                      x1="9"
                      y1="0"
                      x2="0"
                      y2="9.6"
                      stroke="#000000"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
