export default function SipAccountsForm() {
  return (
    <form>
      <label className="label">
        <span className="label-text">Domain</span>
      </label>
      <input type="text" placeholder="Domain" className="input input-bordered w-full " />
      <label className="label">
        <span className="label-text">WebSocket</span>
      </label>
      <input type="text" placeholder="WebSocket" className="input input-bordered w-full " />
      <label className="label">
        <span className="label-text">Extension</span>
      </label>
      <input type="text" placeholder="Extension" className="input input-bordered w-full " />
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input type="text" placeholder="Password" className="input input-bordered w-full " />
    </form>
  );
}
