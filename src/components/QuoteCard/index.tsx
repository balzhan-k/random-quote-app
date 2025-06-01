import { Quote } from "../..//types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import {
  useLikedQuotesContext,
  useLikedQuotesDispatchContext,
} from "../../QuotesContextProvider";

interface QuoteCardProps extends Quote {
  onProfilePage?: boolean;
}

export const QuoteCard = ({ quote, author, onProfilePage }: QuoteCardProps) => {
  const likedQuotes = useLikedQuotesContext() ?? [];
  const { handleLike, handleDislike } = useLikedQuotesDispatchContext() ?? { handleLike: () => {}, handleDislike: () => {} };
  const isLiked = likedQuotes.some((q) => q.quote === quote);

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl max-w-sm sm:max-w-lg md:max-w-xl mx-auto shadow-md border border-gray-200 mt-8 sm:mt-10">
      <p className="text-xl sm:text-2xl font-bold text-left mb-2 text-gray-800">{quote}</p>
      <p className="text-sm sm:text-md text-gray-600 text-left mb-4">{author}</p>

      <div className="flex items-center gap-2 mt-4">
        {!onProfilePage && (
          <button
            className="p-2 sm:p-3 rounded-full border border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-100 transition flex items-center justify-center"
            onClick={() => handleLike({ quote, author, likeCount: 0 }, !isLiked)}
          >
            <FontAwesomeIcon
              icon={isLiked ? faThumbsUpSolid : faThumbsUpRegular}
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{
                color: isLiked ? "blue" : "currentColor",
              }}
            />
          </button>
        )}

        {onProfilePage && (
          <button
            className="p-2 sm:p-3 rounded-full border border-red-700 text-red-700 bg-red-50 hover:bg-red-100 transition flex items-center justify-center ml-auto"
            onClick={() => handleDislike({ quote, author, likeCount: 1 })}
          >
            <FontAwesomeIcon
              icon={faThumbsDownRegular}
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: "red" }}
            />
          </button>
        )}
      </div>
    </section>
  );
};
