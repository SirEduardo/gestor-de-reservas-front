import { useNavigate } from "react-router-dom";
const navigate = useNavigate;
export const logout = () => {
  const confirmation = confirm("sure you want to logout");
  if (confirmation) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
  navigate("/");
};
