import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, MessageCircle, User, Waypoints } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.user);

  const navItems = [
    { icon: <Home />, path: "/" },
    { icon: <Waypoints />, path: "/thread" },
    { icon: <MessageCircle />, path: "/chat" },
  ];

  const handleProfileClick = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t shadow-md flex items-center justify-around p-3 bg-background z-10">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${
            location.pathname === item.path
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {item.icon}
        </Link>
      ))}

      {/* Profile Section with shadcn Avatar */}
      <button
        onClick={handleProfileClick}
        className={`${
          location.pathname === "/profile" ? "ring-2 ring-foreground rounded-full" : ""
        }`}
      >
        <Avatar className="w-8 h-8">
          {userInfo ? (
            <>
              <AvatarImage src={userInfo.avatar} alt={userInfo.username} />
              <AvatarFallback>
                {userInfo.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <User />
          )}
        </Avatar>
      </button>
    </nav>
  );
};

export default BottomNav;
