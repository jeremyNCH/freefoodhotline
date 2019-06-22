import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const Register = props => {
    const authContext = useContext(AuthContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;

    const [alert, setAlert] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 }  = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields');
        } else if (password !== password2) {
            setAlert('Passwords do not match');
        } else {
            register({
                name, 
                email,
                password
            })
            setAlert('success');
        }
    }

    return (
        <div className="form-container">
            <h1> Account {' '}
                <span className="text-primary">
                    Register
                </span>
            </h1>
            <h2>
                { alert }
            </h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} minLength="6"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} minLength="6"/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Register;