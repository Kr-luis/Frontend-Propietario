import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Auth = () => {
    const autenticado = localStorage.getItem('token');
    return (
        <main className="flex justify-center content-center w-full h-screen">
            {autenticado ? <Navigate to='/home' /> : <Outlet />} {/* Cambié '/dashboard/' a '/home' */}
        </main>
    );
}

export default Auth;
