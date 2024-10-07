import { useForm } from "react-hook-form";
import useAuth from "../../utils/Hooks/useAuth";
import { useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/Functions/api/api";
import StoreUserData from "../../utils/Functions/StoreUserData";
import { Header } from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, error, authUser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const submit = async (formData) => {
    const url = `${API_URL}/users/login`;
    try {
      const res = await authUser(url, formData);
      if (res) {
        console.log("Login successful", res.user.userName);
        StoreUserData(
          res.user.userName,
          res.user.role,
          res.user._id,
          res.token
        );
        navigate("/");
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  if (isRegister) {
    return <Register />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white shadow-xl rounded-lg p-8 space-y-6"
        >
          <h1 className="text-2xl text-center font-semibold tracking-tight">
            Bienvenido
          </h1>

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
                  message: "Wrong Password",
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? (
              <Loading color="text-white" message="Iniciando sesión..." />
            ) : (
              "Iniciar sesión"
            )}
          </button>
          {error && (
            <p className="text-red-500 text-center text-sm mt-2">{error}</p>
          )}
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Aún no estas registrado?
          </p>
          <button
            className="text-blue-500 hover:text-blue-700"
            type="button"
            onClick={() => setIsRegister(true)}
          >
            Registrate!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
