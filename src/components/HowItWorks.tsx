/** @format */

import { motion } from "framer-motion";
import { Scan, Database, TrendingUp, Wallet } from "lucide-react";

const steps = [
  {
    icon: Scan,
    title: "监测与确权",
    desc: "卫星遥感自动扫描，AI 算法识别林地碳储量，生成数字化碳汇档案。",
  },
  {
    icon: Database,
    title: "核算与认证",
    desc: "多源数据融合计算，生成标准化的碳信用资产，全流程数据可追溯。",
  },
  {
    icon: TrendingUp,
    title: "挂牌与交易",
    desc: "资产接入交易平台，企业按需购买，系统自动完成资金结算。",
  },
  {
    icon: Wallet,
    title: "收益分配",
    desc: "交易资金直接划入乡村集体账户，实现生态价值的精准变现。",
  },
];

export default function HowItWorks() {
  return (
    <section className='py-20 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-slate-900'>平台运作流程</h2>
          <p className='mt-4 text-lg text-slate-600'>
            从森林到收益，全链路数字化闭环
          </p>
        </div>

        <div className='relative'>
          {/* Connecting Line (Desktop) */}
          <div className='hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0'></div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10'>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center group hover:shadow-md transition-shadow'
              >
                <div className='w-16 h-16 mx-auto bg-eco-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-eco-green-600 transition-colors'>
                  <step.icon className='w-8 h-8 text-eco-green-600 group-hover:text-white transition-colors' />
                </div>
                <h3 className='text-xl font-bold text-slate-900 mb-3'>
                  {step.title}
                </h3>
                <p className='text-slate-600 text-sm leading-relaxed'>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
