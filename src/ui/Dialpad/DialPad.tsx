import { MdCall, MdBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";

const Delete = ({ handleClick }: { handleClick: () => void }) => {
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
};

const Call = () => {
  return (
    <motion.button
      className="flex justify-center items-center rounded-full w-20 h-20 text-3xl cursor-pointer bg-green-500"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MdCall className="text-white" />
    </motion.button>
  );
};

const Number = ({ number, handleClick }: { number: string; handleClick: (arg0: string) => void }) => {
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
};

export default function DialPad() {
  const [callNumber, setCallNumber] = useState<string>("");
  const handleClickNumber = (number: string) => {
    console.log(number);
    if (callNumber.length >= 10) return;
    setCallNumber((state) => state + number);
  };
  const handleDelete = () => {
    if (callNumber.length === 0) return;
    setCallNumber((state) => state.slice(0, -1));
  };

  return (
    <div className="fixed flex flex-1 flex-col justify-center items-center z-[999] bg-white w-[500px] h-screen gap-4 right-0">
      <div className="mb-4">
        <input
          className="text-4xl text-center focus:outline-none"
          type="text"
          placeholder=""
          value={callNumber}
          onChange={() => {}}
        />
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Number number={"1"} handleClick={handleClickNumber} />
        <Number number={"2"} handleClick={handleClickNumber} />
        <Number number={"3"} handleClick={handleClickNumber} />
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Number number={"4"} handleClick={handleClickNumber} />
        <Number number={"5"} handleClick={handleClickNumber} />
        <Number number={"6"} handleClick={handleClickNumber} />
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Number number={"7"} handleClick={handleClickNumber} />
        <Number number={"8"} handleClick={handleClickNumber} />
        <Number number={"9"} handleClick={handleClickNumber} />
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <Number number={"*"} handleClick={handleClickNumber} />
        <Number number={"0"} handleClick={handleClickNumber} />
        <Number number={"#"} handleClick={handleClickNumber} />
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <div className="w-20"></div>
        <Call />
        {callNumber !== "" ? <Delete handleClick={handleDelete} /> : <div className="w-20"></div>}
      </div>
    </div>
  );
}
