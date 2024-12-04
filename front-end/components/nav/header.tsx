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
import { useTranslation } from 'next-i18next';

function NavBar(): ReactElement {
    const { t } = useTranslation();

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
                                {
                                    // @ts-ignore
                                    t("header.home")
                                }
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ) : (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/"
                                >
                                    {
                                        // @ts-ignore
                                        t("header.home")
                                    }
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/characters/characterOverview"
                                >
                                    {
                                        // @ts-ignore
                                        t("header.profile")
                                    }
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/weapons/weaponOverview"
                                >
                                    {
                                        // @ts-ignore
                                        t("header.weapons")
                                    }
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/mounts/mountOverview"
                                >
                                    {
                                        // @ts-ignore
                                        t("header.mount")
                                    }
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/quests/questOverview"
                                >
                                    {
                                        // @ts-ignore
                                        t("header.quests")
                                    }
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
                                            <DropdownMenuLabel>{
                                                // @ts-ignore
                                                t("account.account")
                                            }</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    {
                                                        // @ts-ignore
                                                        t("account.role")
                                                    }
                                                    <DropdownMenuShortcut>
                                                        {role === 'game master' ? <Badge>GM</Badge> : <Badge>P</Badge>}
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {
                                                        // @ts-ignore
                                                        t("header.language")
                                                    }
                                                    <DropdownMenuShortcut>
                                                        <Language/>
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={handleLogout}>
                                                    {
                                                        // @ts-ignore
                                                        t("account.logout")
                                                    }
                                                    <DropdownMenuShortcut>
                                                        <ExitIcon className="hover:cursor-pointer" />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
