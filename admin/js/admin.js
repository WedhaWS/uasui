// WSKICKS Admin Dashboard JavaScript

// Tab Management
document.addEventListener("DOMContentLoaded", () => {
  initializeAdmin()
})

function initializeAdmin() {
  // Initialize tab switching
  initTabSwitching()
  // Load dashboard data
  loadDashboardData()
  // Initialize table filters
  initTableFilters()
  // Initialize form handlers
  initFormHandlers()
}

// Tab Switching Functionality
function initTabSwitching() {
  const navItems = document.querySelectorAll(".nav-item")
  const tabContents = document.querySelectorAll(".tab-content")

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all nav items and tab contents
      navItems.forEach((nav) => nav.classList.remove("active"))
      tabContents.forEach((tab) => tab.classList.remove("active"))

      // Add active class to clicked nav item and corresponding tab
      this.classList.add("active")
      document.getElementById(`${targetTab}-tab`).classList.add("active")
    })
  })
}

// Dashboard Data Loading
function loadDashboardData() {
  // Simulate loading dashboard statistics
  setTimeout(() => {
    updateDashboardStats()
    loadRecentOrders()
    loadTopProducts()
  }, 500)
}

function updateDashboardStats() {
  // Simulate data from API
  const stats = {
    revenue: "Rp 125,000,000",
    orders: "1,247",
    customers: "892",
    products: "156",
  }

  document.getElementById("total-revenue").textContent = stats.revenue
  document.getElementById("total-orders").textContent = stats.orders
  document.getElementById("total-customers").textContent = stats.customers
  document.getElementById("total-products").textContent = stats.products

  // Add animation to stat cards
  animateStatCards()
}

function animateStatCards() {
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"

    setTimeout(() => {
      card.style.transition = "all 0.5s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)
  })
}

function loadRecentOrders() {
  const recentOrdersContainer = document.getElementById("recent-orders")
  const orders = [
    { id: "#12345", customer: "John Doe", amount: "Rp 2,500,000", status: "delivered" },
    { id: "#12346", customer: "Jane Smith", amount: "Rp 1,800,000", status: "processing" },
    { id: "#12347", customer: "Mike Johnson", amount: "Rp 3,200,000", status: "shipped" },
  ]

  let ordersHTML = '<div class="orders-list">'
  orders.forEach((order) => {
    ordersHTML += `
            <div class="order-item">
                <div class="order-info">
                    <strong>${order.id}</strong>
                    <span>${order.customer}</span>
                </div>
                <div class="order-details">
                    <span class="amount">${order.amount}</span>
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </div>
            </div>
        `
  })
  ordersHTML += "</div>"

  recentOrdersContainer.innerHTML = ordersHTML
}

function loadTopProducts() {
  const topProductsContainer = document.getElementById("top-products")
  const products = [
    { name: "Air Jordan 1 Retro", sales: 145, revenue: "Rp 45,000,000" },
    { name: "Nike Dunk Low", sales: 128, revenue: "Rp 32,000,000" },
    { name: "Adidas Yeezy 350", sales: 96, revenue: "Rp 48,000,000" },
  ]

  let productsHTML = '<div class="products-list">'
  products.forEach((product) => {
    productsHTML += `
            <div class="product-item">
                <div class="product-info">
                    <strong>${product.name}</strong>
                    <span>${product.sales} sales</span>
                </div>
                <div class="product-revenue">
                    ${product.revenue}
                </div>
            </div>
        `
  })
  productsHTML += "</div>"

  topProductsContainer.innerHTML = productsHTML
}

// Table Filters
function initTableFilters() {
  // Product search and filter
  const productSearch = document.getElementById("product-search")
  const categoryFilter = document.getElementById("category-filter")

  if (productSearch) {
    productSearch.addEventListener("input", debounce(filterProducts, 300))
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts)
  }

  // Order search and filter
  const orderSearch = document.getElementById("order-search")
  const orderStatusFilter = document.getElementById("order-status-filter")

  if (orderSearch) {
    orderSearch.addEventListener("input", debounce(filterOrders, 300))
  }

  if (orderStatusFilter) {
    orderStatusFilter.addEventListener("change", filterOrders)
  }

  // Load initial table data
  loadProductsTable()
  loadOrdersTable()
  loadCustomersTable()
  loadArticlesTable()
}

function filterProducts() {
  // Implement product filtering logic
  console.log("Filtering products...")
}

function filterOrders() {
  // Implement order filtering logic
  console.log("Filtering orders...")
}

function loadProductsTable() {
  const tableBody = document.getElementById("products-table-body")
  if (!tableBody) return

  const products = [
    {
      id: 1,
      image: "/api/placeholder/60/60",
      name: "Air Jordan 1 Retro High",
      category: "Basketball",
      price: "Rp 2,500,000",
      stock: 25,
      status: "active",
    },
    {
      id: 2,
      image: "/api/placeholder/60/60",
      name: "Nike Dunk Low Panda",
      category: "Lifestyle",
      price: "Rp 1,800,000",
      stock: 12,
      status: "active",
    },
  ]

  let tableHTML = ""
  products.forEach((product) => {
    tableHTML += `
            <tr>
                <td><img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;"></td>
                <td><strong>${product.name}</strong></td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><span class="status-badge status-${product.status}">${product.status}</span></td>
                <td>
                    <button class="btn btn-sm" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `
  })

  tableBody.innerHTML = tableHTML
}

