import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import AlertMessage from "./AlertMessage";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/reset-password/${token}`, { password });
      setMessage({ type: "success", text: res.data.message });
    } catch (err) {
      setMessage({ type: "danger", text: err.response?.data?.message || "Error" });
    }
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      <AlertMessage type={message?.type} message={message?.text} />
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-success">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
