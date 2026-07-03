"use client";

import Script from "next/script";

const TAGGBOX_SCRIPT = "https://widget.taggbox.com/embed.min.js";
const WIDGET_ID = "329295";

type TaggboxReviewsProps = {
  className?: string;
  minHeight?: number;
};

const TaggboxReviews = ({ className = "", minHeight = 520 }: TaggboxReviewsProps) => {
  return (
    <div
      className={`os-taggbox-wrap ${className}`.trim()}
      style={{ minHeight: `${minHeight}px` }}
    >
      <div
        className="taggbox"
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        data-widget-id={WIDGET_ID}
        data-website="1"
      />
      <Script src={TAGGBOX_SCRIPT} strategy="afterInteractive" />
    </div>
  );
};

export default TaggboxReviews;
