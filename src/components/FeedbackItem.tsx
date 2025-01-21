import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../lib/types";
import { useState } from "react";

type FeedbackItemProps = { feedbackItem: TFeedbackItem };

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleUpvote = () => {
    if (!isDisabled) {
      setUpvoteCount(upvoteCount + 1);
      setIsDisabled(true); // Disable button after the upvote
    }
  };
  return (
    <li className="feedback">
      <button onClick={handleUpvote} disabled={isDisabled}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      {/* <p> {feedbackItem.daysAgo}d</p> */}
      <p> {feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
