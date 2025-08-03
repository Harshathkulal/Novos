import { UserListProps } from "@/types/chat.types";

export default function UserList({ users, onSelect }: UserListProps) {
  return (
    <div className="w-64 border-r p-4 overflow-y-auto">
      <h2 className="font-bold mb-4">Users</h2>
      {users.map((user) => (
        <div
          key={user.id}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
          onClick={() => onSelect(user)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}
