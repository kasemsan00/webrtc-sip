interface Props {
  status: any;
  handleRegister: any;
  handleUnRegister: any;
}

export default function ConnectSip({ status, handleRegister, handleUnRegister }: Props) {
  const UserRegister = () => {
    handleRegister();
  };
  const UserUnregister = () => {
    handleUnRegister();
  };
  return (
    <>
      {status === "Registered" && (
        <button className="btn btn-error" onClick={UserUnregister}>
          Disconnect
        </button>
      )}
      {status !== "Registered" && (
        <button className="btn btn-success" onClick={UserRegister}>
          Register
        </button>
      )}
    </>
  );
}
