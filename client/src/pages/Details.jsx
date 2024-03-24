import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetBlogDetailQuery } from '../redux/apis/userApi';

const Details = () => {

    const { id } = useParams()

    const { data } = useGetBlogDetailQuery(id)

    console.log(data);

    return data && (
        <div>


            <div className="h-screen w-screen flex justify-center items-center">

                <div className="card card-compact shadow-slate-100  w-96 bg-base-200 shadow-2xl">
                    <figure><img className='w-96 h-96' src={data.hero} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{data.title}</h2>
                        <p>{data.desc}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">
                                <Link to="/dash">Go Back</Link>
                            </button>
                        </div>
                    </div>
                </div>


            </div>




        </div>
    )
}

export default Details