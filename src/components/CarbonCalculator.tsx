/** @format */

import { useState } from "react";
import { toast } from "sonner";
import CalculatorHeader from "./calculator/CalculatorHeader";
import LandTypeSelector from "./calculator/LandTypeSelector";
import FactorSelectors from "./calculator/FactorSelectors";
import AreaInput from "./calculator/AreaInput";
import ResultDisplay from "./calculator/ResultDisplay";
import { number } from "framer-motion";

export default function CarbonCalculator() {
  const [area, setArea] = useState<number | "">("");
  const [type, setType] = useState("forest");
  const [age, setAge] = useState("mature"); // young, mature, old
  const [density, setDensity] = useState("medium"); // low, medium, high

  const [result, setResult] = useState<number | null>(null);
  const [calculationProcess, setCalculationProcess] = useState<{
    baseFactor: number;
    ageFactor: number;
    densityFactor: number;
    formula: string;
  } | null>(null);

  const calculate = () => {
    if (type === "forest" && !area) {
      toast.error("请输入有效的林地面积");
      return;
    }
    if (type === "bamboo" && !area) {
      toast.error("请输入有效的竹林面积");
      return;
    }
    if (type === "grass" && !area) {
      toast.error("请输入有效的草地面积");
      return;
    }
    if (typeof area === "number" && area < 0) {
      toast.error("面积不能为负数");
      return;
    }
    if (!area) {
      toast.error("请输入有效的林地面积");
      return;
    }

    // 1. 基础固碳系数 (吨/公顷/年)
    let baseFactor = 15; // 普通森林
    if (type === "bamboo") baseFactor = 25; // 竹林
    if (type === "wetland") baseFactor = 10; // 湿地

    // 2. 树龄修正系数
    let ageFactor = 1.0;
    if (age === "young") ageFactor = 1.2; // 幼龄林生长快
    if (age === "old") ageFactor = 0.8; // 过熟林生长慢

    // 3. 密度修正系数
    let densityFactor = 1.0;
    if (density === "high") densityFactor = 1.1;
    if (density === "low") densityFactor = 0.9;

    // 计算总固碳量
    const total = Number(area) * baseFactor * ageFactor * densityFactor;

    setResult(Math.round(total * 100) / 100);
    setCalculationProcess({
      baseFactor,
      ageFactor,
      densityFactor,
      formula: `${area} (面积) × ${baseFactor} (基础) × ${ageFactor} (树龄) × ${densityFactor} (密度)`,
    });
    toast.success("计算完成！");
  };

  const reset = () => {
    setArea("");
    setResult(null);
    setCalculationProcess(null);
    toast.info("已重置计算器");
  };

  return (
    <section className='py-20 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 lg:flex'>
          <CalculatorHeader />

          <div className='lg:w-1/2 p-10 lg:p-16'>
            <div className='space-y-6'>
              <LandTypeSelector type={type} setType={setType} />
              <FactorSelectors
                age={age}
                setAge={setAge}
                density={density}
                setDensity={setDensity}
              />
              <AreaInput area={area} setArea={setArea} />
              <ResultDisplay
                result={result}
                calculationProcess={calculationProcess}
                reset={reset}
                calculate={calculate}
                area={area}
                type={type}
                age={age}
                density={density}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
