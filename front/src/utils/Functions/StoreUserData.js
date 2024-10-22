const StoreUserData = ({ user, role, id, token }) => {
  const data = { user, role, id, token };
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      localStorage.setItem(key, value);
    }
  }
  if (!token) {
    alert("Authentication failed. User not found");
  }
};

export default StoreUserData;
