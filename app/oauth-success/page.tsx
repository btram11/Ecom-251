"use client";
import { useEffect } from "react";
import { environment } from "../../environment";

export default function OAuthSuccessPage() {
  useEffect(() => {
    fetch(`${environment.SERVICE_URL}/api/auth/me/token`, {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(({ accessToken }) => {
        if (!accessToken) throw new Error("No token");
        localStorage.setItem("accessToken", accessToken);
        window.location.href = "/";
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  return <p>Đang đăng nhập, vui lòng chờ...</p>;
}
