"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserListProps } from "@/types/chat.types";
import { Settings, ArrowLeft, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserList({ users, onSelect, userName }: UserListProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <button className="mr-2 cursor-pointer" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold">{userName}</h2>
        <div>
          <Settings size={18} />
        </div>
      </div>

      <div className="p-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2 py-1 text-sm border rounded-xl"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredUsers?.length ? (
          filteredUsers.map((user) => (
            <button
              key={user.id}
              className="w-full flex gap-4 text-left p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => onSelect(user)}
            >
              <Avatar>
                <AvatarImage src={user.profileimg} />
                <AvatarFallback>
                  {user.username.charAt(0) + user.username.charAt(1)}
                </AvatarFallback>
              </Avatar>
              {user.username}
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
}
