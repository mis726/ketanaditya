import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-slate-200 w-full" />
      <div className="p-3 flex flex-col flex-1">
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="h-8 bg-slate-200 rounded" />
          <div className="h-8 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;