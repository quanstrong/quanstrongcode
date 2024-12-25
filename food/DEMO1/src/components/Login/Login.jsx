import React, { useState,useContext } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext'
import axios from "axios"

const Login = ({setShowLogin}) => {
    
    const {url,setToken} = useContext(StoreContext)

const[currState,setCurrState] = useState("Đăng nhập")
const[data,setData] = useState({
    name:"",
    email:"",
    password:""
})

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState==="Đăng nhập"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }




  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Đăng nhập"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}            
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            </div>
            <button type='submit'>{currState==="Đăng ký"?"Tạo tài khoản":"Đăng nhập"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>Tôi đã đọc và chấp nhận điều khoản dịch vụ.</p>
            </div>
            {currState==="Đăng nhập"
            ?<p>Tạo tài khoản mới ? <span onClick={()=>setCurrState("Đăng ký")}>Click here</span></p>
            :<p>Đã có tài khoản ?   <span onClick={()=>setCurrState("Đăng nhập")}>Login here</span></p>
            }
           
           
        </form>
    </div>
  )
}
export default Login