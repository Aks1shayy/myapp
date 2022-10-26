import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import './styles/style.css'


function register() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [admin, setAdmin] = useState('false')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function addUser(e) {
    e.preventDefault()
    try {
      const resp = await axios.post("http://localhost:5000/user/register", {
        email: email,
        lname: lname,
        fname: fname,
        password: password,
        admin: admin
      });
      if (resp.status === 200) {
        alert("User Added successfuly")
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      
      <div className='d-flex p-2 justify-content-center align-items-center' style={{ height: 100 + 'vh' }}>

        <form onSubmit={addUser} >
          <div className="outerDiv ">

            <div className="card px-1 py-4">

              <div className="card-body">

                <div>

                  <span className="headerText" style={{fontFamily:'fantasy'}}>Enter User Details</span>

                </div>


                <div className="row">

                  <div className="col-sm-12">

                    <div className="form-group">

                      <input className="form-control emailCss" required="required" id="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />


                    </div>

                  </div>

                </div>
                <div className="row">

                  <div className="col-sm-12">

                    <div className="form-group">

                      <input className="form-control nameCss" required="required" id="fname" type="text" placeholder="First Name" onChange={(e) => setFname(e.target.value)} />


                    </div>

                  </div>

                </div>
                <div className="row">

                  <div className="col-sm-12">

                    <div className="form-group">

                      <input className="form-control nameCss" required="required" id="lname" type="text" placeholder="Last Name"  onChange={(e) => setLname(e.target.value)} />


                    </div>

                  </div>

                </div>

                <div className="row">

                  <div className="col-sm-12">

                    <div className="form-group">

                      <input className="form-control passwordCss" required="required" id="password" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />



                    </div>

                  </div>

                </div>
                <div className="row">
                <div className="col-sm-12">
                <div className="form-group">
                  <div className="labelCss">
                  <div  style={{fontWeight:'bolder'}}>Admin Access</div>
                  <div className="row"></div>

                      <label>
                        <input
                          type='radio'
                          name='admin'
                          onClick={(e) => setAdmin('true')}></input>Yes
                      </label>
                      <div className="row"></div>
                      <label>
                        <input
                          type='radio'
                          name='admin'
                          defaultChecked
                          onClick={(e) => setAdmin('false')}></input>No
                      </label>
                      
                    
                    
                  </div>
                  </div>
                  </div>
                </div>

                <div className="d-flex  text-center px-5 mx-3 d-flex justify-content-evenly" >

                  <div>

                    <button className="btn btn-success confirm-button w-100" type="submit" >Register</button>

                  </div>

                  <div>

                    <button className="btn btn-warning  confirm-button w-100" type="reset" >reset</button>

                  </div>

                </div>
                <div className="text-center my-4">
                <Link to='/' className='links'>Existing user</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default register