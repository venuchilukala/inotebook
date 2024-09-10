import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name:"", email : "", password : "", cpassword:""})

    const handleSubmit = async (e)=>{
        const {name, email, password} = credentials
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createUser',{
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name, email, password})
        });
        const json = await response.json(); 
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/")
        }else{
            alert("Invalid")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">COnfirm Password</label>
          <input type="password" className="form-control"onChange={onChange} id="cpassword" name='cpassword' minLength={5} required/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
