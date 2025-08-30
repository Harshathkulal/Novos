import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import ProtectedRoute from "@/components/ProtectedRoute";

import Chat from "@/components/chat/Chat";
import ChatPage from "@/components/chat/ChatPage";
import ChatWithUserPage from "@/components/chat/ChatWithUserPage";
import Thread from "@/components/thread/Thread";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
