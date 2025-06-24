import { Quote } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useQuotesContext,
  useQuotesDispatch,
} from "../../QuotesContextProvider";
import { QuotesActionType } from "../../quotesReducer";
import { useAuth } from "../../AuthContextProvider";

interface QuoteCardProps extends Quote {
  onProfilePage?: boolean;
  isUserCreated?: boolean;
  handleDeleteCreatedQuote?: (quote: Quote) => void;
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
}

export const QuoteCard = ({
  quote,
  author,
  onProfilePage,
  isUserCreated,
  handleDeleteCreatedQuote,
  likeCount,
  createdBy,
  likedBy,
  handleLikeQuote,
  handleUnlikeQuote,
}: QuoteCardProps) => {
  const { uid } = useAuth();

  const isLiked = likedBy?.includes(uid || "");

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl max-w-sm sm:max-w-lg md:max-w-xl mx-auto shadow-md border border-gray-200 mt-8 sm:mt-10">
      <p className="text-xl sm:text-2xl font-bold text-left mb-2 text-gray-800">
        {quote}
      </p>
      <p className="text-sm sm:text-md text-gray-600 text-left mb-4">
        {author}
      </p>

      <div className="flex items-center justify-between mt-4 gap-2">
        {!onProfilePage && (
          <button
            className="p-2 rounded-full border border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
            onClick={() =>
              handleLikeQuote({ quote, author, likeCount, createdBy, likedBy })
            }
            disabled={isLiked || !uid}
          >
            <FontAwesomeIcon
              icon={isLiked ? faThumbsUpSolid : faThumbsUpRegular}
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: isLiked ? "blue" : "currentColor" }}
            />
          </button>
        )}

        {onProfilePage && (
          <button
            className="p-2 rounded-full border border-red-700 text-red-700 bg-red-50 hover:bg-red-100 transition"
            onClick={() =>
              handleUnlikeQuote({
                quote,
                author,
                likeCount,
                createdBy,
                likedBy,
              })
            }
            disabled={!isLiked || !uid}
          >
            <FontAwesomeIcon
              icon={faThumbsDownRegular}
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: "red" }}
            />
          </button>
        )}

        {onProfilePage && isUserCreated && handleDeleteCreatedQuote && (
          <button
            className="p-2 rounded-full border border-gray-400 text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
            onClick={() =>
              handleDeleteCreatedQuote({
                quote,
                author,
                likeCount,
                createdBy,
                likedBy,
              })
            }
          >
            <FontAwesomeIcon icon={faTrash} className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </section>
  );
};
