import { useState, useMemo } from "react";
import { Transaction, TxStatus } from "../types/transaction";

export function useTransactionPagination(transactions: Transaction[]) {
  const [filter, setFilterState] = useState<TxStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(5);

  const setFilter = (newFilter: TxStatus | "all") => {
    setFilterState(newFilter);
    setCurrentPage(1); // Handle page reset on changeable point instantly
  };

  const setPageSize = (newSize: number) => {
    setPageSizeState(newSize);
    setCurrentPage(1); // Handle page reset on changeable point instantly
  };

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter(t => t.status === filter);
  }, [transactions, filter]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages); // Derived safely on render

  const currentTransactions = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredTransactions.slice(startIndex, startIndex + pageSize);
  }, [filteredTransactions, safeCurrentPage, pageSize]);

  return {
    filter,
    setFilter,
    currentPage: safeCurrentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    currentTransactions,
    filteredTransactionsCount: filteredTransactions.length,
    totalPages
  };
}
