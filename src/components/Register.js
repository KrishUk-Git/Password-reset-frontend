import React, { useState } from "react";
import api from "../api";
import AlertMessage from "./AlertMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", { email, password });
      setMessage({ type: "success", text: res.data.message });
    } catch (err) {
      setMessage({ type: "danger", text: err.response?.data?.message || "Error" });
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <AlertMessage type={message?.type} message={message?.text} />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;
