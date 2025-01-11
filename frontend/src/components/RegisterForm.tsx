import React from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {Alert, Avatar, Box, Button, Container, Grid2 as Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {RegisterRequest} from '../types/auth';
import {useAuth} from "../context/AuthContext.tsx";
import {register as registerUser} from "../services/authService.ts";

interface RegisterFormInputs extends RegisterRequest {
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const {setIsAuth} = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: {errors}
    } = useForm<RegisterFormInputs>();

    const password = watch("password");

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            if (data.password !== data.confirmPassword) {
                setError('confirmPassword', {
                    type: 'validate',
                    message: 'Passwords do not match'
                });
                return;
            }

            await registerUser(data);
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
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                    {errors.root && (
                        <Alert severity="error" sx={{mb: 2}}>
                            {errors.root.message}
                        </Alert>
                    )}
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
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
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.^&*])[a-zA-Z\d!@#$%.^&*]{8,64}$/,
                                        message: "Password must be 8-64 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "The passwords do not match"
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;