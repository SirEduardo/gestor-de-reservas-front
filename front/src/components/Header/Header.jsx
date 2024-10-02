import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { logout } from "../../utils/Functions/logout";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-around h-16 md:h-20">
          <NavLink
            to="/"
            className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
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
            } md:flex flex-col md:flex-col items-center md:items-center md:justify-end w-full md:w-auto space-y-4 md:space-y-0 md:space-x-6 absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none z-10`}
          >
            {user ? (
              <div className="flex items-center gap-7 ">
                <li className="text-sm md:text-base font-semibold">
                  Bienvenido, {user}
                </li>
                {/*              <li>
                  <NavLink
                    to={role === "admin" ? "/myRestaurant" : "/myReservations"}
                    className="bg-black hover:bg-gray-900 text-white rounded-full py-2 px-4 text-sm md:text-base font-semibold"
                  >
                    {role === "admin" ? "Mi Restaurante" : "Mis Reservas"}
                  </NavLink>
                </li>*/}
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-black hover:bg-gray-900 text-white rounded-full py-2 px-4 text-sm md:text-base font-semibold"
                  >
                    Salir
                  </button>
                </li>
              </div>
            ) : (
              <li>
                <NavLink
                  to="/signin"
                  className="bg-black hover:bg-gray-900 text-white rounded-full py-2 px-4 text-sm md:text-base font-semibold"
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
