const StoreUserData = (user, role, token) => {
  if (user) {
    localStorage.setItem("user", user);
  }
  if (role) {
    localStorage.setItem("role", role);
  }
  if (token) {
    localStorage.setItem("token", token);
  } else {
    alert("Authentication failed. User not found");
  }
};

export default StoreUserData;
