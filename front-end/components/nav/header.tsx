"use client";

import React, { ReactElement, useEffect, useState } from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function NavBar(): ReactElement {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("id");
        const storedUsername = localStorage.getItem("username");

        if (userId && storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUsername(null);
        window.location.href = "/";
    };

    return (
        <div className="flex justify-center">
            <NavigationMenu className="p-4">
                <NavigationMenuList>
                    {!username ? (
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="/"
                            >
                                Start here!
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ) : (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/characters/characterOverview"
                                >
                                    Profile
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/weapons/weaponOverview"
                                >
                                    Weapons
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/quests/questOverview"
                                >
                                    Quests
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/mounts/mountOverview"
                                >
                                    Mount
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <button
                                    className={navigationMenuTriggerStyle()}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/"
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src="/" alt={username} />
                                            <AvatarFallback>{username[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

export default NavBar;
