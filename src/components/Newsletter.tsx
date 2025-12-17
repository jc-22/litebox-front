"use client";

interface NewsletterProps {
  text?: string;
  buttonText?: string;
  onSubscribe?: () => void;
}

export default function Newsletter({
  text = "Sign up for our newsletter and get daily updates",
  buttonText = "Subscribe",
  onSubscribe,
}: NewsletterProps) {
  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      console.log("Subscribe clicked");
    }
  };

  return (
    <div className="newsletter-wrapper">
      <div className="newsletter-container">
        <div className="newsletter-title-container">
          <div className="newsletter-content">
            <div className="newsletter-text-container">
              <div className="newsletter-text">{text}</div>
            </div>

            <button className="newsletter-button" onClick={handleSubscribe}>
              <div className="newsletter-button-base">
                <span className="newsletter-button-text">{buttonText}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
