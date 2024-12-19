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
import { useTranslation } from 'next-i18next';

function SignUp() {
    const { toast } = useToast()
    const { t } = useTranslation()

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
                description: `${error}`,
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
                                <Label htmlFor="username">{
                                    // @ts-ignore
                                    t("account.username")
                                }</Label>
                                <Input
                                    id="username"
                                    placeholder={
                                        // @ts-ignore
                                        t("account.username")
                                    }
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="password">{
                                    // @ts-ignore
                                    t("account.password")
                                }</Label>
                                <Input
                                    id="password"
                                    placeholder={
                                        // @ts-ignore
                                        t("account.password")
                                    }
                                    value={password}
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="email">{
                                    // @ts-ignore
                                    t("account.email")
                                }</Label>
                                <Input
                                    id="email"
                                    placeholder={
                                        // @ts-ignore
                                        t("account.email")
                                    }
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <Separator/>
                        <div className="flex gap-1 my-5">
                            <Checkbox id="role" checked={isAdmin} onCheckedChange={handleChange}/>
                            <Label htmlFor="role">{
                                // @ts-ignore
                                t("account.enroll_gm")
                            }</Label>
                        </div>

                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">{
                                // @ts-ignore
                                t("account.sign_up")
                            }</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}

export default SignUp;
