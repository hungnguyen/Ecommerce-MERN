import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './features/dashboard/Dashboard.tsx'
import ProductPage from './features/product/ProductPage.tsx'
import SignIn from './features/SignIn.tsx'
import CategoryPage from './features/category/CategoryPage.tsx'
import ProductFilePage from './features/product/product_files/ProductFilePage.tsx'
import ProductPricePage from './features/product/product_prices/ProductPricePage.tsx'
import ProductReviewPage from './features/product/product_reviews/ProductReviewPage.tsx'
import CustomerPage from './features/customer/CustomerPage.tsx'
import OrderPage from './features/order/OrderPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/login",
    element: <SignIn />
  },
  {
    path: "/product",
    element: <ProductPage />,
    children: [{
      path: ":parent/file",
      element: <ProductFilePage />
    },{
      path: ":parent/price",
      element: <ProductPricePage />
    },{
      path: ":parent/review",
      element: <ProductReviewPage />
    }]
  },
  {
    path: "/category",
    element: <CategoryPage />
  },
  {
    path: "/customer",
    element: <CustomerPage />
  },
  {
    path: "/order",
    element: <OrderPage />
  }
])

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
