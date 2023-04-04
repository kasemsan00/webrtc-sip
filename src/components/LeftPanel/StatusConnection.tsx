import { HiOutlineStatusOnline } from "react-icons/hi";
interface Props {
  status: string;
}

export default function StatusConnection({ status }: Props) {
  return (
    <div className="status-bar">
      <HiOutlineStatusOnline></HiOutlineStatusOnline>
      <div>{status}</div>
    </div>
  );
}
