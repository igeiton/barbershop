import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Store/store';

export default function Auth() {
    const { isAuth } = useAppSelector((state) => state.auth);

    if (!isAuth) {
        return <Navigate to="/client_auth" />;
    }

    return <Outlet />;
}
