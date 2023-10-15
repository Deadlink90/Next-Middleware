"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", credentials);
      console.log(res);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center text-white">
      <form onSubmit={handleSubmit}>
        <div className="p-10 bg-slate-950 rounded-md">
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="someone@mail.com"
              className="mt-1 p-2 rounded-md bg-slate-800"
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="***********"
              className="mt-1 p-2 rounded-md bg-slate-800"
              onChange={handleOnChange}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-sky-950 hover:bg-sky-800 py-2 rounded-md min-w-full"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
