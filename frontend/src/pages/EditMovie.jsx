import {
    Container,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        title: "",
        rating: "",
        duration: "",
        description: "",
        releaseDate: "",
    });

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await api.get(`/movies/${id}`);
            setMovie(res.data);
        };
        fetchMovie();
    }, [id]);

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/movies/${id}`, movie);
        navigate("/");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" mb={2}>
                Edit Movie
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Title" name="title" value={movie.title} margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Rating" name="rating" value={movie.rating} margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Duration" name="duration" value={movie.duration} margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Release Date" type="date" name="releaseDate"
                    InputLabelProps={{ shrink: true }} value={movie.releaseDate?.slice(0, 10)} margin="normal" onChange={handleChange} />
                <TextField fullWidth label="Description" name="description"
                    multiline rows={3} value={movie.description} margin="normal" onChange={handleChange} />

                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                    Update Movie
                </Button>
            </form>
        </Container>
    );
};

export default EditMovie;
