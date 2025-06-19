import { Quote, QuotesState } from "./types";

export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  ADD_QUOTE = "ADD_QUOTE",
  SET_CURRENT_INDEX = "SET_CURRENT_INDEX",
  SET_SHOW_QUOTE = "SET_SHOW_QUOTE",
  DELETE_QUOTE = "DELETE_QUOTE",
  LIKE_QUOTE = "LIKE_QUOTE",
  UNLIKE_QUOTE = "UNLIKE_QUOTE",
}

export type QuotesAction =
  | { type: QuotesActionType.SET_QUOTES; payload: Quote[] }
  | { type: QuotesActionType.ADD_QUOTE; payload: Quote }
  | { type: QuotesActionType.SET_CURRENT_INDEX; payload: number | null }
  | { type: QuotesActionType.SET_SHOW_QUOTE; payload: boolean }
  | { type: QuotesActionType.DELETE_QUOTE; payload: string }
  | {
      type: QuotesActionType.LIKE_QUOTE;
      payload: { quoteIndex: number; userId: string };
    }
  | {
      type: QuotesActionType.UNLIKE_QUOTE;
      payload: { quoteIndex: number; userId: string };
    };

export const quotesReducer = (
  state: QuotesState,
  action: QuotesAction
): QuotesState => {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return { ...state, quotes: action.payload };

    case QuotesActionType.ADD_QUOTE:
      return { ...state, quotes: [...state.quotes, action.payload] };

    case QuotesActionType.SET_CURRENT_INDEX:
      return { ...state, currentQuoteIndex: action.payload };

    case QuotesActionType.SET_SHOW_QUOTE:
      return { ...state, showQuote: action.payload };

    case QuotesActionType.DELETE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.filter((quote) => quote.quote !== action.payload),
      };

    case QuotesActionType.LIKE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.map((quote, index) =>
          index === action.payload.quoteIndex &&
          !(quote.likedBy || []).includes(action.payload.userId)
            ? {
                ...quote,
                likeCount: quote.likeCount + 1,
                likedBy: [...(quote.likedBy || []), action.payload.userId],
              }
            : quote
        ),
      };

    case QuotesActionType.UNLIKE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.map((quote, index) =>
          index === action.payload.quoteIndex &&
          (quote.likedBy || []).includes(action.payload.userId)
            ? {
                ...quote,
                likeCount: quote.likeCount - 1,
                likedBy: (quote.likedBy || []).filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : quote
        ),
      };

    default:
      return state;
  }
};

export const initialState: QuotesState = {
  quotes: [],
  currentQuoteIndex: null,
  showQuote: false,
};
