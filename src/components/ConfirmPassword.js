import React from "react";
const ConfirmPassword = ({ setConfirmPassword }) => {
  return (
    <div className="confirm-password-component">
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  );
};
export default ConfirmPassword;
