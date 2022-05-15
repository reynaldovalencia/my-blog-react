import { useContext, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext.js"


const Navbar = () => {
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const { theme, toggleTheme, user, backendAPI, toggleBackendAPI } = useContext(ThemeContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/search/${query}`);
        } else {
            navigate(`/`);
        }
    }

    return (
        <div className="header">
            <div className="header-item">
                <Link to="/"><strong>Mi Super blog</strong></Link>
            </div>
            <div className="header-item">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="query" placeholder="search posts" onChange={e => setQuery(e.target.value)} />
                    <button>Go</button>
                </form>
            </div>
            <div className="header-item">
                {user ? (
                    <>
                        <NavLink to="/profile" activeclassname="active">
                            {user.name}
                        </NavLink>{' '}
                        <NavLink to="/create" activeclassname="active">
                            Create Post
                        </NavLink>
                    </>

                ) : (<NavLink to="/login" activeclassname="active">Login</NavLink>)}

                <button onClick={toggleTheme}>{theme === "light" ? "Theme:light" : "Theme:dark"}</button>
                <button onClick={toggleBackendAPI}>{backendAPI === "/api" ? "API:Real" : "API:Mock"}</button>

            </div>
        </div>
    )
}

export default Navbar