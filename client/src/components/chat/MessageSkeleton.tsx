export default function MessageSkeleton() {
  return (
    <div className="flex flex-col space-y-2 animate-pulse">
      {/* Left bubble */}
      <div className="flex justify-start">
        <div className="bg-gray-600/40 h-8 w-32 rounded-lg rounded-bl-none" />
      </div>

      {/* Right bubble */}
      <div className="flex justify-end">
        <div className="bg-gray-600/40 h-8 w-24 rounded-lg rounded-br-none" />
      </div>

      {/* Another left bubble */}

      <div className="flex justify-start">
        <div className="bg-gray-600/40 h-8 w-32 rounded-lg rounded-bl-none" />
      </div>

      {/* Right bubble */}
      <div className="flex justify-end">
        <div className="bg-gray-600/40 h-8 w-24 rounded-lg rounded-br-none" />
      </div>
      {/* Left bubble */}
      <div className="flex justify-start">
        <div className="bg-gray-600/40 h-8 w-32 rounded-lg rounded-bl-none" />
      </div>

      {/* Right bubble */}
      <div className="flex justify-end">
        <div className="bg-gray-600/40 h-8 w-24 rounded-lg rounded-br-none" />
      </div>
    </div>
  );
}