function loadOrdersTable() {
  const tableBody = document.getElementById("orders-table-body")
  if (!tableBody) return

  const orders = [
    {
      id: "#12345",
      customer: "John Doe",
      date: "2024-01-15",
      total: "Rp 2,500,000",
      status: "delivered",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      date: "2024-01-14",
      total: "Rp 1,800,000",
      status: "processing",
    },
  ]

  let tableHTML = ""
  orders.forEach((order) => {
    tableHTML += `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>${order.total}</td>
                <td><span class="status-badge status-${order.status}">${order.status}</span></td>
                <td>
                    <button class="btn btn-sm" onclick="viewOrder('${order.id}')">View</button>
                    <button class="btn btn-sm" onclick="updateOrderStatus('${order.id}')">Update</button>
                </td>
            </tr>
        `
  })

  tableBody.innerHTML = tableHTML
}

function loadCustomersTable() {
  const tableBody = document.getElementById("customers-table-body")
  if (!tableBody) return

  const customers = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+62 812 3456 7890",
      orders: 5,
      totalSpent: "Rp 12,500,000",
      joined: "2023-06-15",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+62 813 4567 8901",
      orders: 3,
      totalSpent: "Rp 7,200,000",
      joined: "2023-08-22",
    },
  ]

  let tableHTML = ""
  customers.forEach((customer) => {
    tableHTML += `
            <tr>
                <td><strong>${customer.name}</strong></td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.orders}</td>
                <td>${customer.totalSpent}</td>
                <td>${customer.joined}</td>
                <td>
                    <button class="btn btn-sm" onclick="viewCustomer('${customer.email}')">View</button>
                    <button class="btn btn-sm" onclick="editCustomer('${customer.email}')">Edit</button>
                </td>
            </tr>
        `
  })

  tableBody.innerHTML = tableHTML
}

function loadArticlesTable() {
  const tableBody = document.getElementById("articles-table-body")
  if (!tableBody) return

  const articles = [
    {
      title: "History of Air Jordan",
      category: "History",
      author: "Admin",
      published: "2024-01-10",
      views: 1250,
      status: "published",
    },
    {
      title: "How to Clean Your Sneakers",
      category: "Care",
      author: "Admin",
      published: "2024-01-08",
      views: 890,
      status: "published",
    },
  ]

  let tableHTML = ""
  articles.forEach((article) => {
    tableHTML += `
            <tr>
                <td><strong>${article.title}</strong></td>
                <td>${article.category}</td>
                <td>${article.author}</td>
                <td>${article.published}</td>
                <td>${article.views}</td>
                <td><span class="status-badge status-${article.status}">${article.status}</span></td>
                <td>
                    <button class="btn btn-sm" onclick="editArticle('${article.title}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteArticle('${article.title}')">Delete</button>
                </td>
            </tr>
        `
  })

  tableBody.innerHTML = tableHTML
}

// Form Handlers
function initFormHandlers() {
  const generalSettingsForm = document.getElementById("general-settings-form")
  const emailSettingsForm = document.getElementById("email-settings-form")

  if (generalSettingsForm) {
    generalSettingsForm.addEventListener("submit", handleGeneralSettings)
  }

  if (emailSettingsForm) {
    emailSettingsForm.addEventListener("submit", handleEmailSettings)
  }
}

function handleGeneralSettings(e) {
  e.preventDefault()
  // Handle general settings form submission
  showNotification("General settings saved successfully!", "success")
}

function handleEmailSettings(e) {
  e.preventDefault()
  // Handle email settings form submission
  showNotification("Email settings saved successfully!", "success")
}

// Modal Functions
function showAddProductModal() {
  showNotification("Add Product modal would open here", "info")
}

function showAddArticleModal() {
  showNotification("Add Article modal would open here", "info")
}

// CRUD Functions
function editProduct(id) {
  showNotification(`Edit product ${id}`, "info")
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    showNotification(`Product ${id} deleted`, "success")
  }
}

function viewOrder(id) {
  showNotification(`View order ${id}`, "info")
}

function updateOrderStatus(id) {
  showNotification(`Update status for order ${id}`, "info")
}

function viewCustomer(email) {
  showNotification(`View customer ${email}`, "info")
}

function editCustomer(email) {
  showNotification(`Edit customer ${email}`, "info")
}

function editArticle(title) {
  showNotification(`Edit article: ${title}`, "info")
}

function deleteArticle(title) {
  if (confirm("Are you sure you want to delete this article?")) {
    showNotification(`Article deleted: ${title}`, "success")
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    backgroundColor: type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#6366f1",
    color: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: "9999",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  })

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    // Implement logout logic
    window.location.href = "../login.html"
  }
}
