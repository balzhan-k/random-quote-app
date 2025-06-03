import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Quote } from "./types";
import { quotesReducer, QuotesAction, QuotesActionType } from "./quotesReducer";

// Context для данных цитат (основной список)
export const QuotesContext = createContext<Quote[] | undefined>(undefined);

interface QuotesDispatchContextType {
  dispatch: React.Dispatch<QuotesAction>;
  handleDeleteCreatedQuote: (quote: Quote) => void;
}

export const QuotesDispatchContext = createContext<QuotesDispatchContextType | undefined>(
  undefined
);

// Context для состояния UI отображаемой цитаты
interface QuoteUIContextType {
  showQuote: boolean;
  currentIndex: number | null;
}

interface QuoteUIDispatchContextType {
  setShowQuote: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const QuoteUIContext = createContext<QuoteUIContextType | undefined>(
  undefined
);
export const QuoteUIDispatchContext = createContext<
  QuoteUIDispatchContextType | undefined
>(undefined);

// Context для лайкнутых цитат
export const LikedQuotesContext = createContext<Quote[] | undefined>(undefined);
export const LikedQuotesDispatchContext = createContext<{
  handleLike: (quote: Quote, shouldLike: boolean) => void;
  handleDislike: (quote: Quote) => void;
} | undefined>(undefined);

export const QuotesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [quotes, dispatch] = useReducer(
    quotesReducer,
    [],
    () => {
      const saved = localStorage.getItem("quotes");
      return saved ? JSON.parse(saved) : [];
    }
  );

  // Состояния UI для отображаемой цитаты
  const [showQuote, setShowQuote] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Состояние для лайкнутых цитат
  const [likedQuotes, setLikedQuotes] = useState<Quote[]>(() => {
    const savedLiked = localStorage.getItem("likedQuotes");
    return savedLiked ? JSON.parse(savedLiked) : [];
  });

  // Первоначальная загрузка цитат из API, если localStorage основного списка пуст
  useEffect(() => {
    if (quotes.length === 0) {
      const fetchInitialQuotes = async () => {
        try {
          const response = await fetch("/api/quotes");
          const data = await response.json();
          const formatted = data.map((q: any) => ({
            quote: q.q,
            author: q.a || "Unknown",
            likeCount: 0,
          }));
          dispatch({ type: QuotesActionType.SET_QUOTES, payload: formatted });
        } catch (error) {
          console.error("Failed to fetch initial quotes:", error);
        }
      };
      fetchInitialQuotes();
    }
  }, [quotes.length, dispatch]);

  // Сохранение основного списка цитат в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  // Сохранение лайкнутых цитат в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  // Функции для лайков/дизлайков (работают с likedQuotes)
  const handleLike = (quoteToLike: Quote, shouldLike: boolean) => {
    setLikedQuotes((prevLikedQuotes) => {
      const existingQuote = prevLikedQuotes.find(q => q.quote === quoteToLike.quote);
      if (shouldLike) {
        if (!existingQuote) {
          return [...prevLikedQuotes, { ...quoteToLike, likeCount: 1 }];
        }
      } else {
        if (existingQuote) {
          return prevLikedQuotes.filter(q => q.quote !== quoteToLike.quote);
        }
      }
      return prevLikedQuotes;
    });
  };

  const handleDislike = (quoteToDislike: Quote) => {
    setLikedQuotes((prevLikedQuotes) => {
      return prevLikedQuotes.filter(q => q.quote !== quoteToDislike.quote);
    });
  };

  const handleDeleteCreatedQuote = (quoteToDelete: Quote) => {
    dispatch({ type: QuotesActionType.DELETE_CREATED_QUOTE, payload: { quote: quoteToDelete.quote, author: quoteToDelete.author } });
  };

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={{ dispatch, handleDeleteCreatedQuote }}>
        <QuoteUIContext.Provider value={{ showQuote, currentIndex }}>
          <QuoteUIDispatchContext.Provider value={{ setShowQuote, setCurrentIndex }}>
            <LikedQuotesContext.Provider value={likedQuotes}>
              <LikedQuotesDispatchContext.Provider value={{ handleLike, handleDislike }}>
                {children}
              </LikedQuotesDispatchContext.Provider>
            </LikedQuotesContext.Provider>
          </QuoteUIDispatchContext.Provider>
        </QuoteUIContext.Provider>
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
export const useQuoteUIContext = () => useContext(QuoteUIContext);
export const useQuoteUIDispatchContext = () => useContext(QuoteUIDispatchContext);
export const useLikedQuotesContext = () => useContext(LikedQuotesContext);
export const useLikedQuotesDispatchContext = () => useContext(LikedQuotesDispatchContext);
