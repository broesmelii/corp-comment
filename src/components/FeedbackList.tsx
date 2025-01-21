import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { TFeedbackItem } from "../lib/types";

type FeedbackListProps = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
};

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMessage,
  selectedCompany,
}: FeedbackListProps) {
  console.log(feedbackItems);
  if (selectedCompany) {
    feedbackItems = feedbackItems.filter(
      (feedbackItem) => feedbackItem.company === selectedCompany
    );
    console.log(feedbackItems);
  }
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
      ;
    </ol>
  );
}
