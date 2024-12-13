import React from "react";
import { Redirect, useRouter } from "expo-router";
import { selectUser } from "@/src/redux/user/selectors";
import { useSelector } from "react-redux";

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const user = useSelector(selectUser);

  if (!user || user!.status !== 'ADMIN') {
    return <Redirect href="/home" />;
  }

  // Render nothing while redirecting or show a loading indicator
  if (!user || user!.status !== 'ADMIN') {
    return <></>;
  }

  return <>{children}</>;
};

export default AdminGuard;
