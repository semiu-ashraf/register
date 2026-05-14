import { Link, useNavigate } from "react-router-dom"
import { useState,useContext } from "react"
import { UserContext } from "../contexts/UserContext"

function Login()
{
    const LoggedIn = useContext(UserContext)

    let [usercreds, setUsercreds] = useState({
            email:'',
            password:''
        })

    let [message, setMessge] = useState({
        type:"invisible-msg",
        text:"Dummy msg"
    })

    let navigate = useNavigate()
    
        function handleCreds(event)
        {
            setUsercreds((prevCreds)=>{
                return ({...prevCreds,
                    [event.target.name]:event.target.value}
                )      
            })
        }

    function submitCreds(event) {

        event.preventDefault()

        fetch("https://nutrition-api-9cta.onrender.com/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(usercreds)
        })
        .then((response)=>{

            if(response.status===404)
            {
                setMessge({type:"error",text:"User not found"})
            }
            else if(response.status===403)
            {
                setMessge({type:"error",text:"Password not correct"})
            }
            setTimeout(()=>{
                setMessge({type:"invisible-msg",text:"Empty text"})
            },3000)
            
            
            return response.json()
        })
        .then((user)=>{

            if(user.token!==undefined)
            {
                localStorage.setItem("nutrify-user",JSON.stringify(user))
                LoggedIn.setuserLogged(user)
                navigate('/track')
            }
            else
            {
                navigate('/login')
            } 
                       
        })
        .catch((err)=>{
            console.log(err)
        })

        // console.log(usercreds)
        
    }


    return  (
        <>
        <section className="container">
            
            <form className="form" onSubmit={submitCreds}>

                <h2>Continue To Stay Fit</h2>

                <input className="credInput" onKeyUp={handleCreds} placeholder="Enter Your Email" type="email" name="email" />

                <input className="credInput" onKeyUp={handleCreds} placeholder="Enter Password" type="password" name="password" />  
 
                <div className="verify">
                    <button className="btn" >Login</button>
                    <p>Don't have an account ? <Link to="/register">Register</Link></p>
                </div>

                <p className={message.type}>{message.text}</p>
                
            </form>

            
            
        </section>
        </>
    )
}

export default Login