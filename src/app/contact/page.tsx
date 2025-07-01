"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-green-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your Name"
          className="w-full p-2 bg-green-800 rounded"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Your Email"
          className="w-full p-2 bg-green-800 rounded"
        />
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Your Message"
          className="w-full p-2 bg-green-800 rounded h-32"
        />
        <button type="submit" className="w-full bg-green-700 p-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}