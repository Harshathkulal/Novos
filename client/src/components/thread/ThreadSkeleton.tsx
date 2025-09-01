const ThreadSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border-b animate-pulse">
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-secondary" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-secondary rounded w-20" />{" "}
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="flex space-x-4">
                <div className="w-6 h-6 bg-secondary rounded-full" />
                <div className="w-6 h-6 bg-secondary rounded-full" />
                <div className="w-6 h-6 bg-secondary rounded-full" />
              </div>
            </div>
            <div className="w-4 h-2 bg-secondary rounded" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ThreadSkeleton;
