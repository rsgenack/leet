"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface QuestionsDataContextType {
  data: any[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const QuestionsDataContext = createContext<QuestionsDataContextType | undefined>(undefined);

export function QuestionsDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = () => {
    setLoading(true);
    setError(null);
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading questions data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <QuestionsDataContext.Provider value={{ data, loading, error, refetch: fetchQuestions }}>
      {children}
    </QuestionsDataContext.Provider>
  );
}

export function useQuestionsData() {
  const ctx = useContext(QuestionsDataContext);
  if (!ctx) throw new Error("useQuestionsData must be used within a QuestionsDataProvider");
  return ctx;
} 