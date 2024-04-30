import React from 'react'
import {useCart, useCartDispatch} from '../components/ContextReducer'
import Delete from '@mui/icons-material/Delete'

const Cart = () => {

    const dispatch = useCartDispatch();
    const cartData = useCart();

    // If data length =0  then nothing show in the cart
    if(cartData.length === 0){
        return (
            <div className='m-5 w-100 text-center fs-3'>
                The Cart is Empty!
            </div>
        )
    }
    const totalPrice = cartData.reduce((total, food) => total + food.price, 0)

    const handleCheckOut = async (e) => {
        e.preventDefault()
        let userEmail = localStorage.getItem('userEmail');
        const response = await fetch('http://localhost:8000/api/orderData',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                order_data: cartData,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        })
        console.log("order response:", response)
        if(response.status === 200){
            dispatch({type:'DROP'})
        }
    }

  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>

                    </tr>
                </thead>
                <tbody>
                    {cartData.map((food, index) => (
                        <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type='button' className='btn p-0'><Delete onClick={()=> dispatch({type:'REMOVE', index:index})} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1 className='fs-2'>Total price: {totalPrice}</h1></div>
            <div>
                <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>
    </div>
  )
}

export default Cart