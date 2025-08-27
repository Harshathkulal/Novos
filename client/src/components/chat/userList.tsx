import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserListProps } from "@/types/chat.types";
import { Settings, ArrowLeft, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserList({ users, userName }: UserListProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={() => navigate("/")} className="mr-2 cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold truncate">{userName}</h2>
        <Settings size={18} className="cursor-pointer" />
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2 py-1 text-sm border rounded-xl focus:outline-none focus:ring focus:ring-gray-200"
          />
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredUsers?.length ? (
          filteredUsers.map((user) => (
            <button
              key={user.id}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-secondary transition-colors"
              onClick={() => navigate(`/chat/${user.id}`)}
            >
              <Avatar>
                <AvatarImage src={user.profileimg} />
                <AvatarFallback className="text-xs">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{user.username}</span>
            </button>
          ))
        ) : (
          <p className="mt-4 text-center text-sm text-gray-500">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}
