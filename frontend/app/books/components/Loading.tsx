export function Loading() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
        >
          <div className="aspect-[3/4] bg-slate-100" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-3/4 rounded-full bg-slate-200" />
            <div className="h-4 w-1/2 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}