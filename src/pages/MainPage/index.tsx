import { useState } from "react";
import { useQuotesContext, useQuotesDispatchContext } from "../../QuotesContextProvider";
import { QuotesActionType } from "../../quotesReducer";
import { QuoteCard } from "../../components/QuoteCard";

export const MainPage = () => {
  const quotes = useQuotesContext() ?? [];
  const dispatch = useQuotesDispatchContext();
  const [showQuote, setShowQuote] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  async function fetchQuotes() {
    const response = await fetch("https://zenquotes.io/api/quotes");
    const data = await response.json();
    // Map to your Quote type
    const formatted = data.map((q: any) => ({
      quote: q.q,
      author: q.a || "Unknown",
      likeCount: 0,
    }));
    dispatch && dispatch({ type: QuotesActionType.SET_QUOTES, payload: formatted });
  }

  async function handleFetchQuote() {
    if (quotes.length === 0) {
      await fetchQuotes();
    }
    setShowQuote(true);
    setCurrentIndex(Math.floor(Math.random() * (quotes.length > 0 ? quotes.length : 1)));
  }

  function handleClearQuotes() {
    dispatch && dispatch({ type: QuotesActionType.SET_QUOTES, payload: [] });
    setShowQuote(false);
    setCurrentIndex(null);
  }

  return (
    <main className="text-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Discover Inspiring Quotes</h1>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore a vast collection of quotes from various authors and topics. Find the perfect words to motivate and inspire you.
      </p>

      <div className="flex justify-center gap-4 mb-10">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          onClick={handleFetchQuote}
        >
          Fetch Quote
        </button>
        <button
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-50 transition"
        >
          Create
        </button>
        <button
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-50 transition"
          onClick={handleClearQuotes}
        >
          Delete
        </button>
      </div>
      {showQuote && currentIndex !== null && quotes[currentIndex] && (
        <QuoteCard
          quote={quotes[currentIndex].quote}
          author={quotes[currentIndex].author}
          likeCount={quotes[currentIndex].likeCount}
        />
      )}
    </main>
  );
};
