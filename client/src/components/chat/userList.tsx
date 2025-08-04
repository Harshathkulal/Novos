import { UserListProps } from "@/types/chat.types";

export default function UserList({ users, onSelect }: UserListProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h2 className="text-xl font-semibold p-4 border-b">Users</h2>
      <div className="flex-1 overflow-y-auto p-4">
        {users.map((user) => (
          <button
            key={user.id}
            className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
            onClick={() => onSelect(user)}
          >
            {user.username}
          </button>
        ))}
      </div>
    </div>
  );
}
