// Reuse your existing fetch logic in a reusable function
export async function fetchOpenLibraryData() {
    try {
      const response = await fetch("https://openlibrary.org/subjects/history.json?details=true")
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching Open Library data:", error)
      throw new Error("Failed to fetch Open Library data")
    }
  }
  
  