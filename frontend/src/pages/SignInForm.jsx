import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from './../helpers/axios';
import { AuthContext } from '../contexts/AuthContext';


export default function SignInForm() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState(null);
    let navigate = useNavigate();
    let {dispatch} = useContext(AuthContext);


    let login = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            let data = {
                email,
                password
            };

            let res = await axios.post("/api/users/login", data, {
                withCredentials: true
            });


            if (res.status == 200) {
                dispatch({type:"LOGIN",payload:res.data.user})
                navigate("/");
            }




        } catch (error) {
            console.log(error);
            setError(error.response.data.msg);
        }

    }


    return (
        <div className="mx-auto w-full max-w-lg rounded">
            <form onSubmit={login} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='text-center'>
                    <h2 className='text-xl my-2 font-bold'>Register Form</h2>
                </div>
                

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                    {!!(error) && <p className="text-red-500 text-xs italic">{error}</p>}

                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                </div>


                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                        Login
                    </button>
                    <Link to="/sign-up" className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800" href="#">
                        Register Here
                    </Link>
                </div>
            </form>

        </div>
    )
}
