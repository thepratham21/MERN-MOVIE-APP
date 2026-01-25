import {
    Container,
    Grid,
    Typography,
    Pagination,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { role, token } = useSelector((state) => state.auth);

    const fetchMovies = async (pageNumber = 1) => {
        const res = await api.get(`/movies?page=${pageNumber}`);
        setMovies(res.data.movies);
        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        if (token) {
            fetchMovies(page);
        } else {
            
            setMovies([]);
            setTotalPages(1);
            setPage(1);
        }
    }, [page, token]);

    const handleDelete = (id) => {
        setMovies((prev) => prev.filter((m) => m._id !== id));
    };

    const importMovies = async () => {
        await api.post("/movies/import/imdb");
        alert("Movies import started in background");
    };

    return (
        <Container>
            <Typography variant="h4" mb={3}>
                Movies
            </Typography>

            {!token ? (
                <Typography variant="h6" align="center" sx={{ mt: 6 }}>
                    Please login to view movies
                </Typography>
            ) : (
                <>
                    {role === "admin" && (
                        <Button
                            variant="contained"
                            sx={{ mb: 3 }}
                            onClick={importMovies}
                        >
                            Import Movies
                        </Button>
                    )}

                    <Grid container spacing={2}>
                        {movies.map((movie) => (
                            <Grid item xs={12} sm={6} md={4} key={movie._id}>
                                <MovieCard
                                    movie={movie}
                                    onDelete={handleDelete}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            sx={{
                                mt: 4,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        />
                    )}
                </>
            )}
        </Container>
    );
};

export default Home;
