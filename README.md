# Devphant Assignment (Next.js)

This assignment demonstrates form handling, schema validation, local storage persistence, and reusable component design.

---

## ✨ Features

### 📝 Product Creation
- Add complete product details:
  - Title, category, sub-category
  - Description
  - Pricing (MRP, Offer %, auto-calculated Selling Price)
  - Seller & stock details
  - Variants (size / color combinations with bulk edit)
  - Tags, material & weight
- Image upload with live preview (client-side)

### ✅ Form Validation
- **Zod schema validation**
- Inline error messages
- Save button disabled until form is valid
- Two-way price calculation (MRP ↔ Offer)

### 💾 Local Storage Persistence
- Products saved to `localStorage`
- Each product includes:
  - Unique ID
  - Created timestamp
- Data persists across refresh

### 📦 Product Listing Page
- Responsive grid layout
- Displays:
  - Product title & category
  - Price, discount & stock
  - Tags
  - Created date
- Empty state when no products exist
- Navigation back to Add Product page

### 🔔 UX Enhancements
- Toast notifications on save
- Reusable `Card` component
- Proper disabled & loading states

---

## 🧱 Tech Stack

- **Next.js 16 (App Router)**
- **React + TypeScript**
- **React Hook Form**
- **Zod**
- **Tailwind CSS**
- **react-hot-toast**
- **LocalStorage API**

---

## 🚀 Getting Started


### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd project-folder
