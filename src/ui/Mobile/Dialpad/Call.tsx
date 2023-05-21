import { motion } from "framer-motion";
import { MdCall } from "react-icons/md";

interface Props {
  handleClick: () => void;
}

export default function Call({ handleClick }: Props) {
  return (
    <motion.button
      onClick={handleClick}
      className="flex justify-center items-center rounded-full w-20 h-20 text-3xl cursor-pointer bg-green-500"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MdCall className="text-white" />
    </motion.button>
  );
}
