import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearMovies } from "../redux/movieSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const { token, role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(clearMovies());
        dispatch(logout());
    };

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    🎬 Movie App
                </Typography>

                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>

                {role === "admin" && (
                    <Button color="inherit" component={Link} to="/admin/add">
                        Add Movie
                    </Button>
                )}

                {!token ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
