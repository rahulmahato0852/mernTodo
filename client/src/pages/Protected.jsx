import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useLogOutMutation } from '../redux/apis/authApi'
import { toast } from 'react-toastify'

const Protected = ({ compo }) => {

    const { user } = useSelector(state => state.auth)
    const [logOutTrigger, { isSuccess }] = useLogOutMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.error("Log Out Success")
        }
    }, [isSuccess])

    return user ? compo : <Navigate to={"/"} />

}

export default Protected