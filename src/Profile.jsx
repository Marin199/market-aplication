import { Navigate } from "react-router";

export default function Profile({ user, onUserLogout }) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <div className="profile-wrapper">
                <h1>Profil</h1>
                <title>Profil | SuperM</title>
                <p className="text-dimmed">
                    Esti logat ca <strong>{user.username}</strong>.
                </p>
                <div className="profile-buttons">
                    <input
                        type="button"
                        value="Logout"
                        className="btn"
                        onClick={onUserLogout}
                    />
                </div>
            </div>
        </>
    );
}
