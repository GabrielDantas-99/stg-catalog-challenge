"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
    base: "absolute top-[3px] left-[4px] size-6 rounded-full bg-transparent flex items-center justify-center transform transition duration-300 ease-in-out",
    variants: {
        variant: {
            dark: "translate-x-0",
            light: "translate-x-6",
        },
    },
    defaultVariants: {
        variant: "light",
    },
});

export default function SwitcherTheme() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isLight = resolvedTheme === "light";

    return (
        <div className="flex items-center justify-center">
            <label className="flex items-center cursor-pointer" htmlFor="theme-toggle">
                <div className="w-14 h-8 relative rounded-3xl bg-background border border-icon-color">
                    <input
                        type="checkbox"
                        id="theme-toggle"
                        className="hidden"
                        onChange={() => setTheme(isLight ? "dark" : "light")}
                        checked={isLight}
                    />
                    <div
                        className={inputVariants({
                            variant: isLight ? "light" : "dark",
                        })}
                    >
                        {isLight ? (
                            <SunIcon className="fill-icon-color size-5" />
                        ) : (
                            <MoonIcon className="fill-icon-color size-5" />
                        )}
                    </div>
                </div>
            </label>
        </div>
    );
}
