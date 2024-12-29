import React, { useContext } from 'react';
import './layout.scss';
import Navbar from '../../components/navbar/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContex';

const Layout = () => {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

function AuthenticatedLayout() {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) return <Navigate to="/login" />;
    else {
        return (
            <div className="layout">
                <div className="navbar">
                    <Navbar />
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        );
    }
}

export { Layout, AuthenticatedLayout };