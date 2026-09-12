import { useEffect, useState } from "react";
import {
  Save,
  Store,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/restaurant";

const initialForm = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  openingHours: "",
  logo: "",
  coverImage: "",
};

function RestaurantSettings() {
  const [form, setForm] = useState(initialForm);
  const [restaurantId, setRestaurantId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==================================================
  // FETCH RESTAURANT SETTINGS
  // ==================================================

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load restaurant settings"
        );
      }

      // Backend response:
      // {
      //   success: true,
      //   data: { ...restaurant }
      // }

      const restaurant = result.data;

      if (!restaurant) {
        throw new Error("Restaurant settings not found");
      }

      setRestaurantId(restaurant.id);

      setForm({
        name: restaurant.name || "",
        description: restaurant.description || "",
        address: restaurant.address || "",
        phone: restaurant.phone || "",
        email: restaurant.email || "",
        openingHours: restaurant.openingHours || "",
        logo: restaurant.logo || "",
        coverImage: restaurant.coverImage || "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load restaurant settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  // ==================================================
  // HANDLE INPUT CHANGE
  // ==================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");

    if (error) {
      setError("");
    }
  };

  // ==================================================
  // SAVE RESTAURANT SETTINGS
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Restaurant name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      // Existing restaurant = PUT
      // No restaurant = POST

      const method = restaurantId ? "PUT" : "POST";

      const url = restaurantId
        ? `${API_URL}/${restaurantId}`
        : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim() || null,
          address: form.address.trim() || null,
          phone: form.phone.trim() || null,
          email: form.email.trim() || null,
          openingHours:
            form.openingHours.trim() || null,
          logo: form.logo.trim() || null,
          coverImage:
            form.coverImage.trim() || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to save restaurant settings"
        );
      }

      // Backend response:
      // {
      //   success: true,
      //   data: { ...restaurant }
      // }

      const restaurant = result.data;

      if (restaurant?.id) {
        setRestaurantId(restaurant.id);
      }

      if (restaurant) {
        setForm({
          name: restaurant.name || "",
          description: restaurant.description || "",
          address: restaurant.address || "",
          phone: restaurant.phone || "",
          email: restaurant.email || "",
          openingHours: restaurant.openingHours || "",
          logo: restaurant.logo || "",
          coverImage: restaurant.coverImage || "",
        });
      }

      setSuccess(
        result.message ||
          "Restaurant settings updated successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to save restaurant settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // LOADING STATE
  // ==================================================

  if (loading) {
    return (
      <div className="flex min-h-125items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d6ad60]" />

          <p className="text-sm text-white/40">
            Loading restaurant settings...
          </p>
        </div>
      </div>
    );
  }

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#d6ad60]">
          Restaurant Configuration
        </p>

        <h1 className="font-serif text-3xl text-white sm:text-4xl">
          Restaurant Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-white/45">
          Manage your restaurant information displayed
          across the public website.
        </p>
      </div>

      {/* ==================================================
          ERROR MESSAGE
      ================================================== */}

      {error && (
        <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* ==================================================
          SUCCESS MESSAGE
      ================================================== */}

      {success && (
        <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ==================================================
              BASIC INFORMATION
          ================================================== */}

          <div className="xl:col-span-2">
            <div className="rounded-xl border border-white/10 bg-[#111111]">

              <div className="border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                    <Store
                      size={18}
                      className="text-[#d6ad60]"
                    />
                  </div>

                  <div>
                    <h2 className="text-base font-medium text-white">
                      Basic Information
                    </h2>

                    <p className="mt-1 text-xs text-white/35">
                      General information about your restaurant.
                    </p>
                  </div>

                </div>
              </div>

              <div className="space-y-5 p-6">

                {/* RESTAURANT NAME */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Restaurant Name
                    <span className="ml-1 text-red-400">
                      *
                    </span>
                  </label>

                  <div className="relative">

                    <Store
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Lumière Restaurant"
                      className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0d0d] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                    />

                  </div>
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Description
                  </label>

                  <div className="relative">

                    <FileText
                      size={17}
                      className="absolute left-4 top-4 text-white/25"
                    />

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell customers about your restaurant..."
                      className="w-full resize-none rounded-lg border border-white/10 bg-[#0d0d0d] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                    />

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ==================================================
              CONTACT INFORMATION
          ================================================== */}

          <div>
            <div className="rounded-xl border border-white/10 bg-[#111111]">

              <div className="border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                    <Phone
                      size={18}
                      className="text-[#d6ad60]"
                    />
                  </div>

                  <div>
                    <h2 className="text-base font-medium text-white">
                      Contact
                    </h2>

                    <p className="mt-1 text-xs text-white/35">
                      Customer contact details.
                    </p>
                  </div>

                </div>
              </div>

              <div className="space-y-5 p-6">

                {/* PHONE */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Phone
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXXXXXXXX"
                      className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0d0d] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                    />

                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@lumiere.com"
                      className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0d0d] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                    />

                  </div>
                </div>

                {/* ADDRESS */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Address
                  </label>

                  <div className="relative">

                    <MapPin
                      size={17}
                      className="absolute left-4 top-3.5 text-white/25"
                    />

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Restaurant address..."
                      className="w-full resize-none rounded-lg border border-white/10 bg-[#0d0d0d] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                    />

                  </div>
                </div>

                {/* OPENING HOURS */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Opening Hours
                  </label>

                  <div className="relative">

                    <Clock3
                      size={17}
                      className="absolute left-4 top-3.5 text-white/25"
                    />

                    <textarea
                      name="openingHours"
                      value={form.openingHours}
                      onChange={handleChange}
                      rows={4}
                      placeholder={`Mon - Thu: 10:00 AM - 10:00 PM
Fri - Sun: 10:00 AM - 11:00 PM`}
                      className="w-full resize-none rounded-lg border border-white/10 bg-[#0d0d0d] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                    />

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ==================================================
              BRANDING
          ================================================== */}

          <div className="xl:col-span-3">
            <div className="rounded-xl border border-white/10 bg-[#111111]">

              <div className="border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                    <ImageIcon
                      size={18}
                      className="text-[#d6ad60]"
                    />
                  </div>

                  <div>
                    <h2 className="text-base font-medium text-white">
                      Branding & Images
                    </h2>

                    <p className="mt-1 text-xs text-white/35">
                      Add your restaurant logo and cover image.
                    </p>
                  </div>

                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

                {/* LOGO */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Logo URL
                  </label>

                  <input
                    type="url"
                    name="logo"
                    value={form.logo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                  />

                  {form.logo.trim() && (
                    <div className="mt-4 flex h-32 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] p-4">

                      <img
                        src={form.logo}
                        alt="Restaurant logo preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    </div>
                  )}
                </div>

                {/* COVER IMAGE */}

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/65">
                    Cover Image URL
                  </label>

                  <input
                    type="url"
                    name="coverImage"
                    value={form.coverImage}
                    onChange={handleChange}
                    placeholder="https://example.com/cover.jpg"
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                  />

                  {form.coverImage.trim() && (
                    <div className="mt-4 aspect-16/7 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">

                      <img
                        src={form.coverImage}
                        alt="Restaurant cover preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ==================================================
            SAVE BUTTON
        ================================================== */}

        <div className="mt-6 flex justify-end">

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d6ad60] px-6 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Settings
              </>
            )}

          </button>

        </div>

      </form>
    </div>
  );
}

export default RestaurantSettings;