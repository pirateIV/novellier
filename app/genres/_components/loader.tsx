export const SkeletonLoader = () => (
  <>
    {Array(6)
      .fill(null)
      .map((_, i) => (
        <div
          key={i}
          className="flex gap-4 py-2 p-1 md:p-3 animate-pulse divide-y divide-slate-950/[.07] dark:divide-white/10"
        >
          <div className="h-40 w-[100px] shrink-0 rounded-md bg-gradient-to-r skeleton"></div>
          <div className="min-h-full flex flex-col flex-1 gap-6">
            <div className="skeleton w-2/4 h-6 bg-gradient-to-r rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="skeleton w-full h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-full h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-full h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-8/12 h-3 bg-gradient-to-r rounded-sm"></div>
              <div className="skeleton w-1/6 h-3 self-end mt-4 bg-gradient-to-r rounded-sm"></div>
            </div>
          </div>
        </div>
      ))}
  </>
);
