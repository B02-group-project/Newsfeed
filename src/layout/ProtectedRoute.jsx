import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import supabase from "../api/supabase.client";

function ProtectedRoute() {
  const nav = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        nav("/");
      } else if (event === "SIGNED_IN") {
        nav("/main");
      }
    });
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
