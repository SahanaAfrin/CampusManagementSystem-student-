import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const [admin, setAdmin] = useState({username: "", password: ""});
    const [errMessage, setErrMessage] = useState("");
    const navigate = useNavigate();

    function handleChange(event) {
        const {name, value} = event.target;
        setAdmin(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function handleSignUp(event) {
        event.preventDefault();
        // Add sign-up logic here (e.g., check if username already exists)
        if (admin.username === "") {
            setErrMessage("Username is required");
            document.getElementById("username").focus();
            return;
        } else if (admin.password === "") {
            setErrMessage("Password is required");
            document.getElementById("password").focus();
            return;
        }
        // Simulate successful sign-up
        navigate("/dashboard");
    }

    return (
        <div className={"centered-element"}>
            <img className={"login-img"} src={"./images/login-logo.png"} width={"120px"} alt={"login-logo"}/>
            <div className={"login-container"}>
                <h1>Sign Up</h1>
                <br/>
                <form onSubmit={handleSignUp} className={"login-form"}>
                    <input onChange={handleChange} id={"username"} type={"text"} name={"username"} placeholder={"Username"} value={admin.username}/>
                    <input onChange={handleChange} id={"password"} type={"password"} name={"password"} placeholder={"Password"} value={admin.password}/>
                    <button type={"submit"}>Sign Up</button>
                </form>
                <h5>{errMessage}</h5>
            </div>
        </div>
    );
}

export default SignUp;
