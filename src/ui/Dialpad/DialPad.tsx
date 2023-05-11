import { MdCall } from "react-icons/md";

const Call = () => {
  return (
    <div className="flex justify-center items-center bg-white rounded-full w-20 h-20 text-3xl cursor-pointer bg-green-500">
      <MdCall className="text-white" />
    </div>
  );
};

const Number = ({ number }: { number: string }) => {
  return <div className="flex justify-center items-center bg-white rounded-full w-20 h-20 text-3xl cursor-pointer">{number}</div>;
};

export default function DialPad() {
  return (
    <div className="fixed flex flex-col justify-center items-center top-0 z-[999] bg-gray-400 w-80 h-[1000px] gap-2">
      <div>Hello 9999</div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <Number number={"1"} />
        <Number number={"2"} />
        <Number number={"3"} />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <Number number={"4"} />
        <Number number={"5"} />
        <Number number={"6"} />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <Number number={"7"} />
        <Number number={"8"} />
        <Number number={"9"} />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <Number number={"*"} />
        <Number number={"0"} />
        <Number number={"#"} />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <Call />
      </div>
    </div>
  );
}
