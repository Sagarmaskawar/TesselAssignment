import React from "react";
import "./Header.css";
import backImg from "../../assets/images/BackPage_Button.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getRouteTitle} from "../../utils";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
const title = getRouteTitle(location.pathname);
  const showBack = currentPath !== "/";

  return (
    <div className="container">
      <header className="header">
        {showBack && (
          <button onClick={() => navigate(-1)} className="backBtn">
            <img src={backImg} alt="back"/>
          </button>
        )}
        <h2 className="title">{title}</h2>
      </header>

      {/* Child page content */}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
