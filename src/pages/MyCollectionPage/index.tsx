import { useNavigate } from "react-router-dom";
import {
  useQuotesContext,
  useQuotesDispatch,
} from "../../QuotesContextProvider";
import { Quote } from "../../types";
import { QuoteCard } from "../../components/QuoteCard";
import { useAuth } from "../../AuthContextProvider";
import { faQuoteLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuotesActionType } from "../../quotesReducer";

export const MyCollectionPage = () => {
  const navigate = useNavigate();
  const { quotes } = useQuotesContext();
  const { dispatch, handleLikeQuote, handleUnlikeQuote } = useQuotesDispatch();
  const { uid } = useAuth();
  const isAuthenticated = !!uid;

  const myCreatedQuotes = quotes.filter(
    (quote: Quote) => quote.createdBy === uid
  );
  const likedQuotes = quotes.filter((quote: Quote) =>
    quote.likedBy?.includes(uid || "")
  );

  const combinedQuotes = [...likedQuotes];

  myCreatedQuotes.forEach((createdQuote: Quote) => {
    if (
      !combinedQuotes.some(
        (likedQuote) => likedQuote.quote === createdQuote.quote
      )
    ) {
      combinedQuotes.push(createdQuote);
    }
  });

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  return (
    <main className="py-8 px-4 sm:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-800 text-center">
        My Collection
      </h2>
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="w-16 h-16 text-gray-300 mb-6"
          />
          <p className="text-gray-500 text-center text-xl sm:text-2xl font-semibold mb-4">
            Access Your Personal Collection
          </p>
          <p className="text-gray-400 text-center text-md sm:text-lg mb-8">
            Log in or sign up to save, create and view your favorite quotes.
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
              onClick={() => handlePageChange("/login")}
            >
              Log In
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
              onClick={() => handlePageChange("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      ) : combinedQuotes.length > 0 ? (
        combinedQuotes.map((quote: Quote) => (
          <QuoteCard
            key={quote.quote}
            quote={quote.quote}
            author={quote.author}
            likeCount={quote.likeCount}
            onProfilePage={true}
            createdBy={quote.createdBy}
            isUserCreated={quote.createdBy === uid}
            handleDeleteCreatedQuote={() =>
              dispatch({
                type: QuotesActionType.DELETE_QUOTE,
                payload: quote.quote,
              })
            }
            handleLikeQuote={handleLikeQuote}
            handleUnlikeQuote={handleUnlikeQuote}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="w-16 h-16 text-gray-300 mb-6"
          />
          <p className="text-gray-500 text-center text-xl sm:text-2xl font-semibold mb-4">
            Your collection is empty.
          </p>
          <p className="text-gray-400 text-center text-md sm:text-lg mb-8">
            Like some quotes or create your own to see them here!
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
            onClick={() => handlePageChange("/")}
          >
            Explore Quotes
          </button>
        </div>
      )}
    </main>
  );
};
