// Create a new context file to manage state selection globally

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the context type
type StateContextType = {
  selectedStates: string[]
  setSelectedStates: (states: string[]) => void
}

// Create the context with default values
const StateContext = createContext<StateContextType>({
  selectedStates: ["CA", "FL", "TX", "NY", "OH"],
  setSelectedStates: () => {},
})

// Provider component
export function StateProvider({ children }: { children: ReactNode }) {
  // Initialize with default states
  const [selectedStates, setSelectedStates] = useState<string[]>(["CA", "FL", "TX", "NY", "OH"])

  // You could add persistence here with localStorage or cookies
  useEffect(() => {
    // Optional: Load from localStorage
    try {
      const savedStates = localStorage.getItem("selectedStates")
      if (savedStates) {
        setSelectedStates(JSON.parse(savedStates))
      }
    } catch (error) {
      console.error("Error loading states from localStorage:", error)
    }
  }, [])

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("selectedStates", JSON.stringify(selectedStates))
    } catch (error) {
      console.error("Error saving states to localStorage:", error)
    }
  }, [selectedStates])

  return <StateContext.Provider value={{ selectedStates, setSelectedStates }}>{children}</StateContext.Provider>
}

// Custom hook to use the state context
export function useStateContext() {
  const context = useContext(StateContext)

  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider")
  }
  return context
}
