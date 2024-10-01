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
    <header className="h-24 flex items-center justify-center border-b-2">
      <nav className="w-full">
        <ul className="w-full flex items-center justify-around font-semibold">
          <NavLink to="/">
            <h3 className="text-xl">TripAdvisor</h3>
          </NavLink>
          {user ? (
            <div className="flex items-center justify-evenly w-1/4">
              <span>Bienvenido, {user}</span>
              <NavLink
                to={role === "admin" ? "/myRestaurant" : "/myReservations"}
              >
                <button className="bg-black text-white rounded-full p-3">
                  {role === "admin" ? "Mi Restaurante" : "Mis Reservas"}
                </button>
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-black text-white rounded-full py-3 px-5"
              >
                Salir
              </button>
            </div>
          ) : (
            <NavLink to="/auth">
              <button className="bg-black text-white rounded-full p-3">
                Iniciar sesion
              </button>
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
};
