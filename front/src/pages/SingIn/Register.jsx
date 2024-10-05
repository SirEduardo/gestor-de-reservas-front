import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { API_URL } from "../../utils/Functions/api/api";
import Login from "./Login";
import useAuth from "../../utils/Hooks/useAuth";
import StoreUserData from "../../utils/Functions/StoreUserData";
import Loading from "../../components/Loading/Loading";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, error, authUser } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const submit = async (formData) => {
    const registerUrl = `${API_URL}/users/register`;
    const loginUrl = `${API_URL}/users/login`;

    try {
      const registerRes = await authUser(registerUrl, formData);

      console.log(formData);

      if (registerRes) {
        console.log("Registration successful", registerRes);
        const loginResponse = await authUser(loginUrl, formData);
        StoreUserData(
          loginResponse.user.userName,
          loginResponse.user.role,
          loginResponse.user._id,
          loginResponse.token
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  if (isLogin) {
    return <Login />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white shadow-xl rounded-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create una Cuenta
          </h2>
          <div className="space-y-2">
            <label htmlFor="userName">Nombre</label>
            <input
              type="text"
              {...register("userName", {
                required: true,
                message: "Username is required",
              })}
              id="userName"
              className={`w-full p-1 border ${
                errors.userName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 ${
                errors.userName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.userName && (
              <span className="text-red-500 text-sm">
                {errors.userName.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              {...register("lastName", {
                required: true,
                message: "lastName is required",
              })}
              id="lastName"
              className={`w-full p-1 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 ${
                errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              id="email"
              className={`w-full p-1 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]+$/,
                  message:
                    "The password must include numbers, upper and lower case letters.",
                },
              })}
              id="password"
              className={`w-full p-1 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="role">Rol</label>
            <select
              id="role"
              className="w-full p-1 rounded-md"
              {...register("role", {
                required: true,
              })}
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Empresario</option>
              <option value="client">Cliente</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? (
              <Loading color="text-white" message="Registrandose..." />
            ) : (
              "Registrarse"
            )}
          </button>
          {error && (
            <p className="text-red-500 text-center text-sm mt-2">{error}</p>
          )}
        </form>
        <p className="mt-4 text-center">Ya tienes cuenta?</p>
        <button
          className="text-blue-500 hover:text-blue-700"
          type="button"
          onClick={() => setIsLogin(true)}
        >
          Inicia sesión
        </button>
      </div>
    </div>
  );
};

export default Register;
