import {
  useQuotesContext,
  useQuotesDispatch,
  QuotesDispatchContextType,
} from "../../QuotesContextProvider";
import { QuotesActionType } from "../../quotesReducer";
import { QuoteCard } from "../../components/QuoteCard";

export const MainPage = () => {
  const { quotes, showQuote, currentQuoteIndex } = useQuotesContext() ?? {
    quotes: [],
    showQuote: false,
    currentQuoteIndex: null,
  };
  const { dispatch }: QuotesDispatchContextType = useQuotesDispatch();

  const handleFetchQuote = () => {
    if (quotes.length === 0) {
      console.log("No quotes loaded yet. Please wait or refresh.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatch({ type: QuotesActionType.SET_SHOW_QUOTE, payload: true });
    dispatch({
      type: QuotesActionType.SET_CURRENT_INDEX,
      payload: randomIndex,
    });
  };

  const currentQuote =
    currentQuoteIndex !== null ? quotes[currentQuoteIndex] : null;

  return (
    <main className="text-center py-8 px-4 sm:py-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
        Discover Inspiring Quotes
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto">
        Explore a vast collection of quotes from various authors and topics.
        Find the perfect words to motivate and inspire you. Like quotes to save
        them to your collection. To manage your own created or liked quotes,
        please log in and visit "My Collection".
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-0">
        <button
          className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto"
          onClick={handleFetchQuote}
        >
          Fetch Quote
        </button>
      </div>

      {showQuote && currentQuote && (
        <QuoteCard
          quote={currentQuote.quote}
          author={currentQuote.author}
          likeCount={currentQuote.likeCount}
          createdBy={currentQuote.createdBy}
          likedBy={currentQuote.likedBy}
        />
      )}
    </main>
  );
};
