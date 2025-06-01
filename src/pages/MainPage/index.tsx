import { useState } from "react";
import { useQuotesContext, useQuotesDispatchContext, useQuoteUIContext, useQuoteUIDispatchContext } from "../../QuotesContextProvider";
import { QuotesActionType } from "../../quotesReducer";
import { QuoteCard } from "../../components/QuoteCard";
import { CreateQuoteForm } from "../../components/CreateQuoteForm";
import { Quote } from "../../types";

export const MainPage = () => {
  const quotes = useQuotesContext() ?? [];
  const dispatch = useQuotesDispatchContext();
  const { showQuote, currentIndex } = useQuoteUIContext() ?? {showQuote: false, currentIndex: null};
  const { setShowQuote, setCurrentIndex } = useQuoteUIDispatchContext() ?? {setShowQuote: () => {}, setCurrentIndex: () => {}};
  const [showCreateForm, setShowCreateForm] = useState(false);

  async function handleFetchQuote() {
    if (quotes.length === 0) {
      console.log("No quotes loaded yet. Please wait or refresh.");
      return;
    }
    setShowQuote(true);
    setCurrentIndex(Math.floor(Math.random() * quotes.length));
  }

  function handleClearQuotes() {
    dispatch && dispatch({ type: QuotesActionType.SET_QUOTES, payload: [] });
    setShowQuote(false);
    setCurrentIndex(null);
  }

  const handleAddQuote = (newQuote: Quote) => {
    dispatch && dispatch({ type: QuotesActionType.ADD_QUOTE, payload: newQuote });
    setShowCreateForm(false); // Закрыть форму после добавления
  };

  return (
    <main className="text-center py-8 px-4 sm:py-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">Discover Inspiring Quotes</h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto">
        Explore a vast collection of quotes from various authors and topics. Find the perfect words to motivate and inspire you.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-0">
        <button
          className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto"
          onClick={handleFetchQuote}
        >
          Fetch Quote
        </button>
        <button
          className="border border-gray-300 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-gray-50 transition text-sm sm:text-base w-full sm:w-auto"
          onClick={() => setShowCreateForm(true)}
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
      {showQuote && currentIndex !== null && quotes[currentIndex] && (
        <QuoteCard
          quote={quotes[currentIndex].quote}
          author={quotes[currentIndex].author}
          likeCount={quotes[currentIndex].likeCount}
        />
      )}

      {showCreateForm && (
        <CreateQuoteForm
          onCreate={handleAddQuote}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </main>
  );
};
