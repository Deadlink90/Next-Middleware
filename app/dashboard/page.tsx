"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser,FiLogOut } from "react-icons/fi";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const getProfile = async () => {
    const { data } = await axios.get("/api/profile");
    setUser(data.profile);
  };

  const logout = async() => {
  try {
    const {data} = await axios.post('/api/auth/logout');
  if(data.status) {
  router.push('/login');
  }
  } catch (error) {
    console.log(error);
    router.push('/login');
  }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">

    <div className="text-white px-16 py-10 bg-slate-950 rounded-xl inline-block">
        <h1 className="text-2xl">Dashboard</h1>
        <div className="mt-3">
      {
     ( user.email !== '') && (user.username !== '') ? (
      <button
            onClick={logout}
            className="bg-red-600 py-2 px-2 rounded-md hover:bg-red-500 min-w-full flex items-center justify-center"
          >
          <span className="mr-1 text-lg"> <FiLogOut/> </span> Logout 
          </button>
     ) : (
      <button
            onClick={getProfile}
            className="bg-sky-900 py-2 px-2 rounded-md hover:bg-sky-800 min-w-full flex items-center justify-center"
          >
          <span className="mr-1 text-lg"> <FiUser/> </span> Get Profile 
          </button>
     )
      }
        </div>
      </div>

      {user.email !== "" && user.username !== "" && (
        <div className="text-white mt-6">
          <div >
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
