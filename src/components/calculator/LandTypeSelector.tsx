import { TreePine, Sprout, Trees } from 'lucide-react';

interface LandTypeSelectorProps {
  type: string;
  setType: (type: string) => void;
}

export default function LandTypeSelector({ type, setType }: LandTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">1. 林地类型</label>
      <div className="grid grid-cols-3 gap-3">
        {[
          { id: 'forest', label: '普通森林', icon: TreePine },
          { id: 'bamboo', label: '竹林', icon: Sprout },
          { id: 'wetland', label: '湿地', icon: Trees }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setType(item.id)}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
              type === item.id 
                ? 'border-eco-green-500 bg-eco-green-50 text-eco-green-700 ring-2 ring-eco-green-500/20' 
                : 'border-slate-200 text-slate-600 hover:border-eco-green-300'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <div className="font-medium text-xs">{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
