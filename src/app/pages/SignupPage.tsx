//import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { AuthHeader } from "../components/AuthHeader";

export default function SignupPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"donor" | "nonprofit" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Common fields
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    
    // Donor fields
    interests: [] as string[],
    city: "",
    state: "",
    
    // Nonprofit fields
    organizationName: "",
    ein: "",
    causeCategory: "",
    organizationDescription: "",
    website: "",
    organizationCity: "",
    organizationState: "",
    contactPhone: "",
  });

  const causeOptions = [
    "Education",
    "Environment",
    "Healthcare",
    "Housing",
    "Animal Welfare",
    "Arts & Culture",
    "Human Rights",
    "Poverty Relief",
    "Youth Development",
    "Disaster Relief"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest]
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form data
    const validationErrors: Record<string, string> = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      validationErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      validationErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      validationErrors.password = "Password must contain at least one number";
    } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
      validationErrors.password = "Password must contain at least one special character (@$!%*?&)";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (userType === "donor") {
      if (!formData.firstName) {
        validationErrors.firstName = "First name is required";
      }
      if (!formData.lastName) {
        validationErrors.lastName = "Last name is required";
      }
    } else if (userType === "nonprofit") {
      if (!formData.organizationName) {
        validationErrors.organizationName = "Organization name is required";
      }
      if (!formData.ein) {
        validationErrors.ein = "EIN / Tax ID is required";
      }
      if (!formData.contactPhone) {
        validationErrors.contactPhone = "Contact phone is required";
      }
      if (!formData.organizationCity) {
        validationErrors.organizationCity = "City is required";
      }
      if (!formData.organizationState) {
        validationErrors.organizationState = "State is required";
      }
      if (!formData.causeCategory) {
        validationErrors.causeCategory = "Primary cause category is required";
      }
      if (!formData.organizationDescription) {
        validationErrors.organizationDescription = "Organization description is required";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Handle form submission
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6d6e67ed/create-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          ...formData,
          userType
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Account created successfully:", data);
        // Redirect to success page
        navigate(`/signup/success?type=${userType}&id=${data.accountId}`);
      } else {
        console.error("Account creation failed:", data.error);
        setErrors({ general: data.error || "An error occurred while creating your account" });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setErrors({ general: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      {/* Header */}
      <header className="relative z-20">
        {/* Top Row - Dark Blue with Auth Buttons */}
        <div className="bg-[#023047] py-3 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex justify-end items-center gap-4">
            <Link to="/signin">
              <button className="text-white font-bold text-sm md:text-base hover:text-[#feb705] transition-colors">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="text-white font-bold text-sm md:text-base hover:text-[#feb705] transition-colors">Create An Account</button>
            </Link>
          </div>
        </div>
        
        {/* Second Row - Logo and Nav */}
        <div className="bg-white py-4 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                {/*<img src={imgNavLogo} alt="PairWell Logo" className="h-12 md:h-16 w-auto" />*/}
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <Link to="/nonprofits" className="text-[#023047] font-bold text-sm md:text-lg hover:text-[#feb705] transition-colors">For Nonprofits</Link>
              <Link to="/donors" className="text-[#023047] font-bold text-sm md:text-lg hover:text-[#feb705] transition-colors">For Donors</Link>
              <Link to="/about" className="text-[#023047] font-bold text-sm md:text-lg hover:text-[#feb705] transition-colors">About Us</Link>
              <Link to="/directory" className="text-[#023047] font-bold text-sm md:text-lg hover:text-[#feb705] transition-colors">Directory</Link>
            </nav>

            {/* Mobile Hamburger Menu Button */}
            <button 
              className="md:hidden text-[#023047] hover:text-[#feb705] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg border border-[rgba(2,48,71,0.2)] overflow-hidden">
              <nav className="flex flex-col">
                <Link
                  to="/nonprofits"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors border-b border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  For Nonprofits
                </Link>
                <Link
                  to="/donors"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors border-b border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  For Donors
                </Link>
                <Link
                  to="/about"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors border-b border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/directory"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Directory
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Signup Form Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-[#f5f5f5]">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[#feb705]' : 'bg-gray-300'} text-[#023047] font-bold`}>
                {step > 1 ? <CheckCircle2 size={20} /> : '1'}
              </div>
              <div className={`h-1 w-16 md:w-24 ${step >= 2 ? 'bg-[#feb705]' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-[#feb705]' : 'bg-gray-300'} text-[#023047] font-bold`}>
                {step > 2 ? <CheckCircle2 size={20} /> : '2'}
              </div>
              <div className={`h-1 w-16 md:w-24 ${step >= 3 ? 'bg-[#feb705]' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-[#feb705]' : 'bg-gray-300'} text-[#023047] font-bold`}>
                3
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg border border-[rgba(2,48,71,0.2)] p-6 md:p-10">
            {/* General Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: User Type Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h1 className="font-bold text-3xl md:text-4xl text-black">
                      Create Your Account
                    </h1>
                    <p className="text-base md:text-lg text-black">
                      Join PairWell to start making an impact today
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-lg text-black mb-4">
                      I am a: <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setUserType("donor")}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          userType === "donor"
                            ? 'border-[#feb705] bg-[#feb705]/10'
                            : 'border-gray-300 hover:border-[#feb705]'
                        }`}
                      >
                        <h3 className="font-bold text-xl text-black mb-2">Donor</h3>
                        <p className="text-sm text-black">
                          I want to discover and support nonprofits and causes
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType("nonprofit")}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          userType === "nonprofit"
                            ? 'border-[#feb705] bg-[#feb705]/10'
                            : 'border-gray-300 hover:border-[#feb705]'
                        }`}
                      >
                        <h3 className="font-bold text-xl text-black mb-2">Nonprofit</h3>
                        <p className="text-sm text-black">
                          I want to connect with donors and share our impact
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!userType}
                      className="bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg text-lg hover:bg-[#e5a605] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Basic Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="font-bold text-2xl md:text-3xl text-black">
                      Basic Information
                    </h2>
                    <p className="text-base text-black">
                      {userType === "donor" ? "Tell us about yourself" : "Tell us about your organization"}
                    </p>
                  </div>

                  {userType === "donor" ? (
                    // Donor Fields
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            First Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            Last Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            Password <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            Confirm Password <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // Nonprofit Fields
                    <>
                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Organization Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                        {errors.organizationName && <p className="text-red-600 text-sm mt-1">{errors.organizationName}</p>}
                      </div>

                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          EIN / Tax ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="ein"
                          value={formData.ein}
                          onChange={handleInputChange}
                          required
                          placeholder="XX-XXXXXXX"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                        {errors.ein && <p className="text-red-600 text-sm mt-1">{errors.ein}</p>}
                      </div>

                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Contact Phone <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                        {errors.contactPhone && <p className="text-red-600 text-sm mt-1">{errors.contactPhone}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            Password <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            Confirm Password <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            City <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="organizationCity"
                            value={formData.organizationCity}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.organizationCity && <p className="text-red-600 text-sm mt-1">{errors.organizationCity}</p>}
                        </div>
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            State <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="organizationState"
                            value={formData.organizationState}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          />
                          {errors.organizationState && <p className="text-red-600 text-sm mt-1">{errors.organizationState}</p>}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="border-2 border-[#023047] text-[#023047] font-bold px-8 py-3 rounded-lg text-lg hover:bg-[#023047] hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg text-lg hover:bg-[#e5a605] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="font-bold text-2xl md:text-3xl text-black">
                      {userType === "donor" ? "Your Interests" : "Organization Details"}
                    </h2>
                    <p className="text-base text-black">
                      {userType === "donor" 
                        ? "Select the causes you're passionate about" 
                        : "Help donors understand your mission"}
                    </p>
                  </div>

                  {userType === "donor" ? (
                    // Donor Interests
                    <div>
                      <label className="block font-bold text-base text-black mb-4">
                        Select your areas of interest <span className="text-red-600">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {causeOptions.map((cause) => (
                          <button
                            key={cause}
                            type="button"
                            onClick={() => handleInterestToggle(cause)}
                            className={`p-3 rounded-lg border-2 text-sm font-bold transition-all ${
                              formData.interests.includes(cause)
                                ? 'border-[#feb705] bg-[#feb705] text-[#023047]'
                                : 'border-gray-300 text-black hover:border-[#feb705]'
                            }`}
                          >
                            {cause}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Nonprofit Details
                    <>
                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Primary Cause Category <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="causeCategory"
                          value={formData.causeCategory}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        >
                          <option value="">Select a category</option>
                          {causeOptions.map((cause) => (
                            <option key={cause} value={cause}>{cause}</option>
                          ))}
                        </select>
                        {errors.causeCategory && <p className="text-red-600 text-sm mt-1">{errors.causeCategory}</p>}
                      </div>

                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Organization Description <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          name="organizationDescription"
                          value={formData.organizationDescription}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          placeholder="Tell donors about your mission, impact, and the work you do..."
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                        {errors.organizationDescription && <p className="text-red-600 text-sm mt-1">{errors.organizationDescription}</p>}
                      </div>

                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://www.yourorganization.org"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  <div className="bg-[#f5f5f5] p-4 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 w-5 h-5 accent-[#feb705]"
                      />
                      <span className="text-sm text-black">
                        I agree to PairWell's <a href="#" className="text-[#023047] font-bold hover:text-[#feb705]">Terms of Service</a> and <a href="#" className="text-[#023047] font-bold hover:text-[#feb705]">Privacy Policy</a> <span className="text-red-600">*</span>
                      </span>
                    </label>
                  </div>

                  {userType === "nonprofit" && (
                    <div className="bg-[#f5f5f5] p-4 rounded-lg">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 w-5 h-5 accent-[#feb705]"
                        />
                        <span className="text-sm text-black">
                          I certify that this organization is a registered 501(c)(3) nonprofit and I have the authority to create this account <span className="text-red-600">*</span>
                        </span>
                      </label>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="border-2 border-[#023047] text-[#023047] font-bold px-8 py-3 rounded-lg text-lg hover:bg-[#023047] hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg text-lg hover:bg-[#e5a605] transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <AlertCircle size={20} className="animate-spin" /> : "Create Account"}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-base text-black">
                Already have an account? <Link to="/signin" className="text-[#023047] font-bold hover:text-[#feb705]">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#023047] py-12 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <img src={imgFooterLogo} alt="PairWell Logo" className="w-32 h-auto" />
              <p className="text-sm md:text-base">
                Connecting Funders & Nonprofits to Drive Meaningful Impact.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4">For Donors</h3>
              <ul className="space-y-2 text-lg md:text-xl">
                <li><Link to="/donors" className="hover:text-[#feb705] transition-colors">Getting Started</Link></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4">For Nonprofits</h3>
              <ul className="space-y-2 text-lg md:text-xl">
                <li><Link to="/nonprofits" className="hover:text-[#feb705] transition-colors">Join PairWell</Link></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4">PairWell</h3>
              <ul className="space-y-2 text-lg md:text-xl">
                <li><a href="#" className="hover:text-[#feb705] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">General FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-lg md:text-xl">Copyright ©2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
