import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext.js';

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, loading: true };
        case "LOGIN_SUCCESS":
            return { ...state, loading: false, error: "", loggedInUser: action.payload };
        case "LOGIN_FAIL":
            return { ...state, loading: false, error: action.payload };
        default: return state;
    }
}

const LoginPage = () => {

    const { user, setUser, backendAPI } = useContext(ThemeContext);

    const navigate = useNavigate();

    if (user) {
        navigate("/profile")
    }

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: "",
        loggedInUser: null,
    });
    const { loading, error, loggedInUser } = state;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_REQUEST" });
        try {
            const { data } = await axios(`${backendAPI}/users?email=${email}&password=${password}`);
            if (data.length > 0) {
                localStorage.setItem("user", JSON.stringify(data[0]))
                dispatch({ type: "LOGIN_SUCCESS", payload: data[0] })
            } else {
                dispatch({ type: "LOGIN_FAIL", payload: "Invalid email or password" })
            }
        } catch (error) {
            dispatch({ type: "LOGIN_FAIL", payload: error.message })
        }
    };

    useEffect(() => {
        if (loggedInUser) {
            setUser(loggedInUser);
            navigate("/profile");
        }
    }, [loggedInUser, backendAPI])

    return (
        <div>
            <h1>Login User</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-item">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id='email' required onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-item">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id='password' required onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-item">
                    <label htmlFor=""></label>
                    <button>Login</button>
                </div>
                {loading &&

                    <div className='form-item'>
                        <label htmlFor=""></label>
                        <span>Processing...</span>
                    </div>}
                {error &&
                    <div className='form-item'>
                        <label htmlFor=""></label>
                        <span className='error'>{error}</span>
                    </div>}
                <div className="form-item">
                    <label htmlFor=""></label>
                    <span>New user? <Link to="/register">Register</Link></span>
                </div>
                <div className="form-item">
                    <label htmlFor=""></label>
                    <span>Or use email: Sincere@april.biz password: 123</span>
                </div>
            </form>
        </div>
    )
}

export default LoginPage