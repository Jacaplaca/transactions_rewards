import { useEffect, useState } from "react";
const transactionsApi = "/api/transactions";

export type TransactionType = {
  id: number;
  userName: string;
  amount: number;
  date: string;
  userId: string;
};

const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const getFromApi = async () => {
    const response = await fetch(transactionsApi);
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    getFromApi();
  }, []);

  return transactions;
};

export default useTransactions;
