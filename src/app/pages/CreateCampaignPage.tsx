import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  DollarSign,
  ArrowLeft,
  Calendar,
  Target,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function CreateCampaignPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("id");
  const isEditMode = !!campaignId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Campaign form data
  const [formData, setFormData] = useState({
    name: "",
    type: "cause",
    goal: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const sessionData = localStorage.getItem("pairwell_session") || sessionStorage.getItem("pairwell_session");
    
    if (!sessionData) {
      navigate("/signin");
      return;
    }

    // If editing, load campaign data
    if (isEditMode && campaignId) {
      // In a real app, fetch campaign data from backend
      const savedCampaigns = JSON.parse(localStorage.getItem("pairwell_campaigns") || "[]");
      const campaign = savedCampaigns.find((c: any) => c.id === parseInt(campaignId));
      
      if (campaign) {
        setFormData({
          name: campaign.name,
          type: campaign.type,
          goal: campaign.goal.toString(),
          description: campaign.description || "",
          category: campaign.category,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          image: campaign.image || "",
        });
      }
    }
    
    setIsLoading(false);
  }, [navigate, isEditMode, campaignId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.goal || !formData.description || !formData.startDate || !formData.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    // Get existing campaigns
    const savedCampaigns = JSON.parse(localStorage.getItem("pairwell_campaigns") || "[]");
    
    if (isEditMode && campaignId) {
      // Update existing campaign
      const updatedCampaigns = savedCampaigns.map((c: any) => {
        if (c.id === parseInt(campaignId)) {
          return {
            ...c,
            name: formData.name,
            type: formData.type,
            goal: parseInt(formData.goal),
            description: formData.description,
            category: formData.category,
            startDate: formData.startDate,
            endDate: formData.endDate,
            image: formData.image,
          };
        }
        return c;
      });
      localStorage.setItem("pairwell_campaigns", JSON.stringify(updatedCampaigns));
    } else {
      // Create new campaign
      const newCampaign = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        goal: parseInt(formData.goal),
        raised: 0,
        donors: 0,
        description: formData.description,
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: "active",
        image: formData.image,
      };
      
      savedCampaigns.push(newCampaign);
      localStorage.setItem("pairwell_campaigns", JSON.stringify(savedCampaigns));
    }
    
    // Navigate back to nonprofit account campaigns tab
    navigate("/nonprofit-account?tab=campaigns");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#feb705] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif] flex flex-col">
      {/* Header */}
      <header className="relative z-20">
        {/* Top Row - Dark Blue with Auth Buttons */}
        <AuthHeader />
        
        {/* Second Row - Logo and Nav */}
        <div className="bg-white py-4 px-4 md:px-8 border-b border-gray-200">
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

      {/* Main Content */}
      <section className="flex-1 bg-[#f5f5f5] py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/nonprofit-account?tab=campaigns")}
            className="flex items-center gap-2 text-[#023047] font-bold mb-6 hover:text-[#feb705] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Campaigns
          </button>

          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              {isEditMode ? "Edit Campaign" : "Create New Campaign"}
            </h1>
            <p className="text-lg text-gray-600">
              {isEditMode ? "Update your campaign details below" : "Fill in the details to launch your new campaign or event"}
            </p>
          </div>

          {/* Campaign Form */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campaign Name */}
              <div>
                <label className="flex items-center gap-2 font-bold text-base text-black mb-2">
                  <FileText size={20} className="text-[#feb705]" />
                  Campaign Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                  placeholder="e.g., Back to School Supplies Drive"
                  required
                />
              </div>

              {/* Type and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-bold text-base text-black mb-2">
                    <Target size={20} className="text-[#feb705]" />
                    Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                    required
                  >
                    <option value="cause">Cause</option>
                    <option value="event">Event</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-1">
                    Causes are ongoing, events have specific dates
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-base text-black mb-2">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Housing">Housing</option>
                    <option value="Food Security">Food Security</option>
                    <option value="Arts & Culture">Arts & Culture</option>
                    <option value="Animal Welfare">Animal Welfare</option>
                    <option value="Human Rights">Human Rights</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Fundraising Goal */}
              <div>
                <label className="flex items-center gap-2 font-bold text-base text-black mb-2">
                  <DollarSign size={20} className="text-[#feb705]" />
                  Fundraising Goal <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    min="1"
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                    placeholder="10000"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Set a realistic goal that will help fund your campaign
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-base text-black mb-2">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                  placeholder="Describe your campaign, its goals, who it will help, and the impact it will make..."
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Tell your story! Explain why this campaign matters and how donations will be used.
                </p>
              </div>

              {/* Start and End Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-bold text-base text-black mb-2">
                    <Calendar size={20} className="text-[#feb705]" />
                    Start Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none text-black [color-scheme:light]"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 font-bold text-base text-black mb-2">
                    <Calendar size={20} className="text-[#feb705]" />
                    End Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none text-black [color-scheme:light]"
                    required
                  />
                </div>
              </div>

              {/* Image URL (optional) */}
              <div>
                <label className="flex items-center gap-2 font-bold text-base text-black mb-2">
                  <ImageIcon size={20} className="text-[#feb705]" />
                  Campaign Image URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Add an image to make your campaign more engaging
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/nonprofit-account?tab=campaigns")}
                  className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-black font-bold rounded-lg hover:border-[#023047] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#feb705] text-[#023047] font-bold rounded-lg hover:bg-[#e5a605] transition-colors"
                >
                  {isEditMode ? "Save Changes" : "Create Campaign"}
                </button>
              </div>
            </form>
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