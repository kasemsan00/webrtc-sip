interface Props {
  status: string;
  setStatus: (arg0: string) => void;
}

export default function ConnectSip({ status, setStatus }: Props) {
  const UserRegister = () => {
    setStatus("Connected");
  };
  const UserUnregister = () => {
    setStatus("Disconnected");
  };
  return (
    <>
      {status === "Connected" && (
        <button className="btn btn-error" onClick={UserUnregister}>
          Disconnect
        </button>
      )}
      {status === "" || status === "Disconnected" ? (
        <button className="btn btn-success" onClick={UserRegister}>
          Register
        </button>
      ) : null}
    </>
  );
}
