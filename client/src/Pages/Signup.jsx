import React,{useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {username,email,password}
    try {
     const res= await axios.post("/auth/register",user)
      res.data && window.location.replace("/login");
      console.log("User created")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="relative">
 <video autoPlay muted loop className="absolute opacity-50 min-w-[100vw] min-h-[100vh]">
 <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt778f65cedfee54fd/63bcad5b08dfb21202a7794d/VAL_Ep6_Homepage-CG-Video_V5.mp4" type="video/mp4"/>
 </video>
    <div className="flex  justify-center relative">
      <div className="md:w-3/4 w-[33%] p-5  mt-[10rem] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100">
        <h1 className="text-center text-3xl">Sign up</h1>
        <form className="flex flex-col">
          <input type="text" value={username} className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
          <input type="email" value={email} className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" value={password} className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
          <div className="flex  justify-center"> 
        <button className="px-8 rounded-3xl py-3 border-2 hover:bg-[#303030] border-[#303030]" onClick={handleSubmit}>Sign Up</button>
         </div>
        </form>
       
        <p className="text-center text-2xl">Already have an account? <Link to="/login"><span className="text-[#9f9f9f] cursor-pointer">Log in</span></Link> </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
