import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import ProtectedRoute from "@/components/ProtectedRoute";

import Chat from "@/components/chat/Chat";
import ChatPage from "@/components/chat/ChatPage";
import ChatWithUserPage from "@/components/chat/ChatWithUserPage";
import Thread from "@/components/thread/Thread";
import BottomNav from "@/components/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();

  const showBottomNav =
    location.pathname === "/" || location.pathname.startsWith("/thread");

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        >
          <Route index element={<ChatPage />} />
          <Route path=":userId" element={<ChatWithUserPage />} />
        </Route>

        <Route
          path="/thread"
          element={
            <ProtectedRoute>
              <Thread />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showBottomNav && <BottomNav />}
    </div>
  );
}

export default App;
