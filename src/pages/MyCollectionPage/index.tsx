import { useNavigate } from "react-router-dom";
import { Quote } from "../../types";
import { QuoteCard } from "../../components/QuoteCard";
import { useAuth } from "../../AuthContextProvider";
import { faQuoteLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFirestoreQuotes } from "../../hooks/useFirestoreQuotes";
import { useState } from "react";
import { CreateQuoteForm } from "../../components/CreateQuoteForm";

export const MyCollectionPage = () => {
  const navigate = useNavigate();
  const { firestoreQuotes } = useFirestoreQuotes();
  const { uid } = useAuth();
  const isAuthenticated = !!uid;
  const [showCreateForm, setShowCreateForm] = useState(false);

  const myCreatedQuotes = firestoreQuotes.filter(
    (quote: Quote) => quote.createdBy === uid
  );
  const likedQuotes = firestoreQuotes.filter((quote: Quote) =>
    quote.likedBy?.includes(uid || "")
  );

  const combinedQuotes = [...likedQuotes];

  myCreatedQuotes.forEach((createdQuote: Quote) => {
    if (
      !combinedQuotes.some((likedQuote) => likedQuote.id === createdQuote.id)
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
      {isAuthenticated && (
        <p className="text-base md:text-lg text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto text-center">
          This is your personal space to manage quotes you've created and quotes
          you've liked. You can add new quotes, and edit or delete your own
          creations.
        </p>
      )}

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
      ) : (
        <>
          <div className="flex justify-center mb-8">
            <button
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
              onClick={() => setShowCreateForm(true)}
            >
              Create New Quote
            </button>
          </div>
          {combinedQuotes.length > 0 ? (
            combinedQuotes.map((quote: Quote) => (
              <QuoteCard
                key={quote.id}
                id={quote.id}
                quote={quote.quote}
                author={quote.author}
                likeCount={quote.likeCount}
                onProfilePage={true}
                createdBy={quote.createdBy}
                isUserCreated={quote.createdBy === uid}
                likedBy={quote.likedBy}
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
          {showCreateForm && (
            <CreateQuoteForm onCancel={() => setShowCreateForm(false)} />
          )}
        </>
      )}
    </main>
  );
};
