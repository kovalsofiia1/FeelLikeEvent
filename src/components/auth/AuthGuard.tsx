import React from "react";
import { Redirect, useRouter } from "expo-router";
import { selectIsLoggedIn } from "@/src/redux/user/selectors";
import { useSelector } from "react-redux";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (!isLoggedIn) {
        return <Redirect href="/sign-in" />;
    }

    // Render nothing while redirecting or show a loading indicator
    if (!isLoggedIn) {
        return <></>;
    }

    return <>{children}</>;
};

export default AuthGuard;
