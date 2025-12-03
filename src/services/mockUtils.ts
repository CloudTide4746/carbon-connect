/** @format */

// 模拟网络延迟
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 模拟 API 响应接口
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

// 通用 Mock 请求函数
export const mockRequest = async <T>(
  data: T,
  shouldFail = false,
  delayTime = 1500
): Promise<ApiResponse<T>> => {
  await delay(delayTime); // 模拟网络请求耗时

  if (shouldFail) {
    throw new Error("网络请求失败，请重试");
  }

  return {
    success: true,
    data,
    message: "操作成功",
  };
};
