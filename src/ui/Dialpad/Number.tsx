import { motion } from "framer-motion";

export default function Number({ number, handleClick }: { number: string; handleClick: (arg0: string) => void }) {
  return (
    <motion.button
      onClick={() => handleClick(number)}
      className="flex justify-center items-center rounded-full w-20 h-20 text-3xl cursor-pointer
      bg-gray-200
      active:bg-gray-300
      "
      whileTap={{ scale: 0.9 }}
    >
      {number}
    </motion.button>
  );
}
