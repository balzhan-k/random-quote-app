import { Quote } from "./types";

export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  ADD_QUOTE = "ADD_QUOTE",
  DELETE_CREATED_QUOTE = "DELETE_CREATED_QUOTE",
  CLEAR_FETCHED_QUOTES = "CLEAR_FETCHED_QUOTES",
}

export type QuotesAction =
  | { type: QuotesActionType.SET_QUOTES; payload: Quote[] }
  | { type: QuotesActionType.ADD_QUOTE; payload: Quote }
  | { type: QuotesActionType.DELETE_CREATED_QUOTE; payload: { quote: string; author: string } }
  | { type: QuotesActionType.CLEAR_FETCHED_QUOTES };

export const quotesReducer = (state: Quote[], action: QuotesAction) => {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return action.payload;
    case QuotesActionType.ADD_QUOTE:
      return [...state, action.payload];
    case QuotesActionType.DELETE_CREATED_QUOTE:
      return state.filter(quote => !(quote.quote === action.payload.quote && quote.author === action.payload.author));
    case QuotesActionType.CLEAR_FETCHED_QUOTES:
      return state.filter(quote => quote.userId !== undefined);
    default:
      return state;
  }
}; 