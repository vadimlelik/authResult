import {useState} from "react";
import {useDispatch} from "react-redux";
import {signup} from "../store/authSlice";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const [data, setData] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signup(data, navigate))
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
                <input type="text" name='name' placeholder="Set name"/>
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage