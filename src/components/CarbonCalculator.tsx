/** @format */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trees,
  Sprout,
  Wind,
  Info,
  Calculator,
  RotateCcw,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import { toast } from "sonner";
import { TREE_SPECIES, CARBON_POOLS_DEFAULTS } from "../data/carbonMethods";

// Constants for conversions
const C_TO_CO2 = 44 / 12; // 3.67

export default function CarbonCalculator() {
  // --- State ---
  const [area, setArea] = useState<number | "">("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(
    TREE_SPECIES[0].id
  );
  const [dbh, setDbh] = useState<number | "">(""); // cm
  const [height, setHeight] = useState<number | "">(""); // m
  const [density, setDensity] = useState<number | "">(""); // trees/ha

  // Advanced Options (Other Pools)
  const [includeSoil, setIncludeSoil] = useState(true);
  const [includeLitter, setIncludeLitter] = useState(true);
  const [includeUnderstory, setIncludeUnderstory] = useState(true);

  const [result, setResult] = useState<{
    totalCarbon: number;
    totalCO2: number;
    breakdown: {
      biomassAbove: number;
      biomassBelow: number;
      soil: number;
      litter: number;
      understory: number;
    };
  } | null>(null);

  // --- Calculations ---
  const handleCalculate = () => {
    if (!area || area <= 0) {
      toast.error("请输入有效的林地面积");
      return;
    }
    if (!dbh || dbh <= 0) {
      toast.error("请输入平均胸径");
      return;
    }
    if (!height || height <= 0) {
      toast.error("请输入平均树高");
      return;
    }
    if (!density || density <= 0) {
      toast.error("请输入林分密度");
      return;
    }

    const species = TREE_SPECIES.find((s) => s.id === selectedSpeciesId);
    if (!species) return;

    // 1. Tree Biomass (Single Tree) -> kg
    const singleTreeBiomassKg = species.calculateBiomass(
      Number(dbh),
      Number(height)
    );
    const singleTreeCarbonKg = singleTreeBiomassKg * species.carbonFraction;

    // 2. Tree Carbon Stock (Total Area) -> tonnes
    // Density is trees/ha, Area is ha.
    // Total Trees = Density * Area
    // Total Carbon (Above Ground) = Total Trees * SingleCarbonKg / 1000 (to tonnes)
    const totalTrees = Number(density) * Number(area);
    const carbonAbove = (totalTrees * singleTreeCarbonKg) / 1000;

    // 3. Below Ground Carbon
    const carbonBelow = carbonAbove * species.rootShootRatio;

    // 4. Other Pools (t C/ha * ha)
    const carbonSoil = includeSoil
      ? CARBON_POOLS_DEFAULTS.soil * Number(area)
      : 0;
    const carbonLitter = includeLitter
      ? CARBON_POOLS_DEFAULTS.litter * Number(area)
      : 0;
    const carbonUnderstory = includeUnderstory
      ? (CARBON_POOLS_DEFAULTS.shrub + CARBON_POOLS_DEFAULTS.herb) *
        Number(area)
      : 0;

    const totalCarbon =
      carbonAbove + carbonBelow + carbonSoil + carbonLitter + carbonUnderstory;
    const totalCO2 = totalCarbon * C_TO_CO2;

    setResult({
      totalCarbon,
      totalCO2,
      breakdown: {
        biomassAbove: carbonAbove,
        biomassBelow: carbonBelow,
        soil: carbonSoil,
        litter: carbonLitter,
        understory: carbonUnderstory,
      },
    });
    toast.success("碳汇量计算完成");
  };

  const handleReset = () => {
    setArea("");
    setDbh("");
    setHeight("");
    setDensity("");
    setResult(null);
    toast.info("已重置");
  };

  return (
    <section className='py-20 relative overflow-hidden bg-slate-50'>
      {/* Background Decorations */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl' />
        <div className='absolute top-1/2 -left-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl' />
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='text-center mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className='inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-md mb-6'>
              <Calculator className='w-8 h-8 text-green-600 mr-3' />
              <h2 className='text-3xl font-bold text-slate-800'>
                林业碳汇智能计算器
              </h2>
            </div>
            <p className='text-slate-500 max-w-2xl mx-auto'>
              基于 <span className='font-mono font-bold'>DB11/T 953—2024</span>{" "}
              北京市地方标准《林地碳汇计量监测技术规程》，为您提供专业的碳汇量估算服务。
            </p>
          </motion.div>
        </div>

        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='lg:col-span-7 space-y-6'
          >
            <div className='bg-white rounded-3xl shadow-xl border border-slate-100 p-8'>
              <h3 className='text-xl font-bold text-slate-800 mb-6 flex items-center'>
                <span className='w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm font-bold'>
                  1
                </span>
                项目基础信息
              </h3>

              <div className='grid md:grid-cols-2 gap-6 mb-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-600'>
                    林地面积 (公顷)
                  </label>
                  <div className='relative'>
                    <input
                      type='number'
                      value={area}
                      onChange={(e) =>
                        setArea(e.target.value ? Number(e.target.value) : "")
                      }
                      placeholder='0.00'
                      className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none'
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm'>
                      ha
                    </span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-600'>
                    主要树种
                  </label>
                  <select
                    value={selectedSpeciesId}
                    onChange={(e) => setSelectedSpeciesId(e.target.value)}
                    className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white'
                  >
                    {TREE_SPECIES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 className='text-xl font-bold text-slate-800 mb-6 flex items-center pt-4 border-t border-slate-50'>
                <span className='w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm font-bold'>
                  2
                </span>
                林木测定数据 (平均值)
              </h3>

              <div className='grid md:grid-cols-3 gap-6 mb-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-600'>
                    平均胸径 (DBH)
                  </label>
                  <div className='relative'>
                    <input
                      type='number'
                      value={dbh}
                      onChange={(e) =>
                        setDbh(e.target.value ? Number(e.target.value) : "")
                      }
                      placeholder='0'
                      className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none'
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm'>
                      cm
                    </span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-600'>
                    平均树高
                  </label>
                  <div className='relative'>
                    <input
                      type='number'
                      value={height}
                      onChange={(e) =>
                        setHeight(e.target.value ? Number(e.target.value) : "")
                      }
                      placeholder='0'
                      className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none'
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm'>
                      m
                    </span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-600'>
                    林分密度
                  </label>
                  <div className='relative'>
                    <input
                      type='number'
                      value={density}
                      onChange={(e) =>
                        setDensity(e.target.value ? Number(e.target.value) : "")
                      }
                      placeholder='0'
                      className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none'
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm'>
                      株/ha
                    </span>
                  </div>
                </div>
              </div>

              <div className='pt-4 border-t border-slate-50'>
                {/* <button
                  onClick={() =>
                    setIncludeUnderstory(!includeUnderstory) ||
                    setIncludeSoil(!includeSoil) ||
                    setIncludeLitter(!includeLitter)
                  } // Simple toggle for demo, realistically separate
                  className='text-sm text-slate-500 flex items-center gap-2 hover:text-green-600 transition-colors mb-4 cursor-pointer'
                >
                  <Info className='w-4 h-4' />
                  高级选项：碳库范围选择 (默认包含土壤、枯落物、林下植被)
                </button> */}
                <div className='flex flex-wrap gap-4'>
                  <label className='flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors'>
                    <input
                      type='checkbox'
                      checked={includeSoil}
                      onChange={(e) => setIncludeSoil(e.target.checked)}
                      className='rounded text-green-500 focus:ring-green-500'
                    />
                    <span className='text-sm font-medium text-slate-700'>
                      土壤有机碳
                    </span>
                  </label>
                  <label className='flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors'>
                    <input
                      type='checkbox'
                      checked={includeLitter}
                      onChange={(e) => setIncludeLitter(e.target.checked)}
                      className='rounded text-green-500 focus:ring-green-500'
                    />
                    <span className='text-sm font-medium text-slate-700'>
                      枯落物层
                    </span>
                  </label>
                  <label className='flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors'>
                    <input
                      type='checkbox'
                      checked={includeUnderstory}
                      onChange={(e) => setIncludeUnderstory(e.target.checked)}
                      className='rounded text-green-500 focus:ring-green-500'
                    />
                    <span className='text-sm font-medium text-slate-700'>
                      林下植被 (灌/草)
                    </span>
                  </label>
                </div>
              </div>

              <div className='flex gap-4 mt-8'>
                <button
                  onClick={handleCalculate}
                  className='flex-1 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2'
                >
                  <Calculator className='w-5 h-5' />
                  开始计算
                </button>
                <button
                  onClick={handleReset}
                  className='px-6 py-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all'
                >
                  <RotateCcw className='w-5 h-5' />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='lg:col-span-5'
          >
            <div className='bg-slate-900 text-white rounded-3xl shadow-2xl p-8 h-full relative overflow-hidden'>
              {/* Background Pattern */}
              <div className='absolute inset-0 opacity-10'>
                <svg className='w-full h-full' viewBox='0 0 100 100'>
                  <pattern
                    id='grid'
                    width='10'
                    height='10'
                    patternUnits='userSpaceOnUse'
                  >
                    <path
                      d='M 10 0 L 0 0 0 10'
                      fill='none'
                      stroke='white'
                      strokeWidth='0.5'
                    />
                  </pattern>
                  <rect width='100' height='100' fill='url(#grid)' />
                </svg>
              </div>

              <div className='relative z-10 h-full flex flex-col'>
                <h3 className='text-xl font-medium text-slate-300 mb-8 flex items-center gap-2'>
                  <CheckCircle2 className='w-5 h-5 text-green-400' />
                  计算结果
                </h3>

                {result ? (
                  <div className='flex-1 flex flex-col justify-center'>
                    <div className='text-center mb-10'>
                      <p className='text-slate-400 text-sm uppercase tracking-wider mb-2'>
                        预估总固碳量 (CO₂当量)
                      </p>
                      <div className='text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-4'>
                        {Math.round(result.totalCO2).toLocaleString()}
                        <span className='text-2xl text-slate-400 ml-2'>t</span>
                      </div>
                      <div className='inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300'>
                        <Leaf className='w-4 h-4 text-green-400' />
                        碳储量:{" "}
                        {Math.round(result.totalCarbon).toLocaleString()} t C
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <p className='text-sm font-medium text-slate-400 mb-2'>
                        碳库构成明细
                      </p>
                      {[
                        {
                          label: "乔木层地上生物量",
                          value: result.breakdown.biomassAbove,
                          color: "bg-green-500",
                        },
                        {
                          label: "乔木层地下生物量",
                          value: result.breakdown.biomassBelow,
                          color: "bg-emerald-600",
                        },
                        {
                          label: "土壤有机碳",
                          value: result.breakdown.soil,
                          color: "bg-amber-700",
                        },
                        {
                          label: "枯落物与林下植被",
                          value:
                            result.breakdown.litter +
                            result.breakdown.understory,
                          color: "bg-yellow-600",
                        },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className='flex justify-between text-xs text-slate-300 mb-1'>
                            <span>{item.label}</span>
                            <span>{Math.round(item.value)} t C</span>
                          </div>
                          <div className='w-full bg-white/10 rounded-full h-2 overflow-hidden'>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  (item.value / result.totalCarbon) * 100
                                }%`,
                              }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className='mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 leading-relaxed'>
                      <p className='mb-2 font-bold text-slate-300'>
                        * 算法说明:
                      </p>
                      依据 DB11/T 953—2024 标准，采用生物量异速生长方程 (W =
                      a(D²H)ᵇ)
                      测算乔木碳储量，并结合土壤、枯落物缺省值综合计算。
                      <br />
                      结果仅供参考，精确计量需进行实地采样与实验室分析。
                    </div>
                  </div>
                ) : (
                  <div className='flex-1 flex flex-col items-center justify-center text-center opacity-50'>
                    <Trees className='w-24 h-24 text-slate-600 mb-4' />
                    <p className='text-slate-400'>
                      请输入左侧项目数据
                      <br />
                      点击“开始计算”获取报告
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
