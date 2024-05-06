import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/mycollection">My Collection</Link>
      </li>
      <li className="navbar-item">
        <Link to="/allgames">Games</Link>
        <br></br>
      </li>
      <li className="navbar-item">
        <Link to="/add">Add Game</Link>
        <br></br>
      </li>
      <li className="navbar-item">
        <Link to="/logout">Logout</Link>
        <br></br>
      </li>
    </ul>
  );
};
