import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Quote, QuotesState } from "./types";
import {
  quotesReducer,
  QuotesAction,
  QuotesActionType,
  initialState,
} from "./quotesReducer";
import { useAuth } from "./AuthContextProvider";

export interface QuotesDispatchContextType {
  dispatch: React.Dispatch<QuotesAction>;
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
}

export const QuotesContext = createContext<QuotesState | undefined>(undefined);
export const QuotesDispatchContext = createContext<
  QuotesDispatchContextType | undefined
>(undefined);

export const QuotesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(quotesReducer, initialState, () => {
    const saved = localStorage.getItem("appState");
    return saved ? JSON.parse(saved) : initialState;
  });

  const { uid } = useAuth(); 

  const handleLikeQuote = useCallback(
    (quoteToLike: Quote) => {
      const quoteIndex = state.quotes.findIndex(
        (q) => q.quote === quoteToLike.quote
      );
      if (quoteIndex !== -1 && uid) {
        dispatch({
          type: QuotesActionType.LIKE_QUOTE,
          payload: {
            quoteIndex,
            userId: uid,
          },
        });
      }
    },
    [state.quotes, uid, dispatch]
  );

  const handleUnlikeQuote = useCallback(
    (quoteToUnlike: Quote) => {
      const quoteIndex = state.quotes.findIndex(
        (q) => q.quote === quoteToUnlike.quote
      );
      if (quoteIndex !== -1 && uid) {
        dispatch({
          type: QuotesActionType.UNLIKE_QUOTE,
          payload: {
            quoteIndex,
            userId: uid,
          },
        });
      }
    },
    [state.quotes, uid, dispatch]
  );

  useEffect(() => {
    if (state.quotes.length === 0) {
      const fetchInitialQuotes = async () => {
        try {
          const response = await fetch("/api/quotes");
          const data = await response.json();
          const formatted = data.map((q: any) => ({
            quote: q.q,
            author: q.a || "Unknown",
            likeCount: 0,
            likedBy: [],
          }));
          dispatch({ type: QuotesActionType.SET_QUOTES, payload: formatted });
        } catch (error) {
          console.error("Failed to fetch initial quotes:", error);
        }
      };
      fetchInitialQuotes();
    }
  }, [state.quotes.length, dispatch]);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <QuotesContext.Provider value={state}>
      <QuotesDispatchContext.Provider
        value={{ dispatch, handleLikeQuote, handleUnlikeQuote }}
      >
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error(
      "useQuotesContext must be used within an QuotesContextProvider"
    );
  }
  return context;
};

export const useQuotesDispatch = () => {
  const context = useContext(QuotesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useQuotesDispatch must be used within an QuotesContextProvider"
    );
  }
  return context;
};
