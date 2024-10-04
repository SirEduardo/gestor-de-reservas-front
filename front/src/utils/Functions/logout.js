export const logout = () => {
  const confirmation = confirm("Seguro que quieres salir?");
  if (confirmation) {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
};
