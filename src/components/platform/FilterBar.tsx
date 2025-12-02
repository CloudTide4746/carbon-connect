import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function FilterBar({ selectedCategory, setSelectedCategory }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
        {['all', '造林碳汇', '森林经营', '竹林碳汇'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-eco-green-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat === 'all' ? '全部项目' : cat}
          </button>
        ))}
      </div>
      
      <div className="flex gap-3 w-full md:w-auto">
        <div className="relative flex-grow md:flex-grow-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索项目..." 
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 bg-white">
          <Filter className="h-4 w-4" />
          <span>筛选</span>
        </button>
      </div>
    </div>
  );
}
