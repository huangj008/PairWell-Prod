import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import { useState, useEffect } from "react";
import { Menu, X, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { AuthHeader } from "../components/AuthHeader";

export default function SignInPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("pairwell_saved_email");
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Authenticate with backend
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6d6e67ed/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Sign in successful:", data);
        
        // Handle Remember Me for email
        if (formData.rememberMe) {
          localStorage.setItem("pairwell_saved_email", formData.email);
        } else {
          localStorage.removeItem("pairwell_saved_email");
        }
        
        // Store session data
        const sessionData = {
          accountId: data.account.accountId,
          email: data.account.email,
          userType: data.account.userType,
          firstName: data.account.firstName || null,
          lastName: data.account.lastName || null,
          organizationName: data.account.organizationName || null,
          loggedInAt: new Date().toISOString(),
        };
        
        if (formData.rememberMe) {
          localStorage.setItem("pairwell_session", JSON.stringify(sessionData));
        } else {
          sessionStorage.setItem("pairwell_session", JSON.stringify(sessionData));
        }

        // Redirect to account page based on user type
        if (data.account.userType === "donor") {
          navigate("/donor-account");
        } else if (data.account.userType === "nonprofit") {
          navigate("/nonprofit-account");
        } else {
          navigate("/");
        }
      } else {
        console.error("Sign in failed:", data.error);
        setErrors({ general: data.error || "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrors({ general: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif] flex flex-col">
      {/* Header */}
      <header className="relative z-20">
        {/* Top Row - Dark Blue with Auth Buttons */}
        <AuthHeader />
        
        {/* Second Row - Logo and Nav */}
        <div className="bg-white py-4 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img src={imgNavLogo} alt="PairWell Logo" className="h-12 md:h-16 w-auto" />
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

      {/* Sign In Form Section */}
      <section className="flex-1 flex items-center justify-center py-12 md:py-20 px-4 md:px-8 bg-[#f5f5f5]">
        <div className="max-w-md w-full">
          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg border border-[rgba(2,48,71,0.2)] p-8 md:p-10">
            {/* Header */}
            <div className="text-center space-y-4 mb-8">
              <h1 className="font-bold text-3xl md:text-4xl text-black">
                Welcome Back
              </h1>
              <p className="text-base md:text-lg text-black">
                Sign in to your PairWell account
              </p>
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
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
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block font-bold text-base text-black mb-2">
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#023047]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-[#feb705]"
                  />
                  <span className="text-sm text-black">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#023047] font-bold hover:text-[#feb705] transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <AlertCircle size={20} className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Social Sign In Options */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-lg text-black font-bold hover:border-[#023047] hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-lg text-black font-bold hover:border-[#023047] hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-base text-black">
                Don't have an account? <Link to="/signup" className="text-[#023047] font-bold hover:text-[#feb705] transition-colors">Create An Account</Link>
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-[#023047] font-bold hover:text-[#feb705] transition-colors">Contact Support</a>
            </p>
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