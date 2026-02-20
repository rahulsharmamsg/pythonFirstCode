import { useEffect, useState } from "react"
import { getRefreshToken, getToken, isTokenExpired } from "./Auth"
import SessionExpiredModal from "../popup/SessionExpiredModal";
import { useNavigate } from "react-router-dom";

const AuthWatcher = () => {
    const [showModel, setShowModal] = useState(false)
    const navigate = useNavigate()
    const token = getRefreshToken();

    useEffect(() => {
        // Refresh Token Expire after Open Session Expire popup
        if (!token) return
        const checkToken = () => {
            if (token && isTokenExpired(token)) {
                setShowModal(true)
            }
        }
        checkToken()
        const interval = setInterval(checkToken, 30_000);
        return () => clearInterval(interval)
    }, [token])
    useEffect(() => {
        // refresh Token Expire after reload than redirect login page
        if (!token) return
        const isToken = isTokenExpired(token)
        if (isToken) {
            localStorage.clear();
            setShowModal(false);
            navigate("/login", { replace: true });
        }
    }, [])
    const handleLogout = () => {
        localStorage.clear();
        setShowModal(false);
        navigate("/login", { replace: true });
    }
    return showModel ? <SessionExpiredModal onConfirm={handleLogout} /> : null;
}

export default AuthWatcher