"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    profession: "",
  });
  const Router = useRouter();
  const professions = [
    "Student",
    "Software Engineer",
    "Designer",
    "Teacher",
    "Doctor",
    "Lawyer",
    "Business Analyst",
    "Entrepreneur",
    "Researcher",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);
      // sending form data
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      Router.push("/login"); // Redirect to login page after successful registration
    } catch (error) {
      
      console.error("Error submitting form:", error);
    }
};
// 1. show the password error on front end
// 2. after successful registration redirect to login page
// 3. show success notification on successful registration


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl shadow-black/40 p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Register
        </h2>

        {/* Name */}
        <div>
          <label className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            placeholder="Enter your name"
          />
        </div>

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

        {/* DOB */}
        <div>
          <label className="block text-gray-300 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
          />
        </div>

        {/* Profession */}
        <div>
          <label className="block text-gray-300 mb-2">Profession</label>
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
          >
            <option value="" disabled>
              Select your profession
            </option>
            {professions.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-900/50 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
