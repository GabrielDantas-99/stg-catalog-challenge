"use client"

import Image from "next/image"
import { ReactNode } from "react"

export default function AuthWrapper({ children, title, subtitle }: { children: ReactNode, title: string, subtitle: string }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#155dfb] via-[#667eea] to-[#764ba2] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating geometric shapes */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-2xl rotate-12 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
                <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/10 rounded-lg rotate-45"></div>
                <div className="absolute bottom-20 right-32 w-24 h-24 bg-white/5 rounded-2xl -rotate-12"></div>
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                {/* Logo centralizada acima do conteúdo */}
                <div className="flex justify-center mt-14">
                    <Image src={"/sgt_store_logo.png"} width={260} height={40} alt={"Logo SGT Store"} priority />
                </div>

                <div className="flex flex-1">
                    {/* Left Side - Illustration */}
                    <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                        <div className="max-w-lg">
                            {/* 3D Isometric Illustration */}
                            <div className="relative">
                                {/* Main illustration container */}
                                <div className="relative w-full h-96 mb-8">
                                    {/* Background elements */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl  border border-white/20"></div>
                                    {/* Floating cards and elements */}
                                    <div className="absolute top-8 left-8 w-24 h-16 bg-gradient-to-r from-[#155dfb] to-[#667eea] rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                                        {/* Shield icon */}
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    </div>
                                    <div className="absolute top-12 right-12 w-20 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transform -rotate-6 flex items-center justify-center">
                                        {/* Zap icon */}
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z"></path></svg>
                                    </div>
                                    <div className="absolute bottom-16 left-12 w-28 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg transform rotate-6 flex items-center justify-center">
                                        {/* Globe icon */}
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"></path></svg>
                                    </div>
                                    <div className="absolute bottom-12 right-8 w-22 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg shadow-lg transform -rotate-12 flex items-center justify-center">
                                        {/* Smartphone icon */}
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect width="16" height="22" x="4" y="1" rx="2"></rect><path d="M12 17h.01"></path></svg>
                                    </div>
                                    {/* Central figure */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-32 h-32 bg-gradient-to-br from-[#155dfb] to-[#667eea] rounded-full flex items-center justify-center shadow-2xl">
                                            {/* User icon */}
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21a8.38 8.38 0 0113 0"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                {/* Text content */}
                                <div className="text-center text-white">
                                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                                    <p className="text-lg opacity-90 leading-relaxed">{subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Side - Auth Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 pt-0">
                        <div className="w-full max-w-md">
                            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}