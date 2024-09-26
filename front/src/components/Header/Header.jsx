import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-24 bg-slate-500 flex items-center justify-center">
      <nav className="w-full">
        <ul className="w-full flex items-center justify-around font-semibold">
          <h3 className="text-xl">Gestor de Reservas Charras</h3>
          <input
            className="rounded-full px-8 py-2"
            type="text"
            id="search"
            name="search"
            placeholder="search"
          ></input>
          <NavLink to="/login">
            <button className="bg-black text-white rounded-full p-3">
              Sign in
            </button>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
