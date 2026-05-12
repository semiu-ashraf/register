import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Private(props) {
    
    let dataLogged = useContext(UserContext)
    console.log(dataLogged.userLogged)
    
    return (
        dataLogged.userLogged!==null
        ?<props.element/>
        :<Navigate to="/login"/>
    )

    
}