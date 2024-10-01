const StoreUserData = (user, role, id, token) => {
  if (user) {
    localStorage.setItem("user", user);
  }
  if (role) {
    localStorage.setItem("role", role);
  }
  if (id) {
    localStorage.setItem("id", id);
  }
  if (token) {
    localStorage.setItem("token", token);
  } else {
    alert("Authentication failed. User not found");
  }
};

export default StoreUserData;
