import { useState, useContext } from "react"

import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

import { loginUser } from "../firebase/auth"
import { appContext } from "../context/context"

export const LoginBox = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUserId } = useContext(appContext)

    const loginButton = async() => {
        const result = await loginUser(email, password)
        if (result === undefined){
            toast('Check your credentials')
            toast.error("Error Notification !", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });   
            return     
        }
        //TODO
        setUserId(result?.uid)
        navigate('home')
        setEmail('');
        setPassword('');
    }
    
  return (
    <div className="h-full flex items-center justify-center">
        <div className="md:flex">
            <div className="grid md:flex">
                <label htmlFor="" className="font-sans">Correo Electronico</label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mx-2 rounded-md placeholder:italic px-2 focus:outline-none"
                    placeholder="Correo electronico"
                    />
            </div>
            <div className="grid md:flex">
                <label htmlFor="">Contrasena</label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mx-2 rounded-md px-2 placeholder:italic focus:outline-none"
                    placeholder="Contrasena"
                    />
            </div>
            <button
                onClick={loginButton}
                className="m-2 rounded-lg bg-lime-500 px-2 hover:bg-lime-400"
                >Ingresar
            </button>
        </div>
        <ToastContainer 
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className='box-border h-32 w-32'
        />
    </div>
  )
}
