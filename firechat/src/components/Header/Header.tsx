import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { UserAuth } from "../context/AuthContext";
import './Header.css';

interface HeaderProps {
  backButton: boolean;
}

const Header = ({ backButton }: HeaderProps) => {
  const authUser = UserAuth();
  const user = authUser && authUser.user;
  const logout = authUser && authUser.logout;
  const navigate = useNavigate();

  const handleBackToTopics = () => {
    navigate(routes.topics);
  };

  const handleLogout = () => {
    if (logout) {
      logout().then(() => navigate(routes.signin));
    }
  };

  return (
    <div className="header">
        <div className="frame4">
        {backButton && <button className="back-to-search-button"  onClick={handleBackToTopics}>Back to Topics</button>}
          <div className="account-label">{user && user.email}</div>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
  );
};

export default Header;
