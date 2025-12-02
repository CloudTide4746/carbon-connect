interface AreaInputProps {
  area: number | '';
  setArea: (area: number | '') => void;
}

export default function AreaInput({ area, setArea }: AreaInputProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">4. 面积 (公顷)</label>
      <input 
        type="number" 
        value={area}
        onChange={(e) => setArea(Number(e.target.value))}
        placeholder="请输入林地面积..."
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-eco-green-500 focus:ring-2 focus:ring-eco-green-500/20 transition-all"
      />
    </div>
  );
}
