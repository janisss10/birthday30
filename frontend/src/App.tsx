import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { verifySession } from "./utils/auth";
import MainLayout from "./components/layout/MainLayout";
import Missions from "./pages/Missions";
import Memories from "./pages/Memories";
import MissionDetails from "./pages/MissionDetails";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<
    "checking" | "authenticated" | "unauthenticated"
  >("checking");

  useEffect(() => {
    const checkSession = async () => {
      const authenticated = await verifySession();

      setStatus(authenticated ? "authenticated" : "unauthenticated");
    };

    checkSession();
  }, []);

  if (status === "checking") {
    return null;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
      </Route>

      <Route
        path="/missions"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Missions />} />
        <Route path=":missionId" element={<MissionDetails />} />
      </Route>

      <Route
        path="/memories"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Memories />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
