import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import { useSelector } from "react-redux";

const MovieCard = ({ movie, onEdit, onDelete }) => {
    const { role } = useSelector((state) => state.auth);

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {movie.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                    {movie.description?.slice(0, 120)}...
                </Typography>

                <Typography variant="subtitle2">
                    ⭐ Rating: {movie.rating}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                    📅 Release: {movie.releaseDate}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                    ⏱ Duration: {movie.duration} min
                </Typography>
            </CardContent>

            {role === "admin" && (
                <CardActions>
                    <Stack direction="row" spacing={1}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => onEdit(movie)}
                        >
                            Edit
                        </Button>
                        <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => onDelete(movie._id)}
                        >
                            Delete
                        </Button>
                    </Stack>
                </CardActions>
            )}
        </Card>
    );
};

export default MovieCard;
