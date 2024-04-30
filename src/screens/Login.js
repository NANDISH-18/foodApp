import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';


const Login = () => {
  const [creadential, setCredential] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:8000/api/loginuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: creadential.email, password: creadential.password })
    })
    const json = await response.json();
    console.log(json)

    if (!json.success) {
      alert('Enter valid credential');
    }

    if (json.success) {
      // Set the email in the local stoarge
      localStorage.setItem("userEmail", creadential.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/')
    }
  }

  const onChanage = (event) => {
    setCredential({ ...creadential, [event.target.name]: event.target.value })
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit} className='w-50 m-auto mt-5 border border-success rounded'>
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
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to='/createuser' className='m-3 mx-1 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
  )
}

export default Login