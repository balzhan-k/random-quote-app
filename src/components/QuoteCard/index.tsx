import { Quote } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  useQuotesContext,
  useQuotesDispatch,
} from "../../QuotesContextProvider";
import { QuotesActionType } from "../../quotesReducer";
import { useAuth } from "../../AuthContextProvider";
import { useFirestoreQuotes } from "../../hooks/useFirestoreQuotes";
import { useState } from "react";
import { EditQuoteForm } from "../EditQuoteForm";

interface QuoteCardProps extends Quote {
  onProfilePage?: boolean;
  isUserCreated?: boolean;
}

export const QuoteCard = ({
  id,
  quote,
  author,
  onProfilePage,
  isUserCreated,
  createdBy,
  likedBy,
}: QuoteCardProps) => {
  const { uid, isAuthenticated } = useAuth();
  const { updateQuote, deleteQuote } = useFirestoreQuotes();
  const { dispatch } = useQuotesDispatch();
  const { quotes } = useQuotesContext();
  const { firestoreQuotes, addQuote } = useFirestoreQuotes();

  const [showEditForm, setShowEditForm] = useState(false);

  // Вычисляем статус лайка на основе firestoreQuotes
  const currentQuoteInFirestore = firestoreQuotes.find(
    (q) => q.quote === quote && q.author === author
  );
  const isLiked = currentQuoteInFirestore?.likedBy?.includes(uid || "");

  const handleToggleLike = async () => {
    if (!uid) return;

    const newLikedBy = isLiked
      ? (likedBy || []).filter((userId) => userId !== uid)
      : [...(likedBy || []), uid];

    if (id) {
      updateQuote(id, { likedBy: newLikedBy });
    } else {
      const existingFirestoreQuote = firestoreQuotes.find(
        (q) => q.quote === quote && q.author === author
      );

      if (existingFirestoreQuote) {
        updateQuote(existingFirestoreQuote.id!, { likedBy: newLikedBy });
      } else {
        await addQuote({
          quote,
          author,
          likeCount: 0,
          likedBy: newLikedBy,
          createdBy: "",
        });
      }
    }
  };

  const handleDelete = () => {
    if (id && uid === createdBy) {
      deleteQuote(id);
    } else {
      alert("You can only delete your own created quotes.");
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl max-w-sm sm:max-w-lg md:max-w-xl mx-auto shadow-md border border-gray-200 mt-8 sm:mt-10">
      <p className="text-xl sm:text-2xl font-bold text-left mb-2 text-gray-800">
        {quote}
      </p>
      <p className="text-sm sm:text-md text-gray-600 text-left mb-4">
        {author}
      </p>

      <div className="flex items-center justify-between mt-4 gap-2">
        {!onProfilePage && isAuthenticated && (
          <button
            className="p-2 rounded-full border border-blue-700 text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
            onClick={handleToggleLike}
            disabled={!uid}
            title="Add to my collection"
          >
            <FontAwesomeIcon
              icon={isLiked ? faThumbsUpSolid : faThumbsUpRegular}
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: isLiked ? "blue" : "currentColor" }}
            />
          </button>
        )}

        {onProfilePage && isUserCreated && uid === createdBy && (
          <div className="flex justify-end gap-3 ml-auto">
            <button
              className="p-2 rounded-full border border-gray-400 text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
              onClick={handleEdit}
              title="Edit"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            <button
              className="p-2 rounded-full border border-gray-400 text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
              onClick={handleDelete}
              title="Delete"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
          </div>
        )}
      </div>

      {showEditForm && (
        <EditQuoteForm
          quoteToEdit={{
            id,
            quote,
            author,
            likeCount: 0,
            likedBy: [],
            createdBy: createdBy,
          }}
          onSave={() => setShowEditForm(false)}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </section>
  );
};
