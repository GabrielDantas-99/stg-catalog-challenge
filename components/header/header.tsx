"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { searchCache } from "@/lib/cache"
import Link from "next/link"
import Image from "next/image"
import HeaderSearchBar from "./header-search-bar"
import HeaderDesktopActions from "./header-desktop-actions"
import HeaderMobileMenu from "./header-mobile-menu"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchCache.add(searchQuery.trim())
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/catalog" className="flex items-center space-x-2">
            <Image src={theme === "dark" ? "/sgt_store_logo.png" : "/sgt_store_logo_light.png"} width={180} height={60} alt={"Logo Sgt Store"} />
          </Link>

          {/* Barra de Pesquisa Desktop */}
          <HeaderSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          />

          {/* Ações Desktop */}
          <HeaderDesktopActions />

          {/* Botão Menu Mobile */}
          <div className="flex md:hidden items-center">
            <HeaderMobileMenu />
          </div>
        </div>

        {/* Barra de Pesquisa Mobile */}
        <div className="md:hidden pb-4">
          <HeaderSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </header>
  )
}