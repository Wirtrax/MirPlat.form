import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'


export default function ProtectedRoute() {
    const { token, isRegistered } = useAppSelector(state => state.user)
    if (!token || !isRegistered) {
        return <Navigate to='/registration' replace />
    }

    return <Outlet />
}
