import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { LoginRequest } from '../types/auth';
import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid2 as Grid,
    Link,
    Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { setIsAuth } = useAuth();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {
        try {
            await login(data);
            setIsAuth(true);
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof Error) {
                setError('root', {
                    type: 'manual',
                    message: err.message
                });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    {errors.root && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.root.message}
                        </Alert>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Username must be at least 3 characters"
                            }
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;