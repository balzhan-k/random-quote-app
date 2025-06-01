import { Quote } from "./types";

export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  ADD_QUOTE = "ADD_QUOTE",
}

export type QuotesAction =
  | { type: QuotesActionType.SET_QUOTES; payload: Quote[] }
  | { type: QuotesActionType.ADD_QUOTE; payload: Quote };

export const quotesReducer = (state: Quote[], action: QuotesAction) => {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return action.payload;
    case QuotesActionType.ADD_QUOTE:
      return [...state, action.payload];
    default:
      return state;
  }
}; 