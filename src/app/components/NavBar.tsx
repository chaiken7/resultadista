import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" href="/">Resultadista</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href="/">Partidos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/ligas">Ligas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/equipos">Equipos</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}
