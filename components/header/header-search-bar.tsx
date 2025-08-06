"use client"

import { Search } from "lucide-react"
import { Input } from "../ui/input"

function HeaderSearchBar({ searchQuery, setSearchQuery, onSearch, className = "" }: {
    searchQuery: string
    setSearchQuery: (v: string) => void
    onSearch: (e: React.FormEvent) => void
    className?: string
}) {
    return (
        <form onSubmit={onSearch} className={className}>
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="search"
                    placeholder="O que você está procurando?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                />
            </div>
        </form>
    )
}

export default HeaderSearchBar;