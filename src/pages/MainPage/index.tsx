import { useState } from "react";
import { useQuotesContext, useQuotesDispatch } from "../../QuotesContextProvider";
import { QuotesActionType } from "../../quotesReducer";
import { QuoteCard } from "../../components/QuoteCard";
import { CreateQuoteForm } from "../../components/CreateQuoteForm";
import { Quote } from "../../types";
import { useAuth } from "../../AuthContextProvider";

export const MainPage = () => {
  const quotes = useQuotesContext() ?? [];
  const dispatch = useQuotesDispatch();
  const { showQuote, currentQuoteIndex } = useQuotesContext() ?? {
    showQuote: false,
    currentQuoteIndex: null,
  }; 
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isAuthenticated, uid } = useAuth();

  async function handleFetchQuote() {
    if (quotes.quotes.length === 0) {
      console.log("No quotes loaded yet. Please wait or refresh.");
      return;
    }
    dispatch({ type: QuotesActionType.SET_SHOW_QUOTE, payload: true });
    dispatch({
      type: QuotesActionType.SET_CURRENT_INDEX,
      payload: Math.floor(Math.random() * quotes.quotes.length),
    });
  }

  function handleClearQuotes() {
    dispatch({ type: QuotesActionType.SET_QUOTES, payload: [] });
    dispatch({ type: QuotesActionType.SET_SHOW_QUOTE, payload: false });
    dispatch({ type: QuotesActionType.SET_CURRENT_INDEX, payload: null });
  }

  const handleAddQuote = (newQuote: Quote) => {
    dispatch({ type: QuotesActionType.ADD_QUOTE, payload: newQuote });
    setShowCreateForm(false);
  };

  return (
    <main className="text-center py-8 px-4 sm:py-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
        Discover Inspiring Quotes
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto">
        Explore a vast collection of quotes from various authors and topics.
        Find the perfect words to motivate and inspire you.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-0">
        <button
          className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto"
          onClick={handleFetchQuote}
        >
          Fetch Quote
        </button>
        <button
          className={`border border-gray-300 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold transition text-sm sm:text-base w-full sm:w-auto
            ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
          `}
          onClick={() => isAuthenticated && setShowCreateForm(true)}
          disabled={!isAuthenticated}
          title={isAuthenticated ? '' : 'Sign up or log in to create quotes.'}
        >
          Create
        </button>
        <button
          className="border border-gray-300 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-gray-50 transition text-sm sm:text-base w-full sm:w-auto"
          onClick={handleClearQuotes}
        >
          Delete
        </button>
      </div>
      {showQuote &&
        currentQuoteIndex !== null &&
        quotes.quotes[currentQuoteIndex] && (
          <QuoteCard
            quote={quotes.quotes[currentQuoteIndex].quote}
            author={quotes.quotes[currentQuoteIndex].author}
            likeCount={quotes.quotes[currentQuoteIndex].likeCount}
          />
        )}

      {isAuthenticated && showCreateForm && (
        <CreateQuoteForm
          onCreate={(newQuote) => handleAddQuote({ ...newQuote, userId: uid || "" })}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </main>
  );
};
