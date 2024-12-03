import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Checkbox } from '@/components/ui/checkbox';
import UserService from '@/services/userService';
import { Separator } from '@/components/ui/separator';

function Login() {
    const { toast } = useToast()

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        loginUser(username, password).then(_ => console.log("Creating user..."));
    };

    const loginUser = async (username: string, password: string ) => {
        try {
            const user = await UserService.loginUser({ username, password });

            if (user) {
                console.log(user)
                localStorage.setItem('id', user.id);
                localStorage.setItem('username', user.username);
                localStorage.setItem('token', user.token);
                localStorage.setItem('role', user.role);

                toast({
                    title: "User logged in successfully!",
                    description: `Welcome ${username}!`,
                    variant: "default"
                });

                window.location.href = "/characters/characterOverview";
            }
        } catch (error) {
            console.error("Error creating user:", error);
            toast({
                title: "User login failed",
                description: "There was an error logging in your user.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="my-1 w-[400px]">
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Separator className="my-4"/>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">Login</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}

export default Login;
