import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { logout } from "../../utils/Functions/logout";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
          >
            TripAdvisor
          </NavLink>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:relative top-16 left-0 right-0 md:top-0 bg-white md:bg-transparent shadow-md md:shadow-none z-10 w-full md:w-auto`}
          >
            {user ? (
              <div className="flex flex-col md:flex-row items-center w-full md:w-auto p-4 md:p-0 space-y-2 md:space-y-0 md:space-x-4">
                <li className="text-sm font-semibold w-full md:w-auto text-center md:text-left">
                  Bienvenido, {user}
                </li>
                <li>
                  <NavLink
                    to={role === "admin" ? "/myRestaurant" : "/myReservations"}
                    className="bg-gray-800 hover:bg-gray-600 text-white rounded-full py-2 px-4 text-sm font-semibold w-full md:w-auto text-center"
                  >
                    {role === "admin" ? "Mi Restaurante" : "Mis Reservas"}
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 hover:bg-gray-600 text-white rounded-full py-2 px-4 text-sm font-semibold w-full md:w-auto"
                  >
                    Salir
                  </button>
                </li>
              </div>
            ) : (
              <li>
                <NavLink
                  to="/signin"
                  className="bg-gray-800 hover:bg-gray-600 text-white rounded-full py-2 px-4 text-sm font-semibold block text-center w-full md:w-auto"
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
