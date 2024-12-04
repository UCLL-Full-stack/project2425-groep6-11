"use client";

import React, { ReactElement, useEffect, useState } from "react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "../ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    BookmarkFilledIcon,
    BookmarkIcon,
    CookieIcon,
    ExitIcon,
    Pencil2Icon,
    TrashIcon
} from '@radix-ui/react-icons';
import CharacterService from '@/services/characterService';
import Language from '@/components/nav/language';

function NavBar(): ReactElement {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("id");
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (userId && storedUsername && storedRole) {
            setUsername(storedUsername);
            setRole(storedRole);
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
                                Welcome @ WebMMO!
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
                                    href="/mounts/mountOverview"
                                >
                                    Mount
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
                                    href="#"
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <div>{username}</div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={handleLogout}>
                                                    Log out
                                                    <DropdownMenuShortcut>
                                                        <ExitIcon className="hover:cursor-pointer" />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={handleLogout}>
                                                    Role
                                                    <DropdownMenuShortcut>
                                                        {role === 'game master' ? <Badge className="px-4">GM</Badge> : <Badge className="px-4">P</Badge>}
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <Language/>
                        </>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

export default NavBar;
