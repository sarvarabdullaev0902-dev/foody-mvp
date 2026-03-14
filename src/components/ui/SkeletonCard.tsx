export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-slate-200 rounded-full w-1/3" />
        <div className="h-4 bg-slate-200 rounded-full w-3/4" />
        <div className="flex items-baseline gap-2">
          <div className="h-7 bg-slate-200 rounded-full w-24" />
          <div className="h-4 bg-slate-200 rounded-full w-16 ml-auto" />
        </div>
        <div className="h-9 bg-slate-200 rounded-xl w-full mt-2" />
      </div>
    </div>
  );
}

export function SkeletonCardList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse flex h-36">
      <div className="w-48 bg-slate-200 shrink-0" />
      <div className="flex-1 p-4 space-y-3">
        <div className="h-3 bg-slate-200 rounded-full w-1/4" />
        <div className="h-4 bg-slate-200 rounded-full w-2/3" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2" />
        <div className="h-8 bg-slate-200 rounded-xl w-28 mt-auto" />
      </div>
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-96 bg-slate-200 rounded-3xl" />
      <div className="bg-white rounded-2xl p-6 space-y-3">
        <div className="h-3 bg-slate-200 rounded-full w-1/5" />
        <div className="h-8 bg-slate-200 rounded-full w-2/3" />
        <div className="h-4 bg-slate-200 rounded-full w-full" />
        <div className="h-4 bg-slate-200 rounded-full w-5/6" />
      </div>
      <div className="bg-white rounded-2xl p-6 space-y-3">
        <div className="h-4 bg-slate-200 rounded-full w-1/3" />
        <div className="h-12 bg-slate-200 rounded-xl w-full" />
        <div className="h-10 bg-slate-200 rounded-2xl w-full" />
      </div>
    </div>
  );
}
