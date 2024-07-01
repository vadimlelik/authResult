import {useState} from "react";

const LoginPages = () => {
    const [data, setData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setData((prevState) => ({
                ...prevState,
                [name]: value
            }
        ))
    }

    return (
        <div>
            <h1>SignUp</h1>
            <form onChange={handleChange} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <input type="text" name='text' placeholder="Email address"/>
                <input type="password" name='email' placeholder="Password"/>
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
};


export default LoginPages