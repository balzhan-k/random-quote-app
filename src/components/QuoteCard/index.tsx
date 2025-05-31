import { useState } from "react";
import {
  useQuotesContext,
  useQuotesDispatchContext,
} from "../../QuotesContextProvider";
import { QuotesActionType } from "../../quotesReducer";
import { Quote } from "../../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

export const QuoteCard = ({ quote, author, likeCount }: Quote) => {
  const quotes = useQuotesContext();
  const dispatch = useQuotesDispatchContext();

  // Получаем актуальный likeCount из глобального состояния
  let actualLikeCount = likeCount;
  let isLiked = false;
  if (quotes) {
    const currentQuoteInContext = quotes.find(q => q.quote === quote);
    if (currentQuoteInContext) {
      actualLikeCount = currentQuoteInContext.likeCount;
      isLiked = currentQuoteInContext.likeCount > 0;
    }
  }

  function handleLike() {
    if (!quotes || !dispatch) return; // Removed currentIndex check
    // Find the quote by its content as we don't have id in QuoteCard props anymore
    const currentQuote = quotes.find(q => q.quote === quote);

    if (currentQuote && currentQuote.likeCount === 0) {
      dispatch({
        type: QuotesActionType.LIKE_QUOTE,
        payload: { quote: currentQuote.quote }
      });
    }
  }

  return (
    <section className="bg-white p-8 rounded-xl max-w-3xl mx-auto shadow-md">
      <p className="text-3xl font-bold text-left mb-2 text-gray-800">{quote}</p>
      <p className="text-xl text-gray-600 text-left mb-4">{author}</p>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleLike}
          disabled={isLiked}
          className={`p-1 transition ${isLiked ? 'cursor-not-allowed' : ''}`}
          aria-label="Like this quote"
        >
          <FontAwesomeIcon
            icon={isLiked ? faHeartSolid : faHeartRegular}
            className="w-5 h-5"
            style={{ color: isLiked ? "#dc2626" : "#6b7280" }}
          />
        </button>
        <p className="text-sm text-gray-600">
          {actualLikeCount}
        </p>
      </div>
    </section>
  );
};
