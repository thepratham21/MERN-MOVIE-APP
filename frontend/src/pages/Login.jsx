import { Button, TextField, Typography, Container } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(form));
        navigate("/");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" mb={2}>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <Button fullWidth variant="contained" type="submit">
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;
