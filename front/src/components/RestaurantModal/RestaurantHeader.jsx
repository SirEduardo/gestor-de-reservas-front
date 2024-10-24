import { AnimatePresence, motion } from "framer-motion";
import RestaurantModal from "./RestaurantModal";

const RestaurantHeader = ({ modal, toggleModal }) => {
  return (
    <div className="flex justify-center mb-8 mt-8">
      <button
        onClick={toggleModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
      >
        Crea tu restaurante
      </button>
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <RestaurantModal setModal={toggleModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantHeader;
