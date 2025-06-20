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

  const addQuote = useCallback(async (newQuote: Omit<Quote, "id">) => {
    try {
      const quotesCollection = collection(db, "quotes");
      await addDoc(quotesCollection, newQuote);
      console.log("Quote added successfully");
    } catch (error) {
      console.error("Error adding quote: ", error);
    }
  }, []);

  const updateQuote = useCallback(
    async (id: string, updatedFields: Partial<Quote>) => {
      try {
        const quoteRef = doc(db, "quotes", id);
        await updateDoc(quoteRef, updatedFields);
        console.log("Quote updated successfully");
      } catch (error) {
        console.error("Error updating quote: ", error);
      }
    },
    []
  );

  const deleteQuote = useCallback(async (id: string) => {
    try {
      const quoteRef = doc(db, "quotes", id);
      await deleteDoc(quoteRef);
      console.log("Quote deleted successfully");
    } catch (error) {
      console.error("Error deleting quote: ", error);
    }
  }, []);

  return {
    firestoreQuotes,
    addQuote,
    updateQuote,
    deleteQuote,
  };
};
