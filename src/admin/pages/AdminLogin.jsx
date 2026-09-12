import { useState } from "react";
import {
  LockKeyhole,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";

const API_URL =
  "https://lumiere-restaurant-1dgb.onrender.com/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Invalid email or password."
        );
      }

      if (!data.token) {
        throw new Error(
          "Login successful, but no authentication token was received."
        );
      }

      // Save authentication data
      localStorage.setItem(
        "adminToken",
        data.token
      );

      if (data.data) {
        localStorage.setItem(
          "adminData",
          JSON.stringify(data.data)
        );
      }

      // Redirect to admin dashboard
      window.location.href = "/admin";
    } catch (err) {
      console.error(
        "Admin login error:",
        err
      );

      setError(
        err.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-5 py-10 text-white">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md">

          {/* =========================
              BRAND
          ========================= */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6ad60]/50 bg-[#d6ad60]/10">
              <span className="font-serif text-2xl text-[#e8c982]">
                L
              </span>
            </div>

            <h1 className="font-serif text-3xl tracking-[0.15em] text-[#f5dfaa]">
              LUMIÈRE
            </h1>

            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">
              Admin Panel
            </p>
          </div>

          {/* =========================
              LOGIN CARD
          ========================= */}
          <div className="rounded-3xl border border-white/10 bg-[#121212] p-7 shadow-2xl sm:p-9">

            <div className="mb-8">
              <h2 className="font-serif text-2xl text-white">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-white/45">
                Sign in to manage your restaurant.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* =========================
                  EMAIL
              ========================= */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    strokeWidth={1.5}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="admin@lumiere.com"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/60 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* =========================
                  PASSWORD
              ========================= */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    strokeWidth={1.5}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/60 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* =========================
                  ERROR
              ========================= */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-400">
                  {error}
                </div>
              )}

              {/* =========================
                  SUBMIT
              ========================= */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#d6ad60] py-3.5 text-sm font-semibold text-[#0d0d0d] transition duration-300 hover:bg-[#e8c982] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* =========================
              FOOTER
          ========================= */}
          <p className="mt-6 text-center text-xs text-white/25">
            Lumière Restaurant · Admin Portal
          </p>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;