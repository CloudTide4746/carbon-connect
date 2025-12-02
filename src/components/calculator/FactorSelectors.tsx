interface FactorSelectorsProps {
  age: string;
  setAge: (age: string) => void;
  density: string;
  setDensity: (density: string) => void;
}

export default function FactorSelectors({ age, setAge, density, setDensity }: FactorSelectorsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">2. 树龄结构</label>
        <select 
          value={age} 
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-eco-green-500 bg-white text-slate-700"
        >
          <option value="young">幼龄林 (生长快 x1.2)</option>
          <option value="mature">中龄林 (标准 x1.0)</option>
          <option value="old">过熟林 (生长慢 x0.8)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">3. 植被密度</label>
        <select 
          value={density} 
          onChange={(e) => setDensity(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-eco-green-500 bg-white text-slate-700"
        >
          <option value="low">稀疏 (x0.9)</option>
          <option value="medium">中等 (x1.0)</option>
          <option value="high">茂密 (x1.1)</option>
        </select>
      </div>
    </div>
  );
}
