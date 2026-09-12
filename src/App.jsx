import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Layout
import MainLayout from "./layouts/MainLayout";

// Public Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import Foods from "./admin/pages/Foods";
import Categories from "./admin/pages/Categories";
import AdminReviews from "./admin/pages/Reviews";
import AdminGallery from "./admin/pages/Gallery";
import RestaurantSettings from "./admin/pages/RestaurantSettings";

// Admin Components
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== PUBLIC WEBSITE ==================== */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ==================== ADMIN LOGIN ==================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ==================== PROTECTED ADMIN PANEL ==================== */}

        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/foods" element={<Foods />} />
            <Route
              path="/admin/categories"
              element={<Categories />}
            />
            <Route
              path="/admin/reviews"
              element={<AdminReviews />}
            />
            <Route
              path="/admin/gallery"
              element={<AdminGallery />}
            />
            <Route
              path="/admin/settings"
              element={<RestaurantSettings />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;