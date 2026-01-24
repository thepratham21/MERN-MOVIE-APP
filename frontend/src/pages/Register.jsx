import { Button, TextField, Typography, Container } from "@mui/material";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/auth/register", form);
        navigate("/login");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" mb={2}>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Name" margin="normal"
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextField fullWidth label="Email" margin="normal"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <TextField fullWidth label="Password" type="password" margin="normal"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <Button fullWidth variant="contained" type="submit">
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Register;
