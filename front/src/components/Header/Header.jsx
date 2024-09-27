import { NavLink } from "react-router-dom";
import Search from "../Search/Search";

export const Header = () => {
  return (
    <header className="h-24 bg-slate-500 flex items-center justify-center">
      <nav className="w-full">
        <ul className="w-full flex items-center justify-around font-semibold">
          <h3 className="text-xl">Gestor de Reservas Charras</h3>
          <Search />
          <NavLink to="/auth">
            <button className="bg-black text-white rounded-full p-3">
              Sign in
            </button>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
