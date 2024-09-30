import { useForm } from "react-hook-form";
import useAuth from "../../utils/Hooks/useAuth";
import { useState } from "react";
import Register from "./Register";
import StoreUserData from "../../utils/Functions/StoreUserData";
import { useNavigate } from "react-router-dom";

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
    const url = "http://localhost:3000/api/v1/users/login";
    try {
      const res = await authUser(url, formData);
      console.log(res);
      if (res) {
        console.log("Login successful", res.user.userName);
        StoreUserData(res.user.userName, res.user.role, res.token);
        navigate("/");
      } else {
        alert("Unexpected error", res);
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  if (isRegister) {
    return <Register />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-svh bg-slate-200">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-8 shadow-lg rounded-md w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="email">Email</label>
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Login in..." : "Login"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <p className="mt-4 text-center">Not registered yet?</p>
      <button
        className="text-blue-500 hover:underline"
        type="button"
        onClick={() => setIsRegister(true)}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
