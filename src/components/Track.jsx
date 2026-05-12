import { UserContext } from '../contexts/UserContext';
import { useContext} from 'react';
import Header from '../components/Header';
import { useState } from 'react';
import GetFood from '../components/GetFood';

export default function Track() {

    const LoggedIn = useContext(UserContext)
    const [food,setFood] = useState([])
    const [foodDisplay,setFoodDisplay] = useState(null)
    let [visibility,setvisibility] = useState(
        {state:"hidden"}
    )

    function searchFood(event) {

        let value = event.target.value;
        
        fetch("http://localhost:8000/foods/"+value,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${LoggedIn.userLogged.token}`
            }
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            if(value!=="")
            {
                setFood(data)
                console.log(food)
                setvisibility({state:"visible"})
            }
            else
            {
               setFood([])
               setvisibility({state:"hidden"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })

        // console.log(event.target.value)
        // console.log(LoggedIn.userLogged.token)
    }

    return (
        <div>
            <Header/>   
            <div className='search-box'>
                <input type="search" name="food" onChange={searchFood} 
                placeholder='Search any food' className='search' />

                {
                    food.length===0?(
                        <p className={visibility.state}>Food is not available</p>
                    )
                    :(
                        <div className={visibility.state}>
                            {
                                food.map((item)=>{
                                    return (
                                        <p onClick={()=>{
                                            setFoodDisplay(item)
                                        }} key={item._id}>{item.name}</p>
                                    )
                                })
                                
                            }
                        </div>
                    )
                }
                
                

                {
                    foodDisplay!==null?
                    <GetFood props={foodDisplay}/>
                    :null
                }

                
            </div>

        </div>
    )
    
}