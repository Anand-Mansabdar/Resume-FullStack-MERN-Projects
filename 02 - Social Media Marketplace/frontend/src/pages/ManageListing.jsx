import { Loader2Icon, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ManageListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userListings } = useSelector((state) => state.listing);

  // State variables
  const [loadingListing, setLoadingListing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    username: "",
    followers_count: "",
    engagement_rate: "",
    monthly_views: "",
    niche: "",
    price: "",
    description: "",
    verified: "",
    monetized: "",
    country: "",
    age_range: "",
    images: [],
  });

  const platforms = [
    "youtube",
    "instagram",
    "tiktok",
    "facebook",
    "twitter",
    "linkedin",
    "pinterest",
    "snapchat",
    "twitch",
    "discord",
  ];

  const niches = [
    "lifestyle",
    "fitness",
    "food",
    "travel",
    "tech",
    "gaming",
    "fashion",
    "beauty",
    "business",
    "education",
    "entertainment",
    "music",
    "art",
    "sports",
    "health",
    "finance",
    "other",
  ];

  const ageRange = [
    "13-17 years",
    "18-24 years",
    "25-34 years",
    "35-44 years",
    "45-54 years",
    "55+ years",
    "Mixed ages",
  ];

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    if (files.length + formData.images.length > 5)
      return toast.error("You can add upto 5 images");

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Get listing data for editing if 'id' is provided
  useEffect(() => {
    if (!id) return;
    setIsEditing(true);
    setLoadingListing(true);
    const listing = userListings.find((listing) => listing.id === id);

    if (listing) {
      setFormData(listing);
      setLoadingListing(false);
    } else {
      toast.error("Listing not found");
      navigate("/my-listings");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loadingListing) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2Icon className="size-7 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto sm:p-6 lg:px-8 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">
            {isEditing ? "Edit Listing" : "List your account"}
          </h1>

          <p className="text-neutral-600 mt-2">
            {isEditing
              ? "Update your existing account listing"
              : "Create a mock listing to display your account info"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* BASIC INFORMATION - Listing title, platform etc */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Listing Title *"
                value={formData.title}
                placeholder="example., Premium Travel Instagram Account"
                onChange={(v) => handleInputChange("title", v)}
                required={true}
              />
              <SelectField
                label="Platform"
                options={platforms}
                value={formData.platform}
                onChange={(e) => handleInputChange("platform", e)}
                required={true}
              />

              <InputField
                label="Username/Handle *"
                value={formData.username}
                placeholder="@username"
                onChange={(v) => handleInputChange("username", v)}
                required={true}
              />

              <SelectField
                label="Niche/Category"
                options={niches}
                value={formData.niche}
                onChange={(e) => handleInputChange("niche", e)}
                required={true}
              />
            </div>
          </Section>

          {/* Metrics Section */}
          <Section title="Account Metrics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <InputField
                label="Followers Count *"
                type="number"
                min={0}
                value={formData.followers_count}
                placeholder="eg 10K"
                onChange={(v) => handleInputChange("followers_count", v)}
                required={true}
              />

              <InputField
                label="Engagement Rate (%)"
                type="number"
                min={0}
                max={100}
                value={formData.engagement_rate}
                placeholder="4"
                onChange={(v) => handleInputChange("engagement_rate", v)}
              />

              <InputField
                label="Monthly Views/Impression"
                type="number"
                min={0}
                value={formData.monthly_views}
                placeholder="100000"
                onChange={(v) => handleInputChange("monthly_views", v)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField
                label="Majority Audience Country"
                value={formData.country}
                placeholder="eg., India, USA"
                onChange={(v) => handleInputChange("country", v)}
              />

              <SelectField
                label="Audience Age Range"
                options={ageRange}
                value={formData.age_range}
                onChange={(e) => handleInputChange("age_range", e)}
              />
            </div>

            <div className="space-y-3">
              <CheckboxField
                label="Account is verified on the platform"
                checked={formData.verified}
                onChange={(v) => handleInputChange("verified", v)}
              />
              <CheckboxField
                label="Account is monetized on the platform"
                checked={formData.monetized}
                onChange={(v) => handleInputChange("monetized", v)}
              />
            </div>
          </Section>

          {/* Pricing Section */}
          <Section title="Pricing and Description">
            <InputField
              label="Asking Price (USD) *"
              value={formData.price}
              type="number"
              min={0}
              placeholder="100.00"
              onChange={(v) => handleInputChange("price", v)}
              required={true}
            />

            <TextareaField
              label="Description *"
              value={formData.description}
              onChange={(v) => handleInputChange("description", v)}
              required={true}
            />
          </Section>

          {/* Images Uploading Section */}
          <Section title="Screenshots and Proofs">
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-12 h-1/2 text-neutral-400 mx-auto mb-4" />
              <label
                htmlFor="images"
                className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Choose File
              </label>
              <p className="text-sm text-neutral-500 mt-8">
                Upload screenshots or proof of account analytics.
              </p>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div className="relative" key={index}>
                    <img
                      className="w-full h-24 object-cover rounded-lg"
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt={`Image ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute text-center -top-2 flex items-center justify-center -right-2 size-6 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <div className="flex justify-end gap-3 text-sm">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? "Update Listing" : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
    <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
    {children}
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min = null,
  max = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      min={min}
      max={max}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-1.5 text-neutral-600 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
      required={required}
    />
  </div>
);

const SelectField = ({ label, options, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-1.5 text-neutral-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
      required={required}
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ label, checked, onChange, required = false }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      className="size-4"
      type="checkbox"
      checked={checked}
      required={required}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="text-sm text-neutral-700">{label}</span>
  </label>
);

const TextareaField = ({ label, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-1.5 text-neutral-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 border-gray-300"
      required={required}
    />
  </div>
);

export default ManageListing;
