import { Quote, QuotesState } from "./types";

export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  ADD_QUOTE = "ADD_QUOTE",
}

export type QuotesAction =
  | { type: QuotesActionType.SET_QUOTES; payload: Quote[] }
  | { type: QuotesActionType.ADD_QUOTE; payload: Quote };

export const quotesReducer = (
  state: QuotesState,
  action: QuotesAction
): QuotesState => {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return { ...state, quotes: action.payload };
    case QuotesActionType.ADD_QUOTE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const initialState: QuotesState = {
  quotes: [],
  currentQuoteIndex: null,
  showQuote: false,
};
