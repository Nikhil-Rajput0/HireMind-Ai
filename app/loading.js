export default function Loading() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="bg-gray-300 h-44 rounded-xl"></div>

            <div className="flex gap-3">
              <div className="bg-gray-300 h-10 w-10 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
