import { Button } from "../../components/Button";
import {
  useQuotesContext,
  useQuotesDispatchContext,
} from "../../QuotesContextProvider";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useState } from "react";

export const QuoteCard = ({ quote, author, likeCount }) => {
  const quotes = useQuotesContext();
  const currentIndex = useQuoteIndexContext();
  const setQuotes = useQuotesDispatchContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();

  const [liked, setLiked] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
    setLiked(false);
  }

  function updateLikeCount() {
    if (liked) return; // prevent multiple likes
    setLiked(true);
    setIsBouncing(true);

    setQuotes((prevQuotes) =>
      prevQuotes.map((quote, index) =>
        index === currentIndex
          ? { ...quote, likeCount: quote.likeCount + 1 }
          : quote
      )
    );
    setTimeout(() => setIsBouncing(false), 300);
  }
  return (
    <section className="QuoteCard">
      <div className="text-green-700 text-xl ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 256 256"
          className="text-green-700 rotate-180"
        >
          <path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path>
        </svg>
        <p className="text-green-700 text-xl text-left">{quote}</p>
      </div>
      <p className="mt-3 text-xs tracking-wide text-green-700 text-left">
        {author}
      </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 border border-green-700 rounded-full px-1">
          <button
            onClick={updateLikeCount}
            className={`p-2 transition hover:scale-110 ${
              isBouncing ? "animate-bounce" : ""
            }`}
            aria-label="Like this quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
              fill={liked ? "#dc2626" : "none"}
              stroke="#dc2626"
              strokeWidth="16"
              className="w-5 h-5"
            >
              <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40Z" />
            </svg>
          </button>
          <p className="text-sm font-medium text-gray-600 p-2">
            Likes: {likeCount}
          </p>
        </div>
        <Button label="Next Quote" handleOnClick={handleNextQuoteClick} />
      </div>
    </section>
  );
};
