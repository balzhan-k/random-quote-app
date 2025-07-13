import { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Quote } from "../types";

interface FirebaseOperationResult {
  success: boolean;
  error?: string;
}

export const useFirestoreQuotes = () => {
  const [firestoreQuotes, setFirestoreQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const quotesCollection = collection(db, "quotes");
    const unsubscribe = onSnapshot(
      quotesCollection,
      (snapshot) => {
        const quotesData: Quote[] = [];
        snapshot.forEach((doc) => {
          quotesData.push({ id: doc.id, ...doc.data() } as Quote);
        });
        setFirestoreQuotes(quotesData);
      },
      (error) => {
        console.error("Error fetching quotes: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const addQuote = useCallback(
    async (newQuote: Omit<Quote, "id">): Promise<FirebaseOperationResult> => {
      try {
        const quotesCollection = collection(db, "quotes");
        await addDoc(quotesCollection, newQuote);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || "Failed to add quote",
        };
      }
    },
    []
  );

  const updateQuote = useCallback(
    async (
      id: string,
      updatedFields: Partial<Quote>
    ): Promise<FirebaseOperationResult> => {
      try {
        const quoteRef = doc(db, "quotes", id);
        await updateDoc(quoteRef, updatedFields);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || "Failed to update quote",
        };
      }
    },
    []
  );

  const deleteQuote = useCallback(
    async (id: string): Promise<FirebaseOperationResult> => {
      try {
        const quoteRef = doc(db, "quotes", id);
        await deleteDoc(quoteRef);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || "Failed to delete quote",
        };
      }
    },
    []
  );

  return {
    firestoreQuotes,
    addQuote,
    updateQuote,
    deleteQuote,
  };
};
