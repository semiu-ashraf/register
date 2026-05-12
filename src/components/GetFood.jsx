export default function GetFood(food) {
    let meal = food.props 
    console.log("getting called",meal)      
    
    return(
            <div className='food-result-box'>

                <div className='image-container'>
                    <img src="..." alt="" />
                </div>
                <h3>{meal.name} {meal.calories}Cal</h3>
                <div className='food-details'>
                    <p>{meal.fat}</p>
                    <p>Fat 6</p>
                    <p>Fat 6</p>
                    <p>Fat 6</p>
                </div>
                            
                
            </div>

    )
}