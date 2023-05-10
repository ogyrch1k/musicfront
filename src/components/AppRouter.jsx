import React, {useContext} from 'react';
import {Route, Router, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";
import Login from "../pages/Login";
import LoginAdmin from "../pages/LoginAdmin";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                {/* <Redirect to='/posts'/> */}
                </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
            </Routes>
    );

};

export default AppRouter;
