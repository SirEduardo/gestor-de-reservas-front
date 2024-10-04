import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../utils/Functions/api/api";
import { motion } from "framer-motion";

const RestaurantModal = ({ setModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    console.log("Archivo seleccionado:", data.img[0]);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("user", userId);
    formData.append("category", data.category);
    formData.append("img", data.img[0]);
    formData.append("telephone", data.telephone);
    formData.append("opening", data.opening);
    formData.append("closing", data.closing);

    try {
      const response = await axios.post(`${API_URL}/restaurants`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Restaurante creado", response.data);
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el restaurante", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 bg-white shadow-md rounded-lg overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-white rounded-lg p-8 max-w-md w-full"
        >
          <form onSubmit={handleSubmit(submit)} className="p-6 space-y-6">
            <InputField
              label="Nombre del restaurante"
              id="name"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Localización"
              id="location"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Tipo de cocina"
              id="category"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Imagen del restaurante"
              id="img"
              type="file"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Número de teléfono"
              id="telephone"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Hora de apertura"
              id="opening"
              type="time"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Hora de cierre"
              id="closing"
              type="time"
              register={register}
              errors={errors}
              required
            />
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Crear
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

const InputField = ({
  label,
  id,
  type = "text",
  register,
  errors,
  required,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, {
          required: required && `Por favor, introduzca ${label.toLowerCase()}`,
        })}
        className={`w-full p-2 border ${
          errors[id] ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 ${
          errors[id] ? "focus:ring-red-500" : "focus:ring-blue-500"
        } transition duration-300`}
      />
      {errors[id] && (
        <span className="mt-1 text-sm text-red-600">{errors[id].message}</span>
      )}
    </div>
  );
};

export default RestaurantModal;
