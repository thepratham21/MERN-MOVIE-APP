import {
    Container,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const [movie, setMovie] = useState({
        title: "",
        rating: "",
        duration: "",
        description: "",
        releaseDate: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/movies", movie);
        navigate("/");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" mb={2}>
                Add Movie
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Title" name="title" margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Rating" name="rating" margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Duration (mins)" name="duration" margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Release Date" type="date" name="releaseDate"
                    InputLabelProps={{ shrink: true }} margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Description" name="description" margin="normal"
                    multiline rows={3} onChange={handleChange} />

                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                    Add Movie
                </Button>
            </form>
        </Container>
    );
};

export default AddMovie;
