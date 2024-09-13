export const Success = ({ count, setSuccess }) => {
  return (
    <div className="success-block">
      <img src="/send-invites/assets/success.svg" alt="Success" />
      <h3>Success!</h3>
      <p>An invitation has been sent to {count > 1 ? `all ${count} users` : 'this user'}.</p>
      <button className="send-invite-btn" onClick={() => setSuccess(false)}>Back</button>
    </div>
  );
};