import { useState } from "react";
import { Quote } from "../../types";
import { useFirestoreQuotes } from "../../hooks/useFirestoreQuotes";

interface EditQuoteFormProps {
  quoteToEdit: Quote;
  onSave: () => void;
  onCancel: () => void;
}

export const EditQuoteForm = ({
  quoteToEdit,
  onSave,
  onCancel,
}: EditQuoteFormProps) => {
  const [quoteText, setQuoteText] = useState(quoteToEdit.quote);
  const [authorText, setAuthorText] = useState(quoteToEdit.author);
  const { updateQuote } = useFirestoreQuotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteText.trim() && authorText.trim()) {
      await updateQuote(quoteToEdit.id!, {
        quote: quoteText,
        author: authorText,
      });
      onSave();
      onCancel();
    } else {
      alert("Please enter both quote and author.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md mx-auto relative">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
          Edit Quote
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label
              htmlFor="quote"
              className="block text-gray-700 text-sm sm:text-base font-bold mb-1 sm:mb-2"
            >
              Quote:
            </label>
            <textarea
              id="quote"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none text-sm sm:text-base"
              rows={4}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="author"
              className="block text-gray-700 text-sm sm:text-base font-bold mb-1 sm:mb-2"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base"
              value={authorText}
              onChange={(e) => setAuthorText(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition text-sm sm:text-base"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition text-sm sm:text-base"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
