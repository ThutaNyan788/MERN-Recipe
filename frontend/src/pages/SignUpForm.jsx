import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "./../helpers/axios"

export default function SignUpForm() {
    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [errors,setErrors] = useState(null);
    let navigate = useNavigate();


    let register =async (e)=>{
        e.preventDefault();
        setErrors(null);
      try {
        let data = {
            name,
            email,
            password 
        };

        let res = await axios.post("/api/users/register", data,{
            withCredentials:true
        });

        if(res.status === 200){
            navigate("/");
        }



        
      } catch (error) {
            setErrors(error.response.data.errors);
      }

    }

    return (
        <div className="mx-auto w-full max-w-lg rounded">
            <form onSubmit={register} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='text-center'>
                    <h2 className='text-xl my-2 font-bold'>Register Form</h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    {!!(errors && errors.name) && <p className="text-red-500 text-xs italic">{errors.name.msg}</p>}

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                    {!!(errors && errors.email) && <p className="text-red-500 text-xs italic">{errors.email.msg}</p>}

                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    {!!(errors && errors.password) && <p className="text-red-500 text-xs italic">{errors.password.msg}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                        Register
                    </button>
                    <Link to="/sign-in" className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800" href="#">
                        login here
                    </Link>
                </div>
            </form>
           
        </div>
    )
}
