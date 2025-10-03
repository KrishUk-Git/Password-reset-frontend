import React, { useState } from "react";
import api from "../api";
import AlertMessage from "./AlertMessage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgot-password", { email });
      setMessage({ type: "success", text: res.data.message });
    } catch (err) {
      setMessage({ type: "danger", text: err.response?.data?.message || "Error" });
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>
      <AlertMessage type={message?.type} message={message?.text} />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
