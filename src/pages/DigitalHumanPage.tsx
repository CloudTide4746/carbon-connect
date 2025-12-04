/** @format */

import {
  Bot,
  MessageSquare,
  Mic,
  Send,
  Loader2,
  FileText,
  Calculator,
  TreePine,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  chatWithDeepSeek,
  type ChatMessage,
} from "../services/deepseekService";
import useGlobalStore from "../globalState";
import { toast } from "sonner";
import { IMAGES } from "../constants/images";

export default function DigitalHumanPage() {
  const { chatMessages: messages, setChatMessages: setMessages } =
    useGlobalStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textOverride?: string, systemPrompt?: string) => {
    if (isLoading) return;
    const textToSend = textOverride || input;

    if (!textToSend.trim()) {
      toast.warning("请输入内容后再发送");
      return;
    }

    const userMessage = textToSend.trim();
    if (!textOverride) setInput(""); // Only clear input if typed manually

    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setIsLoading(true);

    // 转换消息格式以适配 API
    const apiMessages: ChatMessage[] = messages
      .filter(
        (msg) =>
          msg.type !== "bot" ||
          msg.text !== "你好！我是您的碳汇助手林小汇。请问有什么可以帮您？"
      ) // 过滤初始欢迎语（可选）
      .map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    // 添加当前用户消息
    apiMessages.push({ role: "user", content: userMessage });

    try {
      const response = await chatWithDeepSeek(apiMessages, systemPrompt);
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
    } catch (error) {
      toast.error("请求失败，请稍后再试");
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `请求失败，请稍后再试${
            error instanceof Error ? error.message : ""
          }`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const aiTools = [
    {
      icon: FileText,
      label: "政策解读",
      color: "bg-blue-500",
      prompt:
        "请为我解读最新的林业碳汇相关政策，重点关注CCER重启后的变化和机会。",
      desc: "深度解析最新碳汇政策红利",
    },
    {
      icon: Calculator,
      label: "碳汇估算",
      color: "bg-green-500",
      prompt:
        "我有一片林地，请帮我粗略估算一下每亩林地大概能产生多少碳汇收益？请列出计算依据。",
      desc: "快速评估林地潜在价值",
    },
    {
      icon: TreePine,
      label: "项目策划",
      color: "bg-orange-500",
      prompt:
        "我想开发一个林业碳汇项目，请为我生成一份简要的项目开发策划书大纲，包含关键步骤和风险提示。",
      desc: "生成专业的项目开发方案",
    },
  ];

  const quickPrompts = [
    "林业碳汇项目从立项到完成碳汇计量的全流程需要多少个工作日？每个环节的关键节点是什么？",
    "当前主流的林业碳汇方法学（如VCS、CCER）在项目基准线设定、额外性论证上的核心差异是什么？",
    "一片100公顷的人工造林碳汇项目，在运营期内（20年）的年均碳汇量大约是多少吨CO₂e？受哪些因素影响？",
    "林业碳汇项目开发过程中，权属证明（如林权证）的信息缺失或不清晰，会导致哪些审核风险？如何补救？",
    "林业碳汇项目的监测频率要求是什么？现场核查时需要准备哪些原始数据（如林木生长量、土壤碳库数据）？",
    "林业碳汇项目参与CCER交易的流程是什么？交易价格受哪些市场因素影响？",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='pt-20 min-h-screen bg-slate-900 text-white'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20'>
        <div className='grid lg:grid-cols-3 gap-8 items-start'>
          {/* Left Column: Avatar & Tools */}
          <div className='lg:col-span-1 space-y-8'>
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='relative aspect-square rounded-full bg-gradient-to-b from-eco-green-500/20 to-transparent flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl shadow-eco-green-900/50'
            >
              <div
                className='absolute inset-0 opacity-30 animate-pulse'
                style={{
                  backgroundImage: `url('${IMAGES.PATTERNS.STARDUST}')`,
                }}
              ></div>
              <div className='text-[150px]'>👩‍🌾</div>
              <div className='absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/20 flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-ping'></div>
                <span className='text-sm font-mono text-green-400'>Online</span>
              </div>
            </motion.div>

            {/* AI Tools Grid */}
            <div className='bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm'>
              <h3 className='text-lg font-bold mb-4 flex items-center gap-2'>
                <Bot className='w-5 h-5 text-eco-green-400' />
                智能工具箱
              </h3>
              <div className='space-y-3'>
                {aiTools.map((tool, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(tool.prompt)}
                    disabled={isLoading}
                    className='w-full flex items-center gap-4 p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-transparent hover:border-slate-600 transition-all group text-left disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <div
                      className={`p-2 rounded-lg ${tool.color} text-white group-hover:scale-110 transition-transform`}
                    >
                      <tool.icon className='w-5 h-5' />
                    </div>
                    <div>
                      <div className='font-medium text-slate-200'>
                        {tool.label}
                      </div>
                      <div className='text-xs text-slate-400'>{tool.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chat Interface */}
          <div className='lg:col-span-2'>
            <div className='mb-6'>
              <h1 className='text-4xl font-bold mb-2'>
                数字人 <span className='text-eco-green-400'>林小汇</span>
              </h1>
              <p className='text-slate-400'>
                基于多模态大模型的农业碳汇科普助手，提供7x24小时智能咨询服务。
              </p>
            </div>

            <div className='bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl h-[600px] flex flex-col'>
              <div className='p-4 bg-slate-900/50 border-b border-slate-700 flex items-center gap-3'>
                <MessageSquare className='w-5 h-5 text-eco-green-400' />
                <span className='font-semibold'>智能对话窗口</span>
              </div>

              <div className='flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar scroll-smooth'>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.type === "user"
                          ? "bg-eco-green-600 text-white rounded-tr-sm"
                          : "bg-slate-700 text-slate-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className='flex justify-start'>
                    <div className='bg-slate-700 text-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2'>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      <span className='text-sm'>思考中...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className='p-4 bg-slate-900/50 border-t border-slate-700'>
                {/* Quick Prompts */}
                <div className='flex gap-2 overflow-x-auto pb-3 mb-2 custom-scrollbar'>
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(prompt)}
                      className='whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-eco-green-500/50 hover:text-eco-green-400 transition-all text-xs text-slate-300 flex items-center gap-1.5 shrink-0'
                    >
                      <Sparkles className='w-3 h-3' />
                      {prompt.length > 15
                        ? prompt.slice(0, 15) + "..."
                        : prompt}
                    </button>
                  ))}
                </div>

                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={
                      isLoading ? "正在思考中..." : "请输入您的问题..."
                    }
                    disabled={isLoading}
                    className='flex-grow bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:outline-none focus:border-eco-green-500 disabled:opacity-50 disabled:cursor-not-allowed'
                  />
                  <button className='p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition-colors text-slate-300'>
                    <Mic className='w-5 h-5' />
                  </button>
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading}
                    className='p-3 rounded-xl bg-eco-green-600 hover:bg-eco-green-500 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Send className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
