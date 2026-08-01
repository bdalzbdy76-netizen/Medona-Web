import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="navbar">
      <div>
        <h2 className="navbar__title">لوحة التحكم</h2>
        <p className="navbar__subtitle">مرحباً بك في Medona</p>
      </div>

      <div className="navbar__actions">
        <div className="navbar__user">
          <User size={20} />
          <span>Admin</span>
        </div>

        <button onClick={handleLogout} className="navbar__logout">
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </header>
  );
}

export default Navbar;
