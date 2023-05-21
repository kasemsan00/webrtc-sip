import { motion } from "framer-motion";
import { MdBackspace } from "react-icons/md";

export default function Delete({ handleClick }: { handleClick: () => void }) {
  return (
    <motion.button
      onClick={handleClick}
      className="flex justify-center items-center rounded-full w-20 h-20 text-3xl cursor-pointer "
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      exit={{ opacity: 0 }}
    >
      <MdBackspace className="text-gray-400" />
    </motion.button>
  );
}
