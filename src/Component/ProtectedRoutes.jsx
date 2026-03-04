import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ children, requiredRole }) => {
    const { user, jwt, loading } = useSelector(state => state.auth);
    const location = useLocation();

    // Role check - multiple locations
    const userRole = user?.role || user?.user?.role || user?.data?.role;

    // allow fallback to token stored in localStorage in case redux hasn't been populated yet
    const token = jwt || localStorage.getItem('jwt');

    console.log("Protected Route Check:", { user, jwt, userRole, requiredRole }) // ← debug

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="mt-4 text-gray-600">Checking authentication...</p>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (!user) {
        // token exists but user info not loaded yet
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="mt-4 text-gray-600">Loading user information...</p>
            </div>
        );
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoutes;