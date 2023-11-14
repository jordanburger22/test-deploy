import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function Header() {
  const { logout } = useContext(UserContext);

  return (
    <div id="header">
      <h1>{'< Todo list />'}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Header;