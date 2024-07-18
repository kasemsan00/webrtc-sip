interface Props {
  handleClick: (arg0: boolean) => void;
}

export default function SettingButton({ handleClick }: Props) {
  return (
    <button
      className="btn btn-ghost focus:outline-none w-full text-black dark:text-white "
      onClick={() => handleClick(true)}
    >
      Setting
    </button>
  );
}
