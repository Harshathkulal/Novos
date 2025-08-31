import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { EngagementButtons } from "./EngagementButtons";
import { updatePostApi, deletePostApi } from "@/services/threadService";
import type { PostCardProps } from "@/types/thread.types";
import {capitalizeLetter} from "@/utils/Utils"

export const PostCard: React.FC<PostCardProps> = ({
  post,
  updatePost,
  removePost,
}) => {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const handleSave = async () => {
    const updated = await updatePostApi(post.id, { content: editContent });
    updatePost(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    await deletePostApi(post.id);
    removePost(post.id);
  };

  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-start">
        {/* Avatar + Author */}
        <div className="flex space-x-3 w-full">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.username} />
            <AvatarFallback>{capitalizeLetter(post.author.username[0])}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="flex items-center space-x-2 font-semibold">
              <span>{capitalizeLetter(post.author.username)}</span>
              <span className="text-muted-foreground text-xs">
                @{post.author.username}
              </span>
            </div>
            {editing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full border rounded-md p-2 mt-2"
              />
            ) : (
              <p className="mt-2">{post.content}</p>
            )}
          </div>
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit size={14} />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center space-x-2 text-destructive"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Save/Cancel buttons for editing */}
      {editing && (
        <div className="flex space-x-2 mt-2 ml-12">
          <Button onClick={handleSave} size="sm">
            Save
          </Button>
          <Button
            onClick={() => {
              setEditing(false);
              setEditContent(post.content);
            }}
            size="sm"
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Engagement Buttons */}
      <EngagementButtons post={post} updatePost={updatePost} />
    </div>
  );
};
