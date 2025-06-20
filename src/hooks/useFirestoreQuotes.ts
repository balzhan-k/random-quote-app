import { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
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
        const  quotesCollection = collection(db, "quotes");
        await addDoc(quotesCollection, newQuote);
        console.log("Quote added successfully");
    } catch (error) {
        console.error("Error adding quote: ", error);
    }
  }, []);




  return {
    firestoreQuotes,
    addQuote,
  };
};
