import {
  useLikedQuotesContext,
} from "../../QuotesContextProvider";
import { Quote } from "../../types";
import { QuoteCard } from "../../components/QuoteCard";

export const ProfilePage = () => {
  const likedQuotes = useLikedQuotesContext() ?? [];

  return (
    <main className="py-8 px-4 sm:py-16">
      {likedQuotes.length > 0 ? (
        likedQuotes.map((quote: Quote) => (
          <QuoteCard
            key={quote.quote}
            quote={quote.quote}
            author={quote.author}
            likeCount={quote.likeCount}
            onProfilePage={true}
          />
        ))
      ) : (
        <p className="text-gray-400 text-center py-8 text-lg sm:text-xl italic px-4">No liked quotes yet.</p>
      )}
    </main>
  );
};