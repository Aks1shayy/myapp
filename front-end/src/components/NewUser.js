
import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import './styles/style.css'

function NewUser() {
  axios.defaults.headers.common = { 'Authorization': sessionStorage.getItem('Token') }
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState('false')
  const navigate = useNavigate();
  async function addUser(e) {
    e.preventDefault()
    try {
      const resp = await axios.post("http://localhost:5000/user", {
        email: email,
        lname: lname,
        fname: fname,
        password: password,
        admin: admin
      });
      if (resp.status === 200) {
        alert("User Added successfuly")
        navigate('/view');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
        <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="/profile">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/view">All Users </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/new_user">Add User</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <div className='d-flex p-2 justify-content-center align-items-center' >

        <form onSubmit={addUser} >
          <div className="outerDiv ">

            <div className="card px-1 py-4">

              <div className="card-body" style={{ paddingBottom: '0%' }}>

                <div>

                  <span className="headerText">Enter User Details</span>

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

                      <input className="form-control nameCss" required="required" id="lname" type="text" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />


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
                        <div  >Admin Access</div>
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

                    <button className="btn btn-success confirm-button w-100" type="submit" >Add</button>

                  </div>

                  <div>

                    <button className="btn btn-warning  confirm-button w-100" type="reset" >Reset</button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewUser