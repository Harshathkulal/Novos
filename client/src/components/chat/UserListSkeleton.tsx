const UserListSkeleton = () => {
  return (
    <div className="space-y-3 pt-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 animate-pulse"
        >
          <div className="h-10 w-10 rounded-full bg-secondary" />
          <div className="h-4 w-32 rounded bg-secondary" />
        </div>
      ))}
    </div>
  );
};

export default UserListSkeleton;
