/**
 * API Service for TDG Frontend
 * Handles all API calls to the backend
 */

// Get API base URL from environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.webadmin.tdgoverview.cloud/api"

/**
 * Fetch media items by section
 * @param {string} section - Section name: 'news', 'references', or 'events'
 * @returns {Promise<Array>} Array of media items
 */
export async function fetchMediaItems(section) {
  try {
    const response = await fetch(`${API_BASE_URL}/media/${section}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${section}: ${response.statusText}`)
    }

    const data = await response.json()

    // Handle structured response format
    if (data.success && data.data) {
      return data.data.items || data.data || []
    } else if (data.data) {
      return data.data.items || data.data || []
    } else if (Array.isArray(data)) {
      return data
    } else {
      return []
    }
  } catch (error) {
    console.error(`Error fetching ${section}:`, error)
    // Return empty array on error to prevent breaking the UI
    return []
  }
}

/**
 * Fetch all media sections at once
 * @returns {Promise<Object>} Object with news, references, and events arrays
 */
export async function fetchAllMediaSections() {
  try {
    const [news, references, events] = await Promise.all([
      fetchMediaItems("news"),
      fetchMediaItems("references"),
      fetchMediaItems("events"),
    ])

    return {
      news,
      references,
      events,
    }
  } catch (error) {
    console.error("Error fetching all media sections:", error)
    return {
      news: [],
      references: [],
      events: [],
    }
  }
}

/**
 * Fetch all career job postings
 * @returns {Promise<Array>} Array of job postings
 */
export async function fetchCareers() {
  try {
    const response = await fetch(`${API_BASE_URL}/careers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch careers: ${response.statusText}`)
    }

    const data = await response.json()

    // Handle structured response format
    if (data.success && data.data) {
      return Array.isArray(data.data) ? data.data : []
    } else if (Array.isArray(data)) {
      return data
    } else if (data.data && Array.isArray(data.data)) {
      return data.data
    } else {
      return []
    }
  } catch (error) {
    console.error("Error fetching careers:", error)
    // Return empty array on error to prevent breaking the UI
    return []
  }
}

/**
 * Fetch all products
 * @param {Object} filters - Optional filters: { category, section }
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProducts(filters = {}) {
  try {
    const queryParams = new URLSearchParams()
    if (filters.category) queryParams.append("category", filters.category)
    if (filters.section) queryParams.append("section", filters.section)

    const url = `${API_BASE_URL}/products${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const data = await response.json()

    // Handle structured response format
    if (data.success && data.data) {
      return Array.isArray(data.data) ? data.data : []
    } else if (Array.isArray(data)) {
      return data
    } else if (data.data && Array.isArray(data.data)) {
      return data.data
    } else {
      return []
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return empty array on error to prevent breaking the UI
    return []
  }
}

/**
 * Fetch a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object|null>} Product object or null
 */
export async function fetchProductById(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const data = await response.json()

    // Handle structured response format
    if (data.success && data.data) {
      return data.data
    } else if (data.data) {
      return data.data
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

/**
 * Group products by category for display
 * @param {Array} products - Array of products from API
 * @returns {Object} Products grouped by category
 */
export function groupProductsByCategory(products) {
  const grouped = {}

  products.forEach((product) => {
    const category = product.category || "Others"
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(product)
  })

  return grouped
}

/**
 * Fetch all certificates
 * @returns {Promise<Array>} Array of certificates
 */
export async function fetchCertificates() {
  try {
    const response = await fetch(`${API_BASE_URL}/certificates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch certificates: ${response.statusText}`)
    }

    const data = await response.json()

    // Handle structured response format
    if (data.success && data.data) {
      return Array.isArray(data.data) ? data.data : []
    } else if (Array.isArray(data)) {
      return data
    } else if (data.data && Array.isArray(data.data)) {
      return data.data
    } else {
      return []
    }
  } catch (error) {
    console.error("Error fetching certificates:", error)
    // Return empty array on error to prevent breaking the UI
    return []
  }
}
