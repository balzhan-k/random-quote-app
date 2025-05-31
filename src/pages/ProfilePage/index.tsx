import {
  useQuotesContext,
  useQuotesDispatchContext,
} from '../../QuotesContextProvider';
import { QuotesActionType } from '../../quotesReducer';
import { Quote } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown as faThumbsDownRegular } from '@fortawesome/free-regular-svg-icons';

export const ProfilePage = () => {
  const quotes = useQuotesContext();
  const dispatch = useQuotesDispatchContext();

  // Фильтруем только понравившиеся цитаты
  const likedQuotes = quotes ? quotes.filter(q => q.likeCount > 0) : [];

  function handleDislike(quote: Quote) {
    if (dispatch) {
      dispatch({
        type: QuotesActionType.DISLIKE_QUOTE,
        payload: { quote: quote.quote }
      });
    }
  }

  return (
    <main>
      {likedQuotes.length > 0 ? (
        likedQuotes.map((quote) => (
          <section
            key={quote.quote}
            className="text-green-700 bg-green-50 p-10 sm:p-8 rounded-2xl m-14 mx-auto w-[90%] sm:w-[80%] md:w-[70%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="rotate-180"
              >
                <path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path>
              </svg>
              <p className="text-xl text-left">{quote.quote}</p>
            </div>
            <p className="mt-3 text-xs tracking-wide text-left">{quote.author}</p>
            <div className="flex justify-end items-center mt-4">
              <button
                className="p-3 rounded-full border border-green-700 text-green-700 bg-green-50 hover:bg-green-100 transition flex items-center justify-center "
                onClick={() => handleDislike(quote)}
              >
                <FontAwesomeIcon
                  icon={faThumbsDownRegular}
                  className="w-6 h-6"
                  style={{ color: "green-500" }}
                />
              </button>
            </div>
          </section>
        ))
      ) : (
        <p className="text-green-100 text-center py-8 text-xl italic">No liked quotes yet.</p>
      )}
    </main>
  );
};