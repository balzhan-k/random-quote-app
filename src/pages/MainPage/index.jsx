import { QuoteCard } from "../../components/QuoteCard";
import { Button } from "../../components/Button";
import {
  useQuotesContext,
  useQuotesDispatchContext,
} from "../../QuotesContextProvider";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useEffect } from "react";

export const MainPage = ({ updateLikeCount }) => {
  const quotes = useQuotesContext();
  const setQuotes = useQuotesDispatchContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
  }

  function updateLikeCount() {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote, index) =>
        index === currentIndex
          ? { ...quote, likeCount: quote.likeCount + 1 }
          : quote
      )
    );
  }

  return (
    <main>
      <QuoteCard
        quote={quotes[currentIndex]?.quote}
        author={quotes[currentIndex]?.author}
        likeCount={quotes[currentIndex]?.likeCount}
      />

      <button
        className="likeButton"
        onClick={updateLikeCount}
      >
        ♡
      </button>

      <Button label="Next Quote" handleOnClick={handleNextQuoteClick} />
    </main>
  );
};
