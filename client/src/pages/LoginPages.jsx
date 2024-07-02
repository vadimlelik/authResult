import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../store/authSlice";


const LoginPages = () => {
    const [data, setData] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(data, navigate))
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
                <input type="text" name='email' placeholder="Email address"/>
                <input type="password" name='password' placeholder="Password"/>
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
};


export default LoginPages