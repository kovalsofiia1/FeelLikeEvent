import React, { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { authState } = useAuth();

    useEffect(() => {
        if (!authState?.authenticated) {
            router.push('/sign-in');
        }
    }, [authState?.authenticated]);

    // Render nothing while redirecting or show a loading indicator
    if (!authState?.authenticated) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;
