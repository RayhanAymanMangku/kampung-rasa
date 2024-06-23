import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from 'zod';
import './LoginForm.css'


const loginSchema = object({
    username: string().nonempty(),
    password: string().nonempty(),
});

export function LoginFormComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClickMasuk = async () => {
        try {
            loginSchema.parse({ username, password });

            const userData = { username, password };
            console.log("Sending user data:", userData);

            const response = await fetch('/Login/HandleLogin.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Server response:", result);

                if (result.success) {
                    localStorage.setItem('user', JSON.stringify(result.session));
                    localStorage.setItem('username', result.username); // Save username in localstorage
                    navigate('/dashboard');
                } else {
                    alert(result.error || 'Login failed. Please check your username and password.');
                }
            } else {
                console.error('Error submitting data:', response.statusText);
                alert('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.error(error.message);
            alert('Email and password are required!');
        }
    };


    return (
        <div className="flex h-[100vh] justify-center items-center">
            <Card shadow={false} className="mx-auto p-4" id="card">
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Khusus karyawan Kampung Rasa
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Username
                        </Typography>
                        <Input
                            size="lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            name="username"
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            name="password"
                        />
                    </div>

                    <Button className="mt-6" fullWidth onClick={handleClickMasuk}>
                        Masuk
                    </Button>

                </form>

            </Card>
        </div>
    );
}