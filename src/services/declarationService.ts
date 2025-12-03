/** @format */

import { mockRequest } from "./mockUtils";

export interface DeclarationData {
  id: string;
  name: string; // 申请人姓名
  location: string; // 林地位置
  area: number; // 林地面积
  treeType: string; // 树种
  contact: string; // 联系方式
  status: "pending" | "verified" | "rejected";
  carbonVolume?: number; // 预估碳汇量
  timestamp: number;
}

const STORAGE_KEY = "carbon_declarations";

// 获取本地存储的申报记录
export const getDeclarations = (): DeclarationData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// 模拟提交申报 API
export const submitDeclaration = async (
  formData: Omit<
    DeclarationData,
    "id" | "status" | "timestamp" | "carbonVolume"
  >
): Promise<DeclarationData> => {
  // 1. 模拟 AI 核验过程
  // 假设 AI 根据面积估算碳汇量 (模拟算法: 面积 * 0.8 + 随机波动)
  const estimatedVolume = Math.floor(formData.area * 0.8 + Math.random() * 10);

  const newDeclaration: DeclarationData = {
    ...formData,
    id: Math.random().toString(36).substr(2, 9),
    status: "verified", // 模拟 AI 自动核验通过
    carbonVolume: estimatedVolume,
    timestamp: Date.now(),
  };

  // 2. 模拟网络请求延迟
  await mockRequest(newDeclaration, false, 2000);

  // 3. 存入本地存储 (模拟数据库写入)
  const currentData = getDeclarations();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newDeclaration, ...currentData])
  );

  return newDeclaration;
};
