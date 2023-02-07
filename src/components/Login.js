import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SIgn_img from './SIgn_img';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const history = useNavigate();

    const [inpval, setinpval] = useState({

        email: "",

        password: ""
    })

    const [data, setdata] = useState([]);
    console.log(inpval);

    const getdata = (e) => {
        // console.log(e.target.value);

        const { value, name } = e.target;
        // console.log(value,name);

        setinpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    const addData = (e) => {
        e.preventDefault();

        const getuserArr = localStorage.getItem("useryoutube");
        console.log(getuserArr);
        
        const { email, password } = inpval;


        if (email === "") {
            alert("email field is required")
        } else if (!email.includes("@")) {
            alert("please enter valid email address")

        } else if (password === "") {
            alert("password field is required")
        } else if (password.length < 5) {
            alert("password length should be greater than five")
        } else {
            if(getuserArr && getuserArr.length){
                const userdata = JSON.parse(getuserArr);
                const userlogin = userdata.filter((el,k)=>{
                    return el.email === email && el.password === password
                });

                if(userlogin.length === 0){
                    alert("invalid details")
                }else{
                    console.log("user login successful");

                    localStorage.setItem("user_login",JSON.stringify(userlogin))

                    history("/details")
                }
            }
        }
    }

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign IN</h3>
                        <Form>


                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />

                            </Form.Group>



                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        
                    </div>
                    <SIgn_img />
                </section>
            </div>
        </>
    );
}

export default Login;
