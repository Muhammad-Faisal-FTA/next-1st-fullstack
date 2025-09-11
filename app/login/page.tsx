"use client";
import  React,{ useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      ...formData,
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          console.error("Login failed:", response.error);
        } else {
          console.log("Login successful:", response);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
      Router.push("/"); // Redirect to home page after successful login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl shadow-black/40 p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Login
        </h2>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-900/50 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
