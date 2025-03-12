import { useState } from "react";
import { registerUser } from "../services/api";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      alert(response.data.message);
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-2xl">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Username" className="border p-2 w-full" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input type="email" placeholder="Email" className="border p-2 w-full" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" className="border p-2 w-full" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
