import { useState, useMemo, useEffect } from "react";
import { Transaction, TxStatus } from "../types";

export function useTransactionPagination(transactions: Transaction[]) {
  const [filter, setFilter] = useState<TxStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter(t => t.status === filter);
  }, [transactions, filter]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;

  // Reset to page 1 whenever filter or page size changes.
  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 0);
  }, [filter, pageSize]);
  
  // Also ensure currentPage does not exceed totalPages if transactions array shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setTimeout(() => {
        setCurrentPage(totalPages);
      }, 0);
    }
  }, [totalPages, currentPage]);

  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(startIndex, startIndex + pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

  return {
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    currentTransactions,
    filteredTransactionsCount: filteredTransactions.length,
    totalPages
  };
}
