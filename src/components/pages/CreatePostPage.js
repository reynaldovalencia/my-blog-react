import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react'
import { ThemeContext } from '../../ThemeContext.js';

const initialState = {
    loading: false,
    createdPost: null,
    error: "",
    success: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_RESET':
            return initialState;
        case 'CREATE_REQUEST':
            return { ...state, loading: true }
        case 'CREATE_SUCCESS':
            return { ...state, loading: false, createdPost: action.payload, success: true, error: "" }
        case 'CREATE_FAIL':
            return { ...state, error: action.payload, loading: false, success: false };
        default: return state;
    }
}

const CreatePostPage = () => {
    const { user, backendAPI } = useContext(ThemeContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, error, createdPost, success } = state;

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'CREATE_REQUEST' })
        try {
            const { data } = await axios.post(`${backendAPI}/posts`, {
                title, body, userId: user.id, id: Math.floor(Math.random() * 1000000)
            });
            dispatch({ type: "CREATE_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: "CREATE_FAIL", payload: error.message })
        }
    }

    const reset = () => {
        dispatch({ type: "CREATE_RESET" })
    }

    return (
        <div>
            <h1>Create Post</h1>
            {
                success ? (<div>
                    <p>
                        Post titled <strong>{createdPost.title}</strong> has been created.
                    </p>
                    <button onClick={reset}>Create another post</button>
                </div>) : (
                    <form className='form' onSubmit={handleSubmit}>
                        <div className="form-item">
                            <label htmlFor="title">Title: </label>
                            <input type="text" name='title' id='title' onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="body">Body: </label>
                            <textarea type="text" name='body' id='body' onChange={e => setBody(e.target.value)} ></textarea>
                        </div>
                        <div className="form-item">
                            <label></label>
                            <button>Create</button>
                        </div>
                        {
                            loading && <div className='form-item'>
                                <label htmlFor=""></label>
                                <span>Processing...</span>
                            </div>
                        }
                        {
                            error && <div className='form-item'>
                                <label htmlFor=""></label>
                                <span className='error'>{error}</span>
                            </div>
                        }
                    </form>
                )
            }

        </div>
    )
}

export default CreatePostPage