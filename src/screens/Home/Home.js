import React, { useState, useEffect } from 'react'
import './Home.css'
import { createServer } from "miragejs"

createServer({
  routes() {
    this.get("/api/items", () => [
      "Item-1", "Item-2", "Item-3","Item-4", "Item-5", "Item-6"
    ])
  },
})

function Home() {
    const [color, setColor] = useState("black")
    const [itemList, setItemList] = useState([])
    const [checked, setChecked] = useState(false)
    const [checkedValue, setCheckedValue] = useState([])
    const [search, setSearch] = useState('')    
    const [itemFound, setItemFound] = useState(false)
    const [cartItems, setCartItems] = useState([])   

    useEffect(() => {
        fetch("/api/items")
      .then(response => response.json())
      .then(data => {
        setItemList(data)      
      })
      .catch(err => console.log(err))      
    }, [])

    const onChecked = (e) => {
      setChecked(true)
      setCheckedValue(e.target.value)    
    }

    const onChangeHandler = (e) => setSearch(e.target.value)

    const searchHandler = () => {           
      if(search !== "" && itemList.indexOf(search) > -1 ){
        setItemList([search])        
        setItemFound(true)
        setSearch('')
      }
      else{
        setItemFound(false)
      }         
  }

    const handleSubmit = () => {           
        if(setChecked){
          setCartItems([
            ...cartItems,
            checkedValue
          ]);
          setItemFound(true)
          setSearch('')
        }
        else{
          setItemFound(false)
        }           
    }   
      
    const resetHandler = () => setCartItems([])

    const radioBtnHandler = (e) => {
      let val = e.target.value      
      if(val === "red"){       
        setColor("red")
      }
      if(val === "blue"){
        setColor("blue")
      }      
    }


  return (
      <>
        <div className='outermost-div'>            
            <div className='radio-btn-div'>
                <input type='radio' className="radio-btn" name="color-button" value="blue" onChange={radioBtnHandler}/>
                <label for="blue">blue</label>
                <input type='radio' className="radio-btn" name="color-button" value="red" onChange={radioBtnHandler}/>
                
                <label for="red">red</label>
            </div>
            
            <div className='inner-div'>
                <input type="text" id="search-bar" placeholder='Enter product name' onChange={onChangeHandler}/>
                <button id="search-button" 
                style={{'backgroundColor': color === 'blue' ? 'blue' : color === 'red' ? 'red' : 'transparent'}}
                onClick={searchHandler}
                >Search</button>
                <div className='cart-div'>
                  <p>Cart</p>
                  <p>{cartItems.length} items</p>
                </div>                
            </div>
            <div className='innermost-div'>
              <div className='item-list-container'>

                  {itemList && itemList.map((item)=>{
                      return <div className="products-list" key={item.id}>
                          <input type="checkbox" id="checkbox" onChange={onChecked} value={item}/>
                          <span>{item}</span>
                          </div>                      
                  })}
                  
              </div>                                
              <div className='cart-list-container'>                                      
                {
                  checked ? cartItems.map((itemName, index) => {
                      return <p id="cart-item" key={index}>{itemName}</p>
                  }) 
                  :<p id="cart-empty">Your cart is empty</p>                                          
                }                               
                                 
              </div>
            </div>
            <div className='bottom-div'>
                    <div id="add-to-cart-div">
                      <button id="add-to-cart-btn" onClick={handleSubmit}
                      style={{'backgroundColor': color === 'blue' ? 'blue' : color === 'red' ? 'red' : 'transparent'}}
                      >Add to Cart---></button>                      
                    </div>
                  
                    <div id="checkout-div">
                      <button id="checkout-btn" onClick={resetHandler}
                      style={{'backgroundColor': color === 'blue' ? 'blue' : color === 'red' ? 'red' : 'transparent'}}
                      >Checkout---></button>
                    </div> 
                  </div>
        </div>
    </>
  )
}

export default Home