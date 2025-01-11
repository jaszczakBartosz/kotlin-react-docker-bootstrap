import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Paper, Button
} from '@mui/material';

const Dashboard = () => {
    const navigate = useNavigate();
    const { setIsAuth } = useAuth();

    const handleLogout = () => {
        logout();
        setIsAuth(false);
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 400,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h5" color="text.secondary">
                        Protected Dashboard Content
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Dashboard;