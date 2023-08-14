import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardMain() {
  const navigate = useNavigate();

  useEffect(() => {
    const current_user = localStorage.getItem('current_user');
    if (!current_user) {
      navigate("/")
    }
  }, [])
  return <div>DashboardMain</div>;
}

export default DashboardMain;
