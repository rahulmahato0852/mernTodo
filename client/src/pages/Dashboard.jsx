import React, { useEffect, useRef, useState } from 'react'
import { useAddUserBlogsMutation, useDeleteUserBlogsMutation, useGetUserBlogsQuery, useModifyUserBlogsMutation } from '../redux/apis/userApi'
import { motion, useAnimation, useScroll } from "framer-motion"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useLogOutMutation } from '../redux/apis/authApi'
import { useSelector } from 'react-redux'

const Dashboard = () => {

    const [response, setResponse] = useState({})

    const handleChange = e => {
        const { name, value, files, type } = e.target
        if (type === "file") {
            setResponse({ ...response, [name]: files[0] })
        } else {
            setResponse({ ...response, [name]: value })
        }
    }



    const [addBlogTrigger, { isSuccess, isError, error }] = useAddUserBlogsMutation()


    const handleSubmit = e => {
        const fd = new FormData()
        fd.append("title", response.title)
        fd.append("desc", response.desc)
        fd.append("hero", response.hero)
        console.log(fd, response);
        addBlogTrigger(fd)
    }


    useEffect(() => {
        if (isSuccess) {
            toast.success("Blog add success")
        }
        if (isError) {
            toast.error(error)
        }
    }, [isSuccess, isError])


    const [logOutTrigger, { isSuccess: isss }] = useLogOutMutation()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) {
            toast.error("Log Out Success")
        }
    }, [user])



    return <>


        <div className="">

            <div className="text-end">
                <button onClick={e => logOutTrigger()} className="btn btn-primary">Log Out</button>
            </div>


            <main class="flex min-h-screen items-center justify-center bg-dark font-sans">
                <motion.label
                    initial={{ translateY: "100%", opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1, }}
                    transition={{ delay: 0.3, duration: 1.5 }}
                    for="dropzone-file" class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed  border-blue-400 bg-rose-400 p-6 text-center">

                    <input onChange={handleChange} className='w-full input my-3' type="text" name="title" placeholder='Enter name here' id="" />
                    <input onChange={handleChange} className='w-full input my-3' type="text" name="desc" placeholder='Enter desc here' id="" />



                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>

                    <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">Upload Image File</h2>

                    <p class="mt-2 text-gray-500 tracking-wide">Upload or darg & drop your file SVG, PNG, JPG or GIF. </p>
                    <div className="mt-5 flex justify-end w-full">
                        <button onClick={e => handleSubmit()} type="button" class="btn btn-dark">Add Blog</button>
                    </div>
                </motion.label>

                <input onChange={handleChange} id="dropzone-file" name='hero' type="file" class="hidden" />


            </main>

        </div>




        <Table />



    </>
}



const Table = ({ startAnimation }) => {


    const ref = useRef(null)
    const [selectedBlog, setSelectedBlog] = useState()

    const { data, isLoading } = useGetUserBlogsQuery()

    const [deleteTrigger, { isLoading: DisLoading }] = useDeleteUserBlogsMutation()

    const [updateTrigger, { isSuccess, isLoading: UisLoading }] = useModifyUserBlogsMutation()

    console.log(data);



    return <div ref={ref} className='p-20 h-[1000px]' >

        {!data || isLoading ? <>

            <div className="h-60 w-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>

        </>


            : <div
                className="overflow-x-auto bg-amber-400 text-black">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='font-bold text-black '  >Id</th>
                            <th className='font-bold text-black '  >Title</th>
                            <th className='font-bold text-black '  >Desc</th>
                            <th className='font-bold text-black '  >Hero</th>
                            <th className='font-bold text-black '  >Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            data.map(item => selectedBlog && selectedBlog._id === item._id ? <>

                                <tr>
                                    <td> <input onChange={e => setSelectedBlog({ ...selectedBlog, [e.target.name]: e.target.value })} className='input text-white ' type="text" value={selectedBlog.title} name="title" id="" /> </td>

                                    <td> <input onChange={e => setSelectedBlog({ ...selectedBlog, [e.target.name]: e.target.value })} className='input text-white ' type="text" value={selectedBlog.desc} name="desc" id="" /> </td>

                                    <td><img className='h-10' src={`${import.meta.env.VITE_BACKEND_URL}/${selectedBlog.hero}`} alt="" /> <input onChange={e => setSelectedBlog({ ...selectedBlog, [e.target.name]: e.target.files[0] })} className=' text-white ' type="file" name="newhero" id="" /> </td>
                                    <td className='flex items-center justify-between' >
                                        <button onClick={e => setSelectedBlog(null)} className="btn btn-error btn-square">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <button
                                            onClick={e => {
                                                if (selectedBlog.newhero) {
                                                    const fd = new FormData()
                                                    fd.append("title", selectedBlog.title)
                                                    fd.append("desc", selectedBlog.desc)
                                                    fd.append("hero", selectedBlog.newhero)
                                                    updateTrigger({ fd, _id: selectedBlog._id, })
                                                    setSelectedBlog(null)
                                                } else {
                                                    updateTrigger({ fd: selectedBlog, _id: selectedBlog._id, })
                                                    setSelectedBlog(null)

                                                }
                                            }}
                                            type="button" class="btn btn-accent">Update Blog</button>
                                    </td>
                                </tr>

                            </>

                                : <tr>
                                    <td>{item._id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.desc}</td>
                                    <td> <Link to={`/detail/${item._id}`}><img className='rounded-lg h-32' src={`${import.meta.env.VITE_BACKEND_URL}/${item.hero}`} alt="No img" /></Link> </td>
                                    <td>

                                        <button onClick={e => setSelectedBlog(item)} type="button" class="btn mx-1 btn-info">Update</button>
                                        <button onClick={e => deleteTrigger(item._id)} type="button" class="btn ms-3 btn-error">Delete</button>
                                    </td>
                                </tr>)
                        }



                    </tbody>

                </table>

            </div>


        }




    </div>
}



export default Dashboard