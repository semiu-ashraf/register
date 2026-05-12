import { useState } from "react"
import { Link } from "react-router-dom"

function Register()
{

    let [usercreds, setUsercreds] = useState({
        name:'',
        email:'',
        password:'',
        age:''
    })

    let [message, setMessage] = useState({
        type:"invisible-msg",
        text:"Empty text"
    })

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

        fetch("http://localhost:8000/register",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(usercreds)
        })
        .then((response)=>{
            setMessage({
                type:"success",
                text:"User registered successful"
            })
            setTimeout(()=>{
                setMessage({
                type:"invisible-msg",
                text:"Empty text"
            })
            },5000)

            setUsercreds({
                name:'',
                email:'',
                password:'',
                age:''
            })

            return response.json()
        })
        .then((user)=>{
            console.log(user)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }



    return  (
        <>
        <section className="container">
            
            <form className="form"  onSubmit={submitCreds}>

                <h2>Start Your Fitness</h2>

                <input className="credInput" 
                onChange={handleCreds}  placeholder="Enter Your Full Name" type="text" name="name" value={usercreds.name} />

                <input className="credInput" 
                onChange={handleCreds} placeholder="Enter Your Email" type="email" name="email" value={usercreds.email} />

                <input className="credInput"
                onChange={handleCreds} placeholder="Enter Password" type="password" name="password" value={usercreds.password} />  
                
                <input className="credInput"
                onChange={handleCreds} placeholder="Enter Your Age" type="number" name="age" value={usercreds.age} />
                
                <div className="verify">
                    <button className="btn">Register</button>
                    <p>You own an account ? <Link to="/login">Log In</Link></p>
                </div>

                <p className={message.type}>{message.text}</p>
                
            </form>
            
        </section>
        </>
    )
}

export default Register