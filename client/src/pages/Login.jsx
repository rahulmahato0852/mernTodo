import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from '../redux/apis/authApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Login = () => {


    const [logInTrigger, { isSuccess, error, isLoading, isError }] = useLoginMutation()
    const [response, setResponse] = useState({})
    const handleChange = e => {
        const { name, value, files, type } = e.target
        if (type === "file") {
            setResponse({ ...response, [name]: files[0] })
        } else {
            setResponse({ ...response, [name]: value })
        }
    }



    const { user } = useSelector(state => state.auth)


    const navi = useNavigate()

    useEffect(() => {
        if (user && user.role === "user") {
            navi("/dash")
            toast.success("Login Success")
        }
        if (user && user.role === "admin") {
            navi("/admin")
            toast.success(`${user.name} Login Success`)
        }
    }, [user])




    useEffect(() => {
        // Your script here
        const para = document.createElement("div");
        para.className = 'flex flex-wrap gap-0.5 h-screen items-center justify-center relative';
        let el = '<div class="transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>';
        for (var k = 1; k <= 1000; k++) {
            el += '<div class="transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>';
        };

        para.innerHTML = el;
        document.getElementById("myDIV").appendChild(para);

        // Cleanup function to remove the created element when the component is unmounted

    }, []); // Empty dependency array to ensure the script runs only once on mount


    useEffect(() => {

        if (isError) {
            toast.error(error)
        }
    }, [isError])


    if (isLoading) return <>

        <div className="h-screen w-screen flex  justify-center  items-center ">
            <span className="loading loading-dots loading-lg"></span>
        </div>

    </>


    return <>



        <body class="body bg-white dark:bg-[#0F172A] overflow-x-hidden flex h-screen w-screen  w-s">
            <div class="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute ">
                <div id="myDIV" >
                    <div class="w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
                        <div class="w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg">
                            <div class="w-full flex justify-center text-[#00FF00] text-xl mb:2 md:mb-5">
                                Sign In
                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-xs font-medium text-white">Your email</label>
                                <input onChange={handleChange} type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@neurolink.com" required />
                            </div>
                            <div class="mb-6">
                                <label for="password" class="block mb-2 text-xs font-medium text-white">Your password</label>
                                <input onChange={handleChange} type="password" id="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div class="flex flex-row justify-between">
                                <div class="text-white text-sm md:text-md "><Link to="/register" >ForgotPassword</Link></div>
                                <div class="text-[#00FF00] text-sm md:text-md"><Link to="/register" >Signup</Link></div>
                            </div>
                            <div class="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#00FF00] py-2 rounded-md">
                                <button onClick={e => logInTrigger(response)} >
                                    Login
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </body>


    </>

}

export default Login