import { useEffect, useState } from "react";

const Navbar = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");

        if (token && storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div className="container">
                <a className="navbar-brand" href="#">
                    Job Seekers Platform
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <ul className="navbar-nav ml-auto">
                    {username ? (
                        <>
                            <li className="nav-item" style={{display: 'flex'}}>
                                <a className="nav-link" href="#">
                                    {username}
                                </a>
                                <a className="nav-link" href="/logout">
                                    logout
                                </a>
                            </li>
                        </>
                    ) : (

                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
