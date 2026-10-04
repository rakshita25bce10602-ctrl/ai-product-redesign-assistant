import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Droplet, 
  Armchair, 
  Shield, 
  Briefcase, 
  Box, 
  Utensils, 
  Smartphone, 
  Package,
  Check,
  AlertCircle,
  ArrowRight,
  X,
  Image as ImageIcon
} from 'lucide-react';

const CATEGORIES = [
  { id: "Water Bottle", name: "Water Bottle", icon: Droplet, sample: "Single-Use Plastic Water Bottle" },
  { id: "Chair", name: "Chair / Seating", icon: Armchair, sample: "Ergonomic Office Task Chair" },
  { id: "Helmet", name: "Helmet / Safety Gear", icon: Shield, sample: "Urban Commuter Bike Helmet" },
  { id: "Bag", name: "Bag / Backpack", icon: Briefcase, sample: "Daily Laptop Commuter Bag" },
  { id: "Packaging", name: "Packaging / Box", icon: Box, sample: "E-Commerce Corrugated Shipping Box" },
  { id: "Container", name: "Food Container", icon: Utensils, sample: "Plastic Food Storage Container" },
  { id: "Phone Stand", name: "Phone Stand", icon: Smartphone, sample: "Adjustable Desk Smartphone Stand" },
  { id: "Other", name: "Other Physical Product", icon: Package, sample: "Custom Consumer Hardware" }
];

const USER_PROFILES = [
  { 
    id: "Students", 
    name: "Students", 
    icon: "🎓", 
    desc: "Lightweight, low cost, leak-proof, easy backpack fit.", 
    defaultPriorities: ["Portability", "Affordability", "Durability", "Safety"] 
  },
  { 
    id: "Office Workers", 
    name: "Office Workers", 
    icon: "💼", 
    desc: "One-hand operation, temperature retention, desk-friendly.", 
    defaultPriorities: ["Comfort", "Functionality", "Appearance", "Hygiene"] 
  },
  { 
    id: "Fitness & Sports Users", 
    name: "Fitness & Sports Users", 
    icon: "⚡", 
    desc: "Ergonomic grip, quick-sip spout, volume markings, high flow.", 
    defaultPriorities: ["Comfort", "Durability", "Functionality", "Portability"] 
  },
  { 
    id: "Travellers & Commuters", 
    name: "Travellers & Commuters", 
    icon: "✈️", 
    desc: "Secure sealing, carry handle, cupholder fit, impact durability.", 
    defaultPriorities: ["Portability", "Durability", "Safety", "Functionality"] 
  },
  { 
    id: "Families & Children", 
    name: "Families & Children", 
    icon: "👨‍👩‍👧‍👦", 
    desc: "100% BPA-free, soft bite valve, easy cleaning, safe rounded edges.", 
    defaultPriorities: ["Safety", "Hygiene", "Durability", "Sustainability"] 
  }
];

const PRIORITIES = [
  { id: "Comfort", label: "Comfort & Ergonomics" },
  { id: "Portability", label: "Portability & Transit" },
  { id: "Durability", label: "Durability & Longevity" },
  { id: "Sustainability", label: "Sustainability & Eco-Friendliness" },
  { id: "Affordability", label: "Affordability & Low Cost" },
  { id: "Safety", label: "Safety & Non-Toxicity" },
  { id: "Appearance", label: "Appearance & Style" },
  { id: "Functionality", label: "Functionality & Performance" },
  { id: "Hygiene", label: "Hygiene & Easy Cleaning" }
];

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

