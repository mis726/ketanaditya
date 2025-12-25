import React from 'react';
import { Filter, X, RotateCcw, Check, ArrowUpDown } from 'lucide-react';
import Button from './Button';

interface FilterState {
    categories: string[];
    ageGroups: string[];
    fabrics: string[];
    maxPrice: number;
}

interface FilterSidebarProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    isOpenMobile: boolean;
    setIsOpenMobile: (open: boolean) => void;
    totalResults: number;
    sortBy?: string;
    setSortBy?: (sort: any) => void;
    masterCategories?: string[];
}

const AGE_GROUPS = ["22/32", "34/38", "20/30", "32/40", "22/30", "22/36", "26/36"];
const MAX_PRICE_LIMIT = 2000;

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
    filters, 
    setFilters, 
    isOpenMobile, 
    setIsOpenMobile,
    totalResults,
    sortBy,
    setSortBy,
    masterCategories = []
}) => {
    
    const toggleFilter = (type: keyof Omit<FilterState, 'maxPrice'>, value: string) => {
        setFilters(prev => {
            const current = prev[type] as string[];
            const updated = current.includes(value) 
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
    };

    const resetFilters = () => {
        setFilters({ categories: [], ageGroups: [], fabrics: [], maxPrice: MAX_PRICE_LIMIT });
    };

    const SidebarContent = ({ isMobile = false }) => (
        <div className={`space-y-10 ${isMobile ? 'pb-32' : 'pb-20 lg:pb-10'}`}>
            {!isMobile && (
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2 text-primary font-heading font-bold">
                        <Filter size={18} />
                        <span className="text-sm">Filter Results</span>
                    </div>
                    <button onClick={resetFilters} className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline transition-all">Reset All</button>
                </div>
            )}

            {isMobile && setSortBy && (
                 <div className="space-y-4 pb-6 border-b border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">Sort By Priority</h4>
                    <div className="flex flex-col gap-2">
                        {[
                            { l: 'Latest Style Priority', v: 'newest' }, 
                            { l: 'Price: Lowest First', v: 'price_low' }, 
                            { l: 'Price: Highest First', v: 'price_high' }
                        ].map(opt => (
                            <button 
                                key={opt.v} 
                                onClick={() => setSortBy(opt.v)} 
                                className={`w-full px-4 py-3 rounded-xl text-xs font-bold border text-left transition-all flex items-center justify-between ${sortBy === opt.v ? 'bg-primary text-white border-primary shadow-md' : 'bg-slate-50 text-slate-500 border-slate-100'}`}
                            >
                                {opt.l}
                                {sortBy === opt.v && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                 </div>
            )}

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wholesale Limit</h4>
                    <span className="text-xs font-bold text-primary px-2 py-1 bg-slate-100 rounded">₹{filters.maxPrice}</span>
                </div>
                <input type="range" min="80" max={MAX_PRICE_LIMIT} step="10" value={filters.maxPrice} onChange={handlePriceChange} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>

            <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Design Categories</h4>
                <div className="space-y-1 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                    {masterCategories.map(cat => {
                        const isSelected = filters.categories.includes(cat);
                        return (
                            <label key={cat} className={`flex items-center gap-3 cursor-pointer p-2.5 rounded-xl transition-all ${isSelected ? 'bg-slate-100 border-l-4 border-primary' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}>
                                <input type="checkbox" className="hidden" onChange={() => toggleFilter('categories', cat)} />
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary shadow-sm' : 'border-slate-300 bg-white'}`}>
                                    {isSelected && <Check size={10} className="text-white" strokeWidth={4} />}
                                </div>
                                <span className={`text-xs ${isSelected ? 'text-primary font-bold' : 'text-slate-600 font-medium'}`}>{cat}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size Set Filter</h4>
                <div className="flex flex-wrap gap-2">
                     {AGE_GROUPS.map(age => {
                        const isSelected = filters.ageGroups.includes(age);
                        return (
                            <button 
                                key={age} 
                                onClick={() => toggleFilter('ageGroups', age)} 
                                className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all ${isSelected ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 shadow-sm'}`}
                            >
                                {age}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="hidden lg:block w-72 flex-shrink-0 sticky top-[120px] h-[calc(100vh-160px)] overflow-y-auto pr-6 no-scrollbar">
                <SidebarContent />
            </div>

            <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-500 ${isOpenMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div 
                    className={`absolute inset-0 bg-primary/60 backdrop-blur-md transition-opacity duration-500 ${isOpenMobile ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setIsOpenMobile(false)} 
                />
                <div className={`absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) ${isOpenMobile ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/80">
                        <div>
                            <h3 className="text-xl font-heading font-bold text-primary">Refine Collection</h3>
                            <p className="text-xs text-slate-500 mt-1 font-bold">{totalResults} Designs Available</p>
                        </div>
                        <button 
                            onClick={() => setIsOpenMobile(false)} 
                            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary shadow-soft transition-all active:scale-90"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                        <SidebarContent isMobile={true} />
                    </div>
                    <div className="p-8 border-t border-slate-100 bg-white">
                        <Button 
                            variant="primary" 
                            fullWidth 
                            onClick={() => setIsOpenMobile(false)}
                            className="h-14 shadow-elevated text-lg"
                        >
                            Apply Selection
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;