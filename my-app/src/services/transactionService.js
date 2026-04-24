import { transactions } from "../mock/mockTransactions";

export const getTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 500);
  });
};