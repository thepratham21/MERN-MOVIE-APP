import {
    Container,
    TextField,
    Grid,
    Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";

const Search = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const handleSearch = async (e) => {
        const q = e.target.value;
        setQuery(q);

        if (!q) return setMovies([]);

        const res = await api.get(`/movies/search?q=${q}`);
        setMovies(res.data);
    };

    return (
        <Container>
            <Typography variant="h4" mb={2}>
                Search Movies
            </Typography>

            <TextField
                fullWidth
                label="Search by title or description"
                value={query}
                onChange={handleSearch}
                margin="normal"
            />

            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie._id}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Search;
