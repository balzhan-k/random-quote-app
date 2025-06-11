import { Quote, QuotesState } from "./types";

export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  ADD_QUOTE = "ADD_QUOTE",
  SET_CURRENT_INDEX = "SET_CURRENT_INDEX",
  SET_SHOW_QUOTE = "SET_SHOW_QUOTE",
  TOGGLE_LIKE = "TOGGLE_LIKE",
}

export type QuotesAction =
  | { type: QuotesActionType.SET_QUOTES; payload: Quote[] }
  | { type: QuotesActionType.ADD_QUOTE; payload: Quote }
  | { type: QuotesActionType.SET_CURRENT_INDEX; payload: number | null }
  | { type: QuotesActionType.SET_SHOW_QUOTE; payload: boolean }
  | {
      type: QuotesActionType.TOGGLE_LIKE;
      payload: { quoteIndex: number; shouldLike: boolean };
    };

export const initialState: QuotesState = {
  quotes: [],
  currentQuoteIndex: null,
  showQuote: false,
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
    case QuotesActionType.TOGGLE_LIKE:
      const { quoteIndex, shouldLike } = action.payload;
      const updatedQuotes = [...state.quotes];
      updatedQuotes[quoteIndex] = {
        ...updatedQuotes[quoteIndex],
        likeCount: shouldLike ? 1 : 0,
      };
      return { ...state, quotes: updatedQuotes };
    default:
      return state;
  }
};
