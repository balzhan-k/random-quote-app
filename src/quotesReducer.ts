import { Quote } from "./types";

export enum QuotesActionType {
  SET_QUOTES = 'SET_QUOTES',
  LIKE_QUOTE = 'LIKE_QUOTE',
  DISLIKE_QUOTE = 'DISLIKE_QUOTE',
}

export type SetQuotesAction = {
  type: QuotesActionType.SET_QUOTES;
  payload: Quote[];
};

export type LikeDislikeQuoteAction = {
  type: QuotesActionType.DISLIKE_QUOTE | QuotesActionType.LIKE_QUOTE;
  payload: {
    quote: string;
  };
};

export type QuotesAction =
  | SetQuotesAction
  | LikeDislikeQuoteAction;

export function quotesReducer(state: Quote[], action: QuotesAction): Quote[] {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return action.payload;
    case QuotesActionType.LIKE_QUOTE:
      return state.map(q =>
        q.quote === action.payload.quote
          ? { ...q, likeCount: q.likeCount + 1 }
          : q
      );
    case QuotesActionType.DISLIKE_QUOTE:
      return state.map(q =>
        q.quote === action.payload.quote && q.likeCount > 0
          ? { ...q, likeCount: q.likeCount - 1 }
          : q
      );
    default:
      return state;
  }
} 