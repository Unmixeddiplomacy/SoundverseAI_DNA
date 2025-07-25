"use client";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Hamburger button: shown on tablet/mobile only */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-[#000000] rounded-lg flex items-center justify-center border border-[#383838]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-col gap-1">
                    <div
                        className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-transform ${
                            isOpen ? "rotate-45 translate-y-1.5" : ""
                        }`}
                    ></div>
                    <div
                        className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-opacity ${
                            isOpen ? "opacity-0" : ""
                        }`}
                    ></div>
                    <div
                        className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-transform ${
                            isOpen ? "-rotate-45 -translate-y-1.5" : ""
                        }`}
                    ></div>
                </div>
            </button>

            {/* Mobile/Tablet overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:static top-0 left-0 h-full bg-[#000000] flex flex-col items-center py-1 px-2 z-50
                    transition-transform duration-300 border-r border-[#383838]
                    w-16 sm:w-20 md:w-24 lg:w-[70px]
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
                `}
            >
                {/* Top logo */}
                <div className="flex flex-col items-center">
                    <div className="mb-4 sm:mb-5.5 mt-2">
                        <img
                            src="/logo.svg"
                            alt="logo"
                            className="w-[40px] h-[35px] sm:w-[45px] sm:h-[40px] md:w-[50px] md:h-[45px] lg:w-[53px] lg:h-[47px]"
                        />
                    </div>
                </div>

                {/* Middle navigation */}
                <div className="flex flex-col items-center gap-y-3 sm:gap-y-4">
                    <SideBarIcon href="/add" imgSrc="/add.svg" alt="add" label="Add" />
                    <SideBarIcon href="/" imgSrc="/home.svg" alt="home" label="Home" />
                    <SideBarIcon
                        href="/explore"
                        imgSrc="/explore.svg"
                        alt="explore"
                        label="Explore"
                    />
                    <SideBarIcon
                        href="/artists"
                        imgSrc="/lib.svg"
                        alt="library"
                        label="Library"
                        extraClass="mb-1 sm:mb-2"
                    />
                </div>

                {/* Bottom DNA button */}
                <div className="w-[45px] h-[35px] sm:w-[50px] sm:h-[38px] md:w-[52px] md:h-[40px] lg:w-[54px] lg:h-[43px] bg-[#1C1E1F] font-bold text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] text-white flex items-center justify-center rounded-[8px] sm:rounded-[9px] md:rounded-[10px] lg:rounded-[11px] mt-3 sm:mt-4">
                    <span>DNA</span>
                </div>
            </div>
        </>
    )
}

function SideBarIcon({ href, imgSrc, alt, label, extraClass = "" }: { href: string; imgSrc: string; alt: string; label: string; extraClass?: string }) {
    return (
        <Link href={href} className={`group relative flex items-center justify-center ${extraClass}`}>
            <img
                src={imgSrc}
                alt={alt}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-auto lg:h-auto"
            />
            {/* Tooltip for large screen */}
            <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200 pointer-events-none">
                {/* Tooltip Arrow */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0,8 16,0 16,16" fill="#6A38D9" className="drop-shadow-lg" />
                    </svg>
                </div>
                <div className="relative bg-gradient-to-r from-[#6A38D9]/90 to-[#8F6FFF]/90 p-[2.5px] rounded-xl shadow-xl">
                    <div className="relative bg-[#1F1F1F]/90 backdrop-blur-md rounded-lg px-3 py-2 text-white text-base font-extrabold border-2 border-[#8F6FFF] min-w-[70px] text-center drop-shadow-lg shadow-lg animate-pulse group-hover:animate-none">
                        {label}
                    </div>
                </div>
            </div>
        </Link>
    );
}