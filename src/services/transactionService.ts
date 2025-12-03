/** @format */

import { mockRequest } from "./mockUtils";

export interface TransactionRecord {
  id: string;
  projectId: number;
  projectName: string;
  amount: number; // 购买数量 (吨)
  pricePerTon: number;
  totalPrice: number;
  buyer: string;
  timestamp: number;
  status: "success" | "failed";
  txHash: string; // 电子证书编号
}

const STORAGE_KEY = "carbon_transactions";

// 获取本地交易记录
export const getTransactions = (): TransactionRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// 模拟购买碳汇 API
export const purchaseCarbonCredit = async (
  projectId: number,
  projectName: string,
  amount: number,
  pricePerTon: number,
  buyerName: string = "企业用户_001"
): Promise<TransactionRecord> => {
  const totalPrice = amount * pricePerTon;
  
  // 生成模拟的证书编号 (CN-2025-XXXX)
  const txHash = "CN-2025-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const newTransaction: TransactionRecord = {
    id: Math.random().toString(36).substr(2, 9),
    projectId,
    projectName,
    amount,
    pricePerTon,
    totalPrice,
    buyer: buyerName,
    timestamp: Date.now(),
    status: "success",
    txHash,
  };

  // 模拟支付和生成证书过程 (3秒延迟)
  await mockRequest(newTransaction, false, 3000);

  // 存入本地存储
  const currentData = getTransactions();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newTransaction, ...currentData])
  );

  return newTransaction;
};
