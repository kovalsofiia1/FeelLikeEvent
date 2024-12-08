import React, { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { router, useRouter } from "expo-router";
import { AppDispatch } from "@/src/redux/store";
import { selectIsLoggedIn } from "@/src/redux/user/selectors";
import { useDispatch, useSelector } from "react-redux";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const { authState } = useAuth();
    const router = useRouter();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/sign-in');
        }
    }, [isLoggedIn])


    // Render nothing while redirecting or show a loading indicator
    if (!isLoggedIn) {
        return <></>;
    }

    return <>{children}</>;
};

export default AuthGuard;
