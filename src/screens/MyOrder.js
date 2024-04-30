import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/myOrderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const response = await res.json();
            console.log('Response:', response);
            setOrderData(response);

        } catch (error) {
            console.error('Fetch error:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData !== null ? Array(orderData).map((data) => {
                        console.log("Data", data);
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    console.log("item", item)
                                    return (
                                        item.map((arrayData) => {
                                            // console.log('arrayData',arrayData);
                                            return (
                                                <div>
                                                    {arrayData.order_date ?
                                                        <div className='m-auto mt-5'>
                                                            {data = arrayData.order_date}
                                                            <hr />
                                                        </div>

                                                        :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        {/* <span className='m-1'>{data}</span> */}
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                })

                                : ""
                        )
                    }) : ""}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MyOrder;
