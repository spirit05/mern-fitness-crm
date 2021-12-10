import { Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from "../components/RequireAuth";

import AuthPage from "../pages/AuthPage";
import ViewClients from "../pages/ViewClients";
import ViewClient from "../pages/ViewClients/ViewClient";
import ViewCoaches from "../pages/ViewCoaches";
import ViewCoach from "../pages/ViewCoaches/ViewCoach";
import ViewGroups from "../pages/ViewGroups";
import ViewGroup from "../pages/ViewGroups/ViewGroup";
import ViewPersonals from "../pages/ViewPersonals";
import ViewPersonal from "../pages/ViewPersonals/ViewPersonal";
import NotFound from "../pages/NotFound";

const useRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={ <AuthPage /> } />
            <Route path='/' element={ <Navigate to='/clients' /> } />
            <Route
            path="/clients"
            element={
                <RequireAuth>
                    <ViewClients />
                </RequireAuth>
            }/>
            <Route 
                path='clients/*' 
                element={
                    <RequireAuth>
                        <ViewClient /> 
                    </RequireAuth> 
            }/>
            <Route
            path="/coach"
            element={
                <RequireAuth>
                    <ViewCoaches />
                </RequireAuth>
            }/>
            <Route
                path="coach/*"
                element={
                    <RequireAuth>
                        <ViewCoach />
                    </RequireAuth>
            }/>
            <Route
            path="personal"
            element={
                <RequireAuth>
                    <ViewPersonals />
                </RequireAuth>
            }/>
            <Route
            path="personal/*"
            element={
                <RequireAuth>
                    <ViewPersonal />
                </RequireAuth>
            }/>
            <Route
            path="group"
            element={
                <RequireAuth>
                    <ViewGroups />                                       
                </RequireAuth>
            }/>
            <Route
            path="group/*"
            element={
                <RequireAuth>
                    <ViewGroup />                                       
                </RequireAuth>
            }/>
            <Route path='*' element={ <NotFound /> } />
        </Routes>
    )
};

export default useRoutes;