import React from 'react';
import { useRouter } from 'next/router';
import path from 'node:path';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function Language() {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (newLocale: string) => {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale }).then(_ => console.log("Changing languages..."));
    }

    return (
        <Select onValueChange={handleLanguageChange} value={locale}>
            <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="jp">JP</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default Language