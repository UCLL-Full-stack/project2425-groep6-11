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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function Login() {
    const { toast } = useToast()
    const { t } = useTranslation()

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
                sessionStorage.setItem('id', user.id);
                sessionStorage.setItem('username', user.username);
                sessionStorage.setItem('token', user.token);
                sessionStorage.setItem('role', user.role);

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
                description: `${error}`,
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <Card className="my-1 w-[400px]">
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <div className="flex flex-col space-y-3">
                                    <Label htmlFor="username">{
                                        // @ts-ignore
                                        t('account.username')
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
                            <Separator className="my-4" />
                            <CardFooter className="p-0">
                                <Button type="submit" className="font-semibold">{
                                    // @ts-ignore
                                    t("account.login")
                                }</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
                <Toaster />
            </div>
            <div>
                <Table className="mt-5">
                    <TableCaption>A list of seeded users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Username</TableHead>
                            <TableHead>Password</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">player1</TableCell>
                            <TableCell>Password1*</TableCell>
                            <TableCell>Player</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">gamemaster1</TableCell>
                            <TableCell>Password2*</TableCell>
                            <TableCell>Game master</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default Login;
