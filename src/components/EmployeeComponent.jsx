import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')
    const [email, setEmail] = useState('')

    const navigator = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLasttName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    const [errors, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email }
            console.log(employee)
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employee')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((reposonse) => {
                    console.log(reposonse.data);
                    navigator('/employee')
                }).catch(error => {
                    console.error(error);
                })
            }
        }

    }

    function validateForm() {
        let valid = true;
        const errorCopy = { ...errors }
        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'First Name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Last Name is required'
            valid = false;
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'email is required'
            valid = false;
        }
        setError(errorCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-lable'>First Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee first name'
                                    name='fistname'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ' '}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-lable'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee last name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLasttName(e.target.value)}
                                >
                                </input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-lable'>Email</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent