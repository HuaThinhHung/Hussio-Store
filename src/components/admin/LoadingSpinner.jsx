function LoadingSpinner({ size = "md", text = "" }) {
  const sizeClasses = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12", xl: "w-16 h-16" };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-black border-t-transparent animate-spin" />
      </div>
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-gray-100 rounded ${className}`} />;
}

export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="space-y-3 p-6">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 items-center">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className={`flex-1 h-10 ${c === 0 ? "max-w-[200px]" : ""}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default LoadingSpinner;
