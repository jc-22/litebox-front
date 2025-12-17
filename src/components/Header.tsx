"use client";

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import NewPostModal from "./NewPostModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <Link href="/" className="header-logo">
            <Image
              src="/logo.svg"
              alt="lite-tech logo"
              width={178}
              height={28}
              priority
              style={{width: "100%", height: "auto"}}
            />
          </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className="header-button"
          >
            <span className="header-button-text">New post</span>
            <Image
              src="/green-arrow-right.svg"
              alt="arrow"
              width={24}
              height={24}
              priority
              className="header-button-icon"
            />
          </button>
        </div>
      </header>

      <div className="header-spacer" />

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
