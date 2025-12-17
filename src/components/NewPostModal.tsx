"use client";

import type React from "react";
import {useState, useRef} from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import {createPost} from "@/services/api";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (title: string, image: File) => Promise<void>;
}

type ModalState = "default" | "loading" | "success" | "error";

export default function NewPostModal({isOpen, onClose}: NewPostModalProps) {
  const [state, setState] = useState<ModalState>("default");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [titleError, setTitleError] = useState("");
  const [imageError, setImageError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError("");
    setImageError("");
    setErrorMessage("");

    let hasError = false;
    if (!title.trim()) {
      setTitleError("Title is required");
      hasError = true;
    }
    if (!image) {
      setImageError("Image is required");
      hasError = true;
    }
    if (hasError) return;

    setState("loading");
    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + 10;
      });
    }, 200);

    try {
      await createPost(title, image!);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setProgress(100);

      setTimeout(() => {
        setState("success");
      }, 500);
    } catch (err) {
      console.error(err);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      if (progress > 50) {
        setProgress(Math.floor(Math.random() * 30) + 40);
      }

      setState("error");
      setErrorMessage("Failed to upload your file");
    }
  };

  const handleClose = () => {
    if (state !== "loading") {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setState("default");
      setTitle("");
      setImage(null);
      setTitleError("");
      setImageError("");
      setErrorMessage("");
      setProgress(0);
      onClose();
    }
  };

  const handleDone = () => {
    onClose();
    setState("default");
    setTitle("");
    setImage(null);
    setProgress(0);
    window.location.reload();
  };

  const handleCancel = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setState("default");
    setProgress(0);
    setErrorMessage("");
  };

  const handleRetry = () => {
    setProgress(0);
    setErrorMessage("");
    setState("default");
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <Button variant="secondary-green-border" onClick={handleClose}>
            <svg className="modal-close-icon" viewBox="0 0 48 48" fill="none">
              <line
                x1="11"
                y1="11"
                x2="37"
                y2="37"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="37"
                y1="11"
                x2="11"
                y2="37"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </Button>
        </div>

        {state === "default" && (
          <div className="modal-content">
            <div className="modal-title-section">
              <div className="modal-title-wrapper">
                <div className="modal-title-inner">
                  <h2 className="modal-title">Upload your post</h2>
                  <p className="modal-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse commodo libero.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-input-row">
                <div className="modal-input-wrapper">
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (titleError) setTitleError("");
                    }}
                    placeholder="Post Title"
                    error={titleError}
                    variant="modal"
                  />
                </div>
              </div>

              <div className="modal-upload-section">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="modal-file-input"
                />

                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="secondary-outline"
                  xxl
                >
                  <span>{image ? image.name : "Upload image"}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5L12 19M12 5L7 10M12 5L17 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>

                {imageError && (
                  <span className="input-help error">{imageError}</span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary-black"
                className="confirm-modal"
              >
                Confirm
              </Button>
            </form>
          </div>
        )}

        {state === "loading" && (
          <div className="modal-content">
            <div className="modal-title-section">
              <div className="modal-title-wrapper">
                <div className="modal-title-inner">
                  <h2 className="modal-title">Upload your post</h2>
                  <p className="modal-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse commodo libero.
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-progress-section">
              <div className="modal-input-row">
                <div className="modal-input-wrapper">
                  <Input type="text" value={title} disabled />
                </div>
              </div>

              <div className="modal-progress-wrapper">
                <div className="modal-progress-content">
                  <p className="modal-progress-text">
                    Loading image {progress}%
                  </p>
                  <div className="modal-progress-bar-container">
                    <div className="modal-progress-bar-bg" />
                    <div
                      className="modal-progress-bar-fill modal-progress-bar-fill--loading"
                      style={{width: `${progress}%`}}
                    />
                  </div>
                </div>

                <Button variant="primary-black" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>

              <Button disabled variant="primary-black">
                Confirm
              </Button>
            </div>
          </div>
        )}

        {state === "error" && (
          <div className="modal-content">
            <div className="modal-title-section">
              <div className="modal-title-wrapper">
                <div className="modal-title-inner">
                  <h2 className="modal-title">Upload your post</h2>
                  <p className="modal-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse commodo libero.
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-progress-section">
              <div className="modal-input-row">
                <div className="modal-input-wrapper">
                  <Input type="text" value={title} disabled />
                </div>
              </div>

              <div className="modal-progress-wrapper">
                <div className="modal-progress-content-error">
                  <p className="modal-error-message">
                    Failed to upload your file
                  </p>
                  <div className="modal-progress-bar-container">
                    <div className="modal-progress-bar-bg-error" />
                    <div
                      className="modal-progress-bar-fill modal-progress-bar-fill--error"
                      style={{width: `${progress}%`}}
                    />
                  </div>
                </div>

                <Button variant="primary-green" onClick={handleRetry}>
                  Retry
                </Button>
              </div>

              <Button disabled variant="primary-black">
                Confirm
              </Button>
            </div>
          </div>
        )}

        {state === "success" && (
          <div className="modal-content">
            <div className="modal-title-section">
              <div className="modal-title-wrapper">
                <div className="modal-title-inner">
                  <h2 className="modal-title">
                    Your post was successfully uploaded!
                  </h2>
                </div>
              </div>
            </div>

            <Button onClick={handleDone} variant="primary-black">
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
