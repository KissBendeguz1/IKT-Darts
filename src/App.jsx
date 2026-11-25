import { useState } from "react";
import { Routes, Route, NavLink } from 'react-router-dom'
import { DartsListPage } from "./pages/DartsListPage";
import './App.css'
import { DartsSinglePage } from "./pages/DartsSinglePage"
import { DartsCreatePage } from "./pages/DartsCreatePage"
import { DartsModPage } from "./pages/DartsModPage";
import { DartsDelPage } from "./pages/DartsDelPage";
export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="side-nav">
        <button
          type="button"
          className="side-nav-toggle"
          aria-label={isMenuOpen ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true"></i>
        </button>
        {isMenuOpen && (
          <nav id="main-navigation" className="side-nav-menu" aria-label="Fő navigáció">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `side-nav-link${isActive ? " active" : ""}`}
              onClick={closeMenu}
            >
              <i className="bi bi-list-ul me-1"></i>
              Dartsozók
            </NavLink>

            <NavLink
              to="/new-darts"
              className={({ isActive }) => `side-nav-link${isActive ? " active" : ""}`}
              onClick={closeMenu}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Új darts játékos felvitele
            </NavLink>
          </nav>
        )}
      </div>
      <Routes>
        <Route path="/" element={<DartsListPage />} />
        <Route path="/darts/:DartsId" element={<DartsSinglePage />} />
        <Route path="/new-darts" element={<DartsCreatePage />} />
        <Route path="/mod-darts/:DartsId" element={<DartsModPage />} />
        <Route path="/del-darts/:DartsId" element={<DartsDelPage />} />
      </Routes>
    </>
  )
}

export default App
