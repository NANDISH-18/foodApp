import React, { useEffect, useRef, useState } from 'react';
import { useCart, useCartDispatch } from './ContextReducer';

const Card = (props) => {
  const data = [1, 2, 3, 4, 5,6];
  const dispatch = useCartDispatch();
  const priceRef = useRef();
  // use the useCart for update the state
  const cartData = useCart();
  const [qty, setQty] = useState(1);
  const [size , setSize] = useState('')

  let option = props.options;
  let priceOptions = Object.keys(option);
  

  const handleAddToCart = async () => {

    let food = []
    for(const item of cartData){
      if(item.id === props.foodItems._id){
        food = item;
        break;
      }
    }

  

    if(food.length!==0){
      if(food.size === size){
        await dispatch({type: 'UPDATE', id: props.foodItems._id, price: finalPrice, qty: qty});
        return;
      }else if(food.size !== size){
        await dispatch({type: "ADD",id: props.foodItems._id , name:props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.foodItems.img})
        return;
      }
      return;
    }
    await dispatch({type: "ADD",id: props.foodItems._id , name:props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.foodItems.img})
    

  }

  let finalPrice = qty * parseInt(option[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  },[])
  
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: '18rem', maxHeight: '500px' }}> {/* Adjusted max-height for card */}
          <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: '140px', objectFit:'fill' }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            {/* <p className="card-text">This is the card</p> */}
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
                {data.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {priceOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
          </div>
          <hr></hr>
          <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;


// form-select bg-success rounded-pill m-2