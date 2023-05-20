interface Props {
  handleClick: (arg0: boolean) => void;
}

export default function SettingButton({ handleClick }: Props) {
  return (
    <button className="btn btn-ghost focus:outline-none" onClick={() => handleClick(true)}>
      Setting
    </button>
  );
}
