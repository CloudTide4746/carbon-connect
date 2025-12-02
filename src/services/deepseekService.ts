/** @format */

// DeepSeek API 配置
// 请在这里填入您的 API Key
const API_KEY = "sk-ede0992eafd64ae587df574883870c50";

// DeepSeek API 基础 URL (默认为官方地址，如果是中转服务请修改)
const API_URL = "https://api.deepseek.com/chat/completions";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * 调用 DeepSeek API 进行对话
 * @param messages 历史消息列表
 * @returns Promise<string> AI的回复
 */
export const chatWithDeepSeek = async (
  messages: ChatMessage[]
): Promise<string> => {
  if (API_KEY === "YOUR_DEEPSEEK_API_KEY_HERE") {
    console.warn("DeepSeek API Key is missing. Using mock response.");
    // 模拟延迟以展示加载状态
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "请在 src/services/deepseekService.ts 文件中配置您的 DeepSeek API Key 以启用真实对话功能。";
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // 或者 deepseek-coder, 根据需求选择
        messages: [
          {
            role: "system",
            content:
              "你是一个农业碳汇科普助手，名叫林小汇。你的职责是解答关于乡村振兴、碳汇交易、林业监测等问题。请保持回答专业、亲切且简洁。",
          },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed: ${response.status} ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("DeepSeek API Error:", error);
    return "抱歉，我现在连接大脑有些困难，请稍后再试。（请检查网络或API Key配置）";
  }
};