export default function ProductInputPage({ onSubmit, isLoading, apiStatus }) {
  const [productName, setProductName] = useState("Standard Plastic Water Bottle");
  const [category, setCategory] = useState("Water Bottle");
  const [targetUser, setTargetUser] = useState("Fitness & Sports Users");
  const [selectedPriorities, setSelectedPriorities] = useState([
    "Comfort",
    "Portability",
    "Sustainability",
    "Durability",
    "Hygiene"
  ]);
  const [userProblems, setUserProblems] = useState(
    "Slippery when sweaty, flimsy disposable cap, leaks inside gym bag, difficult to clean narrow neck."
  );

  // Image Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("demo-bottle.svg");
  const [imagePreview, setImagePreview] = useState("/demo-bottle.svg");
  const [imageBase64, setImageBase64] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const fileInputRef = useRef(null);

  // Handle User profile switch & auto-suggest priorities
  const handleSelectProfile = (profile) => {
    setTargetUser(profile.id);
    setSelectedPriorities(profile.defaultPriorities);
  };

  // Toggle priority selection
  const togglePriority = (pId) => {
    if (selectedPriorities.includes(pId)) {
      if (selectedPriorities.length > 1) {
        setSelectedPriorities(selectedPriorities.filter(p => p !== pId));
      }
    } else {
      setSelectedPriorities([...selectedPriorities, pId]);
    }
  };

  // Preset demo loaders
  const loadPreset = (presetType) => {
    setValidationError("");
    setImageError("");
    if (presetType === 'bottle') {
      setProductName("Single-Use Plastic Water Bottle");
      setCategory("Water Bottle");
      setTargetUser("Fitness & Sports Users");
      setSelectedPriorities(["Comfort", "Portability", "Sustainability", "Durability", "Hygiene"]);
      setUserProblems("Slippery when hands are sweaty, cap leaks when tipped in backpack, narrow mouth is impossible to wash with a sponge, single-use plastic waste.");
      setImagePreview("/demo-bottle.svg");
      setImageFileName("demo-bottle.svg");
      setImageFile(null);
      setImageBase64(null);
    } else if (presetType === 'chair') {
      setProductName("Basic Office Task Chair");
      setCategory("Chair");
      setTargetUser("Office Workers");
      setSelectedPriorities(["Comfort", "Durability", "Sustainability", "Appearance"]);
      setUserProblems("Lack of adjustable lumbar curvature, non-breathable foam traps heat, fixed armrests bump into desks, glued non-recyclable parts.");
      setImagePreview(null);
      setImageFileName("");
      setImageFile(null);
      setImageBase64(null);
    } else if (presetType === 'commuter_bottle') {
      setProductName("Student Travel Flask");
      setCategory("Water Bottle");
      setTargetUser("Students");
      setSelectedPriorities(["Affordability", "Portability", "Safety", "Durability"]);
      setUserProblems("Screw cap frequently unscrews in book bag causing water spills on textbooks; heavy weight; expensive to replace.");
      setImagePreview("/demo-bottle.svg");
      setImageFileName("demo-bottle.svg");
      setImageFile(null);
      setImageBase64(null);
    }
  };

  // Process selected file with validation
  const processFile = (file) => {
    setImageError("");
    if (!file) return;

    // Check extension
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setImageError(`Unsupported format .${ext}. Please upload JPG, JPEG, PNG, or WEBP.`);
      return;
    }

    // Check size (10 MB limit)
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setImageError(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds max limit of ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setImageFile(file);
    setImageFileName(file.name);

    // Read preview & Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageFileName("");
    setImagePreview(null);
    setImageBase64(null);
    setImageError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!productName.trim()) {
      setValidationError("Please enter a product name.");
      return;
    }
    if (!category.trim()) {
      setValidationError("Please select a product category.");
      return;
    }
    if (!targetUser.trim()) {
      setValidationError("Please select a target user profile.");
      return;
    }
    if (selectedPriorities.length === 0) {
      setValidationError("Please select at least one design priority.");
      return;
    }

    onSubmit({
      product_name: productName.trim(),
      category: category,
      target_user: targetUser,
      selected_priorities: selectedPriorities,
      user_problems: userProblems.trim(),
      image_url: imagePreview,
      image_base64: imageBase64,
      image_filename: imageFileName
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                PRODUCT INPUT STUDIO
              </span>
              {apiStatus?.has_gemini_key ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Live Multimodal Gemini Active
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Demo Mode (Heuristic Engine)
                </span>
              )}
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Configure Product for AI Redesign
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Upload your existing product baseline and select target user requirements.
            </p>
          </div>

          {/* Quick Preset Badges */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Quick Samples:</span>
            <button
              type="button"
              onClick={() => loadPreset('bottle')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/30 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Droplet className="w-3.5 h-3.5" />
              <span>Water Bottle Demo</span>
            </button>
            <button
              type="button"
              onClick={() => loadPreset('chair')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Armchair className="w-3.5 h-3.5" />
              <span>Office Chair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start space-x-3 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <div>
            <span className="font-semibold">Validation Notice: </span>
            {validationError}
          </div>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Upload & Preview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  1. Product Image / Photo
                </label>
                <span className="text-[10px] text-slate-500">JPG, PNG, WEBP</span>
              </div>
              
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full h-64 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 cursor-pointer relative overflow-hidden group ${
                  imagePreview 
                    ? 'border-teal-500/40 bg-slate-950/80' 
                    : 'border-slate-700 hover:border-teal-500/60 bg-slate-950/60'
                }`}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Uploaded Product" 
                      className="max-h-48 max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-semibold text-teal-300">
                      Click to Replace Image
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-2 p-2">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400 group-hover:text-teal-400 group-hover:border-teal-500/40 transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      Drag & Drop or Click to Upload
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Supports JPG, JPEG, PNG, WEBP (Max 10MB)
                    </p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" 
                  className="hidden" 
                />
              </div>

              {/* Error note if file upload invalid */}
              {imageError && (
                <div className="mt-2 text-[11px] text-rose-400 flex items-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{imageError}</span>
                </div>
              )}

              {/* Image info & action buttons */}
              {imagePreview && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate max-w-[170px]">
                    <ImageIcon className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate text-slate-300 font-mono text-[11px]">
                      {imageFileName || "product-image"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-1 rounded bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Demonstration Scope Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-950/30 to-cyan-950/20 border border-teal-500/20">
              <div className="flex items-center space-x-2 text-teal-300 text-xs font-bold mb-1">
                <Droplet className="w-4 h-4" />
                <span>Working Reference Example</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The plastic water bottle is configured as the first complete working demonstration product with tactile grip heuristics and circular Tritan material recommendations.
              </p>
            </div>
          </div>

          {/* Right Column: Configuration Details */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 2: Name & Category */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-5">
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                  2. Product Identity
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-slate-400 mb-1">Product Name *</span>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. Standard Plastic Water Bottle"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm text-white placeholder-slate-600 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <span className="block text-xs text-slate-400 mb-1">Product Category *</span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm text-white outline-none transition-all"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Target User Profile */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">
                    3. Target User Profile *
                  </label>
                  <span className="text-[11px] text-teal-400">
                    Adapts ergonomic & price constraints
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {USER_PROFILES.map((profile) => {
                    const isSelected = targetUser === profile.id;
                    return (
                      <div
                        key={profile.id}
                        onClick={() => handleSelectProfile(profile)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-teal-500/10 border-teal-500/50 text-white shadow-sm glow-teal'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-base">{profile.icon}</span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-[10px]">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-semibold text-white">{profile.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                          {profile.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Design Priorities */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">
                    4. Selected Design Priorities (Multi-select) *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {selectedPriorities.length} selected
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRIORITIES.map((p) => {
                    const isChecked = selectedPriorities.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => togglePriority(p.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center space-x-1.5 cursor-pointer ${
                          isChecked
                            ? 'bg-teal-500/15 border-teal-500/40 text-teal-300 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 text-teal-400 stroke-[2.5]" />}
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: User Specific Problem description */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  5. What problems do you currently have with this product? <span className="text-slate-500 lowercase font-normal">(optional context)</span>
                </label>
                <textarea
                  rows={3}
                  value={userProblems}
                  onChange={(e) => setUserProblems(e.target.value)}
                  placeholder="e.g. Slippery surface when wet, cap threads wear out, hard to clean bottom corners, single-use waste..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs text-white placeholder-slate-600 outline-none transition-all leading-relaxed"
                />
              </div>
            </div>

            {/* Action Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || isUploading || !productName.trim()}
                className="w-full py-4 rounded-xl text-base font-bold bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 hover:from-teal-400 hover:to-cyan-300 text-slate-950 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <span>Execute AI Redesign Analysis</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
