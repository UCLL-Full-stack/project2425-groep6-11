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

function SignUp() {
    const { toast } = useToast()

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [role, setRole] = React.useState("Player");
    const [isAdmin, setIsAdmin] = React.useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createUser(username, password, email, role).then(_ => console.log("Creating user..."));
    };

    const handleChange = (checked: boolean) => {
        setIsAdmin(checked);
        setRole(checked ? "Game Master" : "Player");
    };

    const createUser = async (username: string, password: string, email: string, role: string) => {
        try {
            const user = await UserService.createUser({ username, password, email, role });

            if (user) {
                toast({
                    title: "User created successfully!",
                    description: `${username} as a ${role}`,
                    variant: "default"
                });
            }
        } catch (error) {
            console.error("Error signing up user:", error);
            toast({
                title: "Signup failed",
                description: "There was an error signing in your user.",
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

                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <Separator/>
                        <div className="flex gap-1 my-5">
                            <Checkbox id="role" checked={isAdmin} onCheckedChange={handleChange}/>
                            <Label htmlFor="role">Enroll as game master</Label>
                        </div>

                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">Sign up</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}

export default SignUp;
