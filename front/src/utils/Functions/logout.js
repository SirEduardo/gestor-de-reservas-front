export const logout = () => {
  const confirmation = confirm("sure you want to logout");
  if (confirmation) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};
