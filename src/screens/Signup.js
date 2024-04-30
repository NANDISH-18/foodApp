import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';


const Signup = () => {

    const navigate = useNavigate();

    const [creadential, setCredential] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:8000/api/createUser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: creadential.name, email: creadential.email, password: creadential.password, location: creadential.geolocation })
        })
        const json = await response.json();
        // console.log(json)

        if (!json.success) {
            alert('Enter valid credential');
        }

        if (json.success) {
            setCredential({ name: "", email: "", password: "", geolocation: "" })
            navigate('/login');
        }
    }

    const onChanage = (event) => {
        setCredential({ ...creadential, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
                <div>
                    <Navbar/>
                </div>
                <div className='container'>
                    <form onSubmit={handleSubmit} className='w-50 m-auto mt-5 border bg-dark border-success rounded'>
                        <div className="m-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={creadential.name} onChange={onChanage} />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                name='email' value={creadential.email} onChange={onChanage}
                            />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={creadential.password} onChange={onChanage} />
                        </div>
                        <div className="m-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" name='geolocation' value={creadential.geolocation} onChange={onChanage} />
                        </div>
                        <button type="submit" className="m-3 btn btn-success">Submit</button>
                        <Link to='/login' className='m-3 mx-1 btn btn-danger'>Already a user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup