import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Stack,
    Divider,
    Box,
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
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1 }}
                    gutterBottom
                >
                    {movie.title}
                </Typography>

                
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {movie.description}
                </Typography>

                <Divider sx={{ mb: 1.5 }} />

                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Typography variant="subtitle2">
                        ⭐ Rating: <strong>{movie.rating}</strong>
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                        📅 Release: {movie.releaseDate}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                        ⏱ Duration: {movie.duration} min
                    </Typography>
                </Box>
            </CardContent>

            
            {role === "admin" && (
                <CardActions sx={{ px: 2, pb: 2 }}>
                    <Stack direction="row" spacing={1} width="100%">
                        <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={() => onEdit(movie)}
                        >
                            Edit
                        </Button>
                        <Button
                            fullWidth
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