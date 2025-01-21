import Footer from "./Footer";
import Container from "./Container";
import HashtagList from "./HashtagList";
import { TFeedbackItem } from "../lib/types";
import { useEffect, useState } from "react";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);
    const badgeLetter = companyName[0].toUpperCase();
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      text: text,
      daysAgo: 0,
      company: companyName,
      badgeLetter: badgeLetter,
    };
    setFeedbackItems([...feedbackItems, newItem]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setFeedbackItems(data.feedbacks);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        isLoading={isLoading}
        errorMessage={errorMessage}
        feedbackItems={feedbackItems}
        handleAddToList={handleAddToList}
        selectedCompany={selectedCompany}
      />
      <HashtagList
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
    </div>
  );
}

export default App;
