import React, { createContext, useContext, useState, ReactNode } from "react";

interface PaginationContextType {
    currentPage: number
    setCurrentPage: (currentPage: number) => void
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined)

export const usePagination = (): PaginationContextType => {
    const context = useContext(PaginationContext)
    if (!context) {
        throw new Error("usePagination must be used within a PaginationProvider")
    }
    return context
}

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return(
        <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PaginationContext.Provider>
    )
}