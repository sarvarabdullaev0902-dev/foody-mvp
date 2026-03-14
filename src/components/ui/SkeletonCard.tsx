export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="w-full h-44 skeleton-shimmer" />
      <div className="p-4">
        <div className="h-3 w-20 skeleton-shimmer rounded-full mb-3" />
        <div className="h-4 w-36 skeleton-shimmer rounded-full mb-3" />
        <div className="h-6 w-24 skeleton-shimmer rounded-full mb-4" />
        <div className="h-9 skeleton-shimmer rounded-xl" />
      </div>
    </div>
  );
}
