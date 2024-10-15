// Root.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Root: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /login immediately
    navigate("/login");
  }, [navigate]);

  return null; // Optionally, you can return a loading indicator if needed
};

export default Root;
