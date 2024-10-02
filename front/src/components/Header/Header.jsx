import { NavLink } from "react-router-dom";
import { logout } from "../../utils/Functions/logout";

export const Header = () => {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <ul className="w-full flex items-center justify-around font-semibold">
            <NavLink to="/">
              <h3 className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
                TripAdvisor
              </h3>
            </NavLink>
            {user ? (
              <div className="flex items-center justify-evenly w-1/4">
                <span>Bienvenido, {user}</span>
                <NavLink
                  to={role === "admin" ? "/myRestaurant" : "/myReservations"}
                >
                  <button className="bg-black hover:bg-gray-900 text-white rounded-full p-3">
                    {role === "admin" ? "Mi Restaurante" : "Mis Reservas"}
                  </button>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-black hover:bg-gray-900 text-white rounded-full py-3 px-5"
                >
                  Salir
                </button>
              </div>
            ) : (
              <NavLink to="/signin">
                <button className="bg-black text-white rounded-full p-3">
                  Iniciar sesion
                </button>
              </NavLink>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
