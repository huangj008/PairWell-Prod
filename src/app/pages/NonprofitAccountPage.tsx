//import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import { useState, useEffect } from "react";
import "../../styles/date-input.css";
import { 
  Menu, 
  X, 
  Building2, 
  Heart, 
  Bell, 
  Settings, 
  Lock, 
  CreditCard,
  ChevronRight,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Check,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Target,
  MessageSquare,
  Gift,
  Share2,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  MapPin,
  Globe,
  Phone,
  Copy,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function NonprofitAccountPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "campaigns" | "donors" | "updates" | "analytics" | "notifications" | "settings" | "privacy" | "payment">("overview");
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Campaign management state
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [showEditCampaignModal, setShowEditCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingCampaignId, setDeletingCampaignId] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingCampaign, setSharingCampaign] = useState<any>(null);
  
  // Campaign filter state
  const [campaignFilter, setCampaignFilter] = useState<"all" | "active" | "completed" | "campaigns" | "events" | "fundraisers">("all");

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedOrgName, setEditedOrgName] = useState("");
  
  // Campaigns data state - load from localStorage or use defaults
  const getInitialCampaigns = () => {
    const stored = localStorage.getItem("pairwell_campaigns");
    if (stored) {
      const storedCampaigns = JSON.parse(stored);
      // Ensure all campaigns have required fields with defaults
      return storedCampaigns.map((camp: any) => ({
        ...camp,
        raised: camp.raised ?? 0,
        goal: camp.goal ?? 10000,
        donors: camp.donors ?? 0,
        status: camp.status || "active",
        description: camp.description || "",
        type: camp.type || "campaign"
      }));
    }
    return [
      {
        id: 1,
        name: "Clean Water Initiative",
        description: "Providing clean water access to rural communities",
        type: "campaign",
        goal: 25000,
        raised: 18750,
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        donors: 156
      },
      {
        id: 2,
        name: "Education for All",
        description: "School supplies and scholarships for underprivileged children",
        type: "campaign",
        goal: 15000,
        raised: 4200,
        status: "active",
        startDate: "2024-02-01",
        endDate: "2024-06-30",
        donors: 48
      },
      {
        id: 3,
        name: "Community Food Drive",
        description: "Annual food collection for local families in need",
        type: "event",
        goal: 10000,
        raised: 10500,
        status: "completed",
        startDate: "2023-11-01",
        endDate: "2023-12-15",
        donors: 125
      },
      {
        id: 4,
        name: "Food Drive",
        description: "Join us in collecting non-perishable food items for local families experiencing food insecurity. Every donation helps provide nutritious meals to those in need.",
        type: "event",
        goal: 8000,
        raised: 5200,
        status: "active",
        startDate: "2026-03-01",
        endDate: "2026-05-31",
        donors: 78
      },
      {
        id: 5,
        name: "Visit Older Adults",
        description: "Volunteer to spend time with seniors in our community. Share stories, play games, and bring joy to older adults who may be experiencing loneliness.",
        type: "event",
        goal: 5000,
        raised: 3400,
        status: "active",
        startDate: "2026-02-15",
        endDate: "2026-12-15",
        donors: 52
      },
      {
        id: 6,
        name: "City Clean Up",
        description: "Help keep our city beautiful by participating in our community clean-up events. Together, we can make a positive impact on our environment and neighborhoods.",
        type: "event",
        goal: 6000,
        raised: 4100,
        status: "active",
        startDate: "2026-04-01",
        endDate: "2026-06-30",
        donors: 65
      },
      {
        id: 7,
        name: "Forest Clean Up",
        description: "Join us in protecting our forests by removing litter, invasive species, and debris. Help preserve natural habitats and maintain the beauty of our woodland areas.",
        type: "event",
        goal: 7500,
        raised: 4800,
        status: "active",
        startDate: "2026-05-01",
        endDate: "2026-08-31",
        donors: 89
      },
      {
        id: 8,
        name: "Affordable Healthcare",
        description: "Support our mission to provide accessible healthcare services to underserved communities. Your donation helps fund medical supplies, equipment, and care for those in need.",
        type: "campaign",
        goal: 20000,
        raised: 12500,
        status: "active",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        donors: 145
      },
      {
        id: 9,
        name: "Community Programs",
        description: "Empower our community through educational workshops, skills training, and social programs that bring people together and create lasting positive change.",
        type: "campaign",
        goal: 12000,
        raised: 8300,
        status: "active",
        startDate: "2026-02-01",
        endDate: "2026-11-30",
        donors: 112
      }
    ];
  };

  const [campaigns, setCampaigns] = useState(getInitialCampaigns());
  
  // Update management state
  const [showNewUpdateModal, setShowNewUpdateModal] = useState(false);
  
  // Form state for new campaign
  const [newCampaignForm, setNewCampaignForm] = useState({
    type: "campaign",
    name: "",
    description: "",
    goal: "",
    startDate: "",
    endDate: ""
  });

  // Form state for editing campaign
  const [editCampaignForm, setEditCampaignForm] = useState({
    type: "",
    name: "",
    description: "",
    goal: "",
    startDate: "",
    endDate: ""
  });

  // Helper function to format date strings without timezone issues
  const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
    // Parse the date string as YYYY-MM-DD and treat it as local date
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    return date.toLocaleDateString('en-US', options || { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Mock notifications data
  const notifications = [
    { id: 1, message: "New donation of $500 received", time: "2 hours ago", read: false },
    { id: 2, message: "Campaign 'Clean Water Initiative' reached 75% of goal", time: "5 hours ago", read: false },
    { id: 3, message: "New donor subscribed to monthly giving", time: "1 day ago", read: true },
    { id: 4, message: "Thank you email sent to 15 donors", time: "2 days ago", read: true },
  ];

  const getUnreadNotifications = () => notifications.filter(n => !n.read).length;

  // Calculate dynamic stats based on campaigns
  const getTotalRaised = () => {
    return campaigns.reduce((total, campaign) => total + campaign.raised, 0);
  };

  const getTotalDonors = () => {
    return campaigns.reduce((total, campaign) => total + campaign.donors, 0);
  };

  const getActiveCampaignsCount = () => {
    return campaigns.filter(c => c.status === "active").length;
  };

  const getActiveCampaigns = () => {
    return campaigns.filter(c => c.status === "active");
  };

  const getCompletedCampaignsCount = () => {
    return campaigns.filter(c => c.status === "completed").length;
  };

  const getTopPerformingCampaigns = () => {
    // Sort by percentage of goal achieved (raised/goal ratio)
    return [...campaigns]
      .sort((a, b) => (b.raised / b.goal) - (a.raised / a.goal))
      .slice(0, 3);
  };

  const getCampaignSuccessRate = () => {
    if (campaigns.length === 0) return 0;
    const successfulCampaigns = campaigns.filter(c => c.raised >= c.goal).length;
    return Math.round((successfulCampaigns / campaigns.length) * 100);
  };

  // Filter campaigns based on selected filter
  const getFilteredCampaigns = () => {
    return campaigns.filter(campaign => {
      if (campaignFilter === "all") return true;
      if (campaignFilter === "active") return campaign.status === "active";
      if (campaignFilter === "completed") return campaign.status === "completed";
      if (campaignFilter === "campaigns") return campaign.type === "campaign";
      if (campaignFilter === "events") return campaign.type === "event";
      if (campaignFilter === "fundraisers") return campaign.type === "fundraiser";
      return true;
    });
  };

  // Handle create campaign
  const handleCreateCampaign = () => {
    const maxId = campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) : 0;
    const newCampaign = {
      id: maxId + 1,
      name: newCampaignForm.name,
      description: newCampaignForm.description,
      type: newCampaignForm.type,
      goal: parseFloat(newCampaignForm.goal.replace(/,/g, '')),
      raised: 0,
      status: "active",
      startDate: newCampaignForm.startDate,
      endDate: newCampaignForm.endDate,
      donors: 0,
      organizer: userData?.organizationName || "Community Organization",
      location: userData?.city && userData?.state ? `${userData.city}, ${userData.state}` : "Local Community",
      fullDescription: newCampaignForm.description,
      impact: "Making a positive impact in our community"
    };
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem("pairwell_campaigns", JSON.stringify(updatedCampaigns));
    setShowNewCampaignModal(false);
    setNewCampaignForm({
      type: "campaign",
      name: "",
      description: "",
      goal: "",
      startDate: "",
      endDate: ""
    });
    setSuccessMessage("Campaign created successfully!");
    setShowSuccessModal(true);
  };

  // Handle edit campaign
  const handleEditCampaign = () => {
    if (!editCampaignForm.name || !editCampaignForm.goal || !editCampaignForm.startDate || !editCampaignForm.endDate) {
      setSuccessMessage("Please fill in all required fields");
      setShowSuccessModal(true);
      return;
    }

    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === editingCampaign?.id) {
        return {
          ...campaign,
          type: editCampaignForm.type,
          name: editCampaignForm.name,
          description: editCampaignForm.description,
          goal: parseFloat(editCampaignForm.goal.replace(/,/g, '') || '0'),
          startDate: editCampaignForm.startDate,
          endDate: editCampaignForm.endDate,
          fullDescription: editCampaignForm.description,
          organizer: userData?.organizationName || campaign.organizer,
          location: userData?.city && userData?.state ? `${userData.city}, ${userData.state}` : campaign.location
        };
      }
      return campaign;
    });

    setCampaigns(updatedCampaigns);
    localStorage.setItem("pairwell_campaigns", JSON.stringify(updatedCampaigns));

    setShowEditCampaignModal(false);
    setEditingCampaign(null);
    setEditCampaignForm({
      type: "",
      name: "",
      description: "",
      goal: "",
      startDate: "",
      endDate: ""
    });
    setSuccessMessage("Campaign updated successfully!");
    setShowSuccessModal(true);
  };

  // Handle delete campaign
  const handleDeleteCampaign = () => {
    const updatedCampaigns = campaigns.filter(c => c.id !== deletingCampaignId);
    setCampaigns(updatedCampaigns);
    localStorage.setItem("pairwell_campaigns", JSON.stringify(updatedCampaigns));
    setShowDeleteConfirm(false);
    setDeletingCampaignId(null);
    setSuccessMessage("Campaign deleted successfully!");
    setShowSuccessModal(true);
  };

  // Handle copy link with fallback for clipboard API
  const handleCopyLink = () => {
    const link = `https://pairwell.org/campaign/${sharingCampaign?.id}`;

    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(link).then(() => {
        setSuccessMessage("Link copied to clipboard!");
        setShowSuccessModal(true);
        setShowShareModal(false);
      }).catch(() => {
        // Fallback to old method
        fallbackCopyToClipboard(link);
      });
    } else {
      // Use fallback for older browsers or non-secure contexts
      fallbackCopyToClipboard(link);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setSuccessMessage("Link copied to clipboard!");
      setShowSuccessModal(true);
      setShowShareModal(false);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setSuccessMessage("Failed to copy link. Please copy manually.");
      setShowSuccessModal(true);
      setShowShareModal(false);
    }
    document.body.removeChild(textArea);
  };

  // Handle save profile changes
  const handleSaveProfile = () => {
    const updatedUserData = {
      ...userData,
      organizationName: editedOrgName
    };

    // Update userData state
    setUserData(updatedUserData);

    // Update both localStorage and sessionStorage to ensure persistence
    // This ensures the data is saved regardless of which storage was used for login
    const localSession = localStorage.getItem("pairwell_session");
    const sessionSession = sessionStorage.getItem("pairwell_session");

    if (localSession) {
      localStorage.setItem("pairwell_session", JSON.stringify(updatedUserData));
    }
    if (sessionSession) {
      sessionStorage.setItem("pairwell_session", JSON.stringify(updatedUserData));
    }

    setIsEditingProfile(false);
    setSuccessMessage("Organization name updated successfully!");
    setShowSuccessModal(true);
  };

  useEffect(() => {
    // Check if user is signed in and is a nonprofit
    const sessionData = localStorage.getItem("pairwell_session") || sessionStorage.getItem("pairwell_session");

    if (!sessionData) {
      navigate("/signin");
      return;
    }

    const user = JSON.parse(sessionData);

    if (user.userType !== "nonprofit") {
      navigate("/");
      return;
    }

    setUserData(user);
    setIsLoading(false);

    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam as any);
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update campaigns with current organization name whenever userData changes
  useEffect(() => {
    if (userData && userData.organizationName) {
      const updatedCampaigns = campaigns.map(campaign => ({
        ...campaign,
        organizer: userData.organizationName,
        location: userData.city && userData.state ? `${userData.city}, ${userData.state}` : campaign.location || "Local Community"
      }));

      // Only update if there are actual changes
      const hasChanges = campaigns.some((camp, idx) =>
        camp.organizer !== updatedCampaigns[idx].organizer ||
        camp.location !== updatedCampaigns[idx].location
      );

      if (hasChanges) {
        setCampaigns(updatedCampaigns);
        localStorage.setItem("pairwell_campaigns", JSON.stringify(updatedCampaigns));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#023047] mb-4"></div>
          <p className="text-[#023047] text-xl font-bold">Loading your account...</p>
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
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileNavOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg border border-[rgba(2,48,71,0.2)] overflow-hidden">
              <nav className="flex flex-col">
                <Link
                  to="/nonprofits"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors border-b border-gray-200"
                  onClick={() => setMobileNavOpen(false)}
                >
                  For Nonprofits
                </Link>
                <Link
                  to="/donors"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors border-b border-gray-200"
                  onClick={() => setMobileNavOpen(false)}
                >
                  For Donors
                </Link>
                <Link
                  to="/about"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors border-b border-gray-200"
                  onClick={() => setMobileNavOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/directory"
                  className="text-[#023047] font-bold text-lg px-6 py-4 hover:bg-[#feb705] hover:text-[#023047] transition-colors"
                  onClick={() => setMobileNavOpen(false)}
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
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                Welcome, {userData?.organizationName || "Organization"}!
              </h1>
              <p className="text-lg text-gray-600">
                Manage your campaigns, engage with donors, and track your impact
              </p>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDashboardMenuOpen(!dashboardMenuOpen);
                }}
                className="w-full flex items-center justify-between p-4 bg-[#023047] text-white hover:bg-[#034561] transition-colors"
              >
                <span className="font-bold text-lg">Dashboard Menu</span>
                {dashboardMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {dashboardMenuOpen && (
                <nav className="p-4 space-y-2">
                  <button
                    onClick={() => {
                      setActiveTab("overview");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "overview" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <TrendingUp size={20} />
                    Overview
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "profile" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Building2 size={20} />
                    Organization Profile
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("campaigns");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "campaigns" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Target size={20} />
                    Campaigns & Events
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("donors");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "donors" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Users size={20} />
                    Donors
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("updates");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "updates" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <MessageSquare size={20} />
                    Updates & Milestones
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("analytics");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "analytics" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <BarChart3 size={20} />
                    Analytics
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("notifications");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors relative ${
                      activeTab === "notifications" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Bell size={20} />
                    Notifications
                    {getUnreadNotifications() > 0 && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {getUnreadNotifications()}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("settings");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "settings" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Settings size={20} />
                    Settings
                  </button>
                </nav>
              )}
            </div>
          </div>

          {/* Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "overview" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <TrendingUp size={20} />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "profile" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Building2 size={20} />
                    Organization Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("campaigns")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "campaigns" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Target size={20} />
                    Campaigns & Events
                  </button>
                  <button
                    onClick={() => setActiveTab("donors")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "donors" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Users size={20} />
                    Donors
                  </button>
                  <button
                    onClick={() => setActiveTab("updates")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "updates" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <MessageSquare size={20} />
                    Updates & Milestones
                  </button>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "analytics" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <BarChart3 size={20} />
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors relative ${
                      activeTab === "notifications" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Bell size={20} />
                    Notifications
                    {getUnreadNotifications() > 0 && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {getUnreadNotifications()}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "settings" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Settings size={20} />
                    Settings
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-600">Total Raised</h3>
                        <DollarSign className="text-[#feb705]" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-[#023047]">${getTotalRaised().toLocaleString()}</p>
                      <p className="text-sm text-green-600 mt-1">Across all campaigns</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-600">Total Donors</h3>
                        <Users className="text-[#feb705]" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-[#023047]">{getTotalDonors()}</p>
                      <p className="text-sm text-green-600 mt-1">Supporting your cause</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-600">Active Campaigns</h3>
                        <Target className="text-[#feb705]" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-[#023047]">{getActiveCampaignsCount()}</p>
                      <p className="text-sm text-blue-600 mt-1">{getCompletedCampaignsCount()} completed</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                        <div className="bg-green-100 p-2 rounded-full">
                          <DollarSign className="text-green-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-black">New donation received</p>
                          <p className="text-sm text-gray-600">Sarah Johnson donated $500 to Clean Water Initiative</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Users className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-black">New monthly donor</p>
                          <p className="text-sm text-gray-600">Michael Chen subscribed to monthly giving ($50/month)</p>
                          <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <Target className="text-yellow-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-black">Campaign milestone reached</p>
                          <p className="text-sm text-gray-600">Clean Water Initiative reached 75% of funding goal</p>
                          <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Campaigns Summary */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Active Campaigns</h2>
                    {getActiveCampaigns().length === 0 ? (
                      <div className="text-center py-8">
                        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No active campaigns yet</p>
                        <button 
                          onClick={() => {
                            setActiveTab("campaigns");
                            setShowNewCampaignModal(true);
                          }}
                          className="mt-4 bg-[#feb705] text-[#023047] font-bold px-6 py-2 rounded-lg hover:bg-[#e5a605] transition-colors"
                        >
                          Create Your First Campaign
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {getActiveCampaigns().map((campaign) => {
                          const percentage = Math.round((campaign.raised / campaign.goal) * 100);
                          return (
                            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-black">{campaign.name}</h3>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                              <div className="mb-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">${campaign.raised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal</span>
                                  <span className="font-bold text-[#023047]">{percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-[#feb705] h-2 rounded-full" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">{campaign.donors} donors</p>
                                <p className="text-xs text-gray-500">Ends {formatDate(campaign.endDate, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">Organization Profile</h2>
                  
                  <div className="space-y-6">
                    {/* Organization Details */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-black flex items-center gap-2">
                          <Building2 size={20} className="text-[#feb705]" />
                          Basic Information
                        </h3>
                        {!isEditingProfile ? (
                          <button
                            onClick={() => {
                              setIsEditingProfile(true);
                              setEditedOrgName(userData?.organizationName || "");
                            }}
                            className="text-[#023047] hover:text-[#feb705] transition-colors flex items-center gap-2"
                          >
                            <Edit size={18} />
                            <span className="font-semibold">Edit</span>
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveProfile}
                              className="bg-[#feb705] text-[#023047] px-4 py-2 rounded-lg font-semibold hover:bg-[#e5a605] transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setIsEditingProfile(false);
                                setEditedOrgName("");
                              }}
                              className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Organization Name</label>
                          <input
                            type="text"
                            value={isEditingProfile ? editedOrgName : (userData?.organizationName || "")}
                            onChange={(e) => isEditingProfile && setEditedOrgName(e.target.value)}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] ${!isEditingProfile ? 'bg-gray-50' : ''}`}
                            readOnly={!isEditingProfile}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">EIN/Tax ID</label>
                          <input
                            type="text"
                            value={userData?.ein || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Contact Name</label>
                          <input
                            type="text"
                            value={userData?.contactName || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={userData?.email || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={userData?.phone || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Founded Date</label>
                          <input
                            type="text"
                            value={userData?.foundedDate ? formatDate(userData.foundedDate) : ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mission Statement */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Mission Statement</label>
                      <textarea
                        value={userData?.mission || ""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] h-24"
                        readOnly
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-[#feb705]" />
                        Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                          <input
                            type="text"
                            value={userData?.streetAddress || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            value={userData?.city || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                          <input
                            type="text"
                            value={userData?.state || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code</label>
                          <input
                            type="text"
                            value={userData?.zipCode || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="bg-[#023047] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#034561] transition-colors">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "campaigns" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-black">Campaigns & Events</h2>
                    <button 
                      onClick={() => setShowNewCampaignModal(true)}
                      className="bg-[#feb705] text-[#023047] font-bold px-4 py-2 rounded-lg hover:bg-[#e5a605] transition-colors flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Create New
                    </button>
                  </div>
                  
                  {/* Filter Buttons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      onClick={() => setCampaignFilter("all")}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        campaignFilter === "all"
                          ? "bg-[#023047] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setCampaignFilter("active")}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        campaignFilter === "active"
                          ? "bg-[#023047] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setCampaignFilter("completed")}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        campaignFilter === "completed"
                          ? "bg-[#023047] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => setCampaignFilter("campaigns")}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        campaignFilter === "campaigns"
                          ? "bg-[#023047] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Campaigns
                    </button>
                    <button
                      onClick={() => setCampaignFilter("events")}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        campaignFilter === "events"
                          ? "bg-[#023047] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Events
                    </button>
                    <button
                      onClick={() => setCampaignFilter("fundraisers")}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        campaignFilter === "fundraisers"
                          ? "bg-[#023047] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Fundraisers
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Filtered Campaigns */}
                    {getFilteredCampaigns().length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-lg">No campaigns found for this filter.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {getFilteredCampaigns().map((campaign) => {
                          const percentage = Math.round((campaign.raised / campaign.goal) * 100);
                          return (
                            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-lg text-black">{campaign.name}</h4>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${
                                  campaign.status === "active" 
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-blue-100 text-blue-700"
                                }`}>
                                  {campaign.status === "active" ? "Active" : "Completed"}
                                </span>
                                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded capitalize">
                                  {campaign.type}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingCampaign(campaign);
                                  setEditCampaignForm({
                                    type: campaign.type || "campaign",
                                    name: campaign.name || "",
                                    description: campaign.description || "",
                                    goal: (campaign.goal ?? 0).toString(),
                                    startDate: campaign.startDate || "",
                                    endDate: campaign.endDate || ""
                                  });
                                  setShowEditCampaignModal(true);
                                }}
                                className="text-[#023047] hover:text-[#feb705] transition-colors"
                                title="Edit campaign"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => {
                                  setSharingCampaign(campaign);
                                  setShowShareModal(true);
                                }}
                                className="text-[#023047] hover:text-[#feb705] transition-colors"
                                title="Share on social media"
                              >
                                <Share2 size={18} />
                              </button>
                              <button 
                                onClick={() => {
                                  setDeletingCampaignId(campaign.id);
                                  setShowDeleteConfirm(true);
                                }}
                                className="text-red-600 hover:text-red-800 transition-colors"
                                title="Delete campaign"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">${campaign.raised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal</span>
                              <span className={`font-bold ${percentage >= 100 ? "text-green-600" : "text-[#023047]"}`}>{percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${percentage >= 100 ? "bg-green-500" : "bg-[#feb705]"}`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-gray-600">
                              <span className="flex items-center gap-1">
                                {campaign.status === "completed" ? <CheckCircle size={14} /> : <Calendar size={14} />}
                                {campaign.status === "completed" ? "Ended" : "Ends"} {formatDate(campaign.endDate, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={14} />
                                {campaign.donors} donors
                              </span>
                            </div>
                            <button
                              onClick={() => navigate(`/campaign/${campaign.id}`, { state: { from: 'dashboard', tab: 'campaigns' } })}
                              className="text-[#023047] font-bold hover:text-[#feb705] transition-colors"
                            >
                              View Details →
                            </button>
                          </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "donors" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">Donor Management</h2>
                  
                  {/* Search and Filter */}
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search donors..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    />
                  </div>

                  {/* Donors List */}
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#feb705] rounded-full flex items-center justify-center text-[#023047] font-bold text-xl">
                            SJ
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-black">Sarah Johnson</h4>
                            <p className="text-sm text-gray-600">sarah.j@email.com</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Monthly Donor</span>
                              <span className="text-xs text-gray-600">Member since Jan 2024</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-[#023047]">$2,400</p>
                          <p className="text-sm text-gray-600">Total donated</p>
                          <p className="text-xs text-gray-500 mt-1">Last: 2 days ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#feb705] rounded-full flex items-center justify-center text-[#023047] font-bold text-xl">
                            MC
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-black">Michael Chen</h4>
                            <p className="text-sm text-gray-600">m.chen@email.com</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Monthly Donor</span>
                              <span className="text-xs text-gray-600">Member since Mar 2024</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-[#023047]">$600</p>
                          <p className="text-sm text-gray-600">Total donated</p>
                          <p className="text-xs text-gray-500 mt-1">Last: 5 days ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#feb705] rounded-full flex items-center justify-center text-[#023047] font-bold text-xl">
                            ER
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-black">Emily Rodriguez</h4>
                            <p className="text-sm text-gray-600">emily.r@email.com</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">One-time Donor</span>
                              <span className="text-xs text-gray-600">Member since Aug 2024</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-[#023047]">$500</p>
                          <p className="text-sm text-gray-600">Total donated</p>
                          <p className="text-xs text-gray-500 mt-1">Last: 2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "updates" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-black">Updates & Milestones</h2>
                    <button 
                      onClick={() => setShowNewUpdateModal(true)}
                      className="bg-[#023047] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#034561] transition-colors flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Post Update
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border-l-4 border-[#feb705] pl-4 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-black">Clean Water Initiative Update</h4>
                          <p className="text-sm text-gray-500">Posted 3 days ago</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Milestone</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        We've reached 75% of our funding goal! Thanks to your generous support, we're now able to begin phase 2 of the project, which will bring clean water to 5 additional villages.
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button 
                          onClick={() => alert('Share functionality: This update would be shared via email and social media to your donors!')}
                          className="text-[#023047] hover:text-[#feb705] transition-colors font-bold"
                        >
                          <Share2 size={16} className="inline mr-1" />
                          Share
                        </button>
                        <span className="text-gray-500">Sent to 156 donors</span>
                      </div>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-black">Thank You to Our Supporters!</h4>
                          <p className="text-sm text-gray-500">Posted 1 week ago</p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">Update</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        This month has been incredible! We want to thank each and every one of you for your continued support. Your donations are making a real difference in the communities we serve.
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="text-[#023047] hover:text-[#feb705] transition-colors font-bold">
                          <Share2 size={16} className="inline mr-1" />
                          Share
                        </button>
                        <span className="text-gray-500">Sent to 487 donors</span>
                      </div>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-black">Education for All Launch</h4>
                          <p className="text-sm text-gray-500">Posted 2 weeks ago</p>
                        </div>
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">Campaign Launch</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        We're excited to announce the launch of our new "Education for All" campaign! This initiative will provide school supplies and scholarships to underprivileged children in our community.
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="text-[#023047] hover:text-[#feb705] transition-colors font-bold">
                          <Share2 size={16} className="inline mr-1" />
                          Share
                        </button>
                        <span className="text-gray-500">Sent to 487 donors</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">Analytics & Insights</h2>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-bold text-gray-600 mb-2">Total Campaigns</h3>
                      <p className="text-3xl font-bold text-[#023047]">{campaigns.length}</p>
                      <p className="text-sm text-gray-600 mt-1">{getActiveCampaignsCount()} active, {getCompletedCampaignsCount()} completed</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-bold text-gray-600 mb-2">Total Raised</h3>
                      <p className="text-3xl font-bold text-[#023047]">${getTotalRaised().toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mt-1">Across all campaigns</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-bold text-gray-600 mb-2">Total Donors</h3>
                      <p className="text-3xl font-bold text-[#023047]">{getTotalDonors()}</p>
                      <p className="text-sm text-gray-600 mt-1">Supporting your campaigns</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-bold text-gray-600 mb-2">Campaign Success Rate</h3>
                      <p className="text-3xl font-bold text-[#023047]">{getCampaignSuccessRate()}%</p>
                      <p className="text-sm text-gray-600 mt-1">{campaigns.filter(c => c.raised >= c.goal).length} of {campaigns.length} reached goal</p>
                    </div>
                  </div>

                  {/* Campaign Summary */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-black mb-4">Campaign Overview</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {campaigns.filter(c => c.type === "campaign").length}
                          </div>
                          <p className="text-sm text-gray-600">Campaigns</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-600 mb-2">
                            {campaigns.filter(c => c.type === "event").length}
                          </div>
                          <p className="text-sm text-gray-600">Events</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-purple-600 mb-2">
                            {campaigns.filter(c => c.type === "fundraiser").length}
                          </div>
                          <p className="text-sm text-gray-600">Fundraisers</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Campaigns */}
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">Top Performing Campaigns</h3>
                    {getTopPerformingCampaigns().length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <BarChart3 size={48} className="text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-600">No campaigns to display</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {getTopPerformingCampaigns().map((campaign) => {
                          const percentage = Math.round((campaign.raised / campaign.goal) * 100);
                          const statusColor = percentage >= 100 ? "text-green-600" : percentage >= 50 ? "text-blue-600" : "text-yellow-600";
                          return (
                            <div key={campaign.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                              <div className="flex-1">
                                <p className="font-bold text-black">{campaign.name}</p>
                                <p className="text-sm text-gray-600">
                                  ${campaign.raised.toLocaleString()} raised ({percentage}% of ${campaign.goal.toLocaleString()} goal)
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <p className={`font-bold ${statusColor}`}>{campaign.donors} donors</p>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${
                                  campaign.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                }`}>
                                  {campaign.status}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-black">Notifications</h2>
                    <button className="text-[#023047] font-bold hover:text-[#feb705] transition-colors text-sm">
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          notification.read
                            ? "border-gray-200 bg-white"
                            : "border-[#feb705] bg-yellow-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`${notification.read ? "text-gray-700" : "font-bold text-black"}`}>
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#feb705] rounded-full mt-2 ml-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">Account Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Email Preferences */}
                    <div>
                      <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                        <Mail size={20} className="text-[#feb705]" />
                        Email Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-[#023047] rounded focus:ring-[#023047]" />
                          <span className="text-gray-700">Receive donation notifications</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-[#023047] rounded focus:ring-[#023047]" />
                          <span className="text-gray-700">Receive campaign milestone updates</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 text-[#023047] rounded focus:ring-[#023047]" />
                          <span className="text-gray-700">Receive monthly summary reports</span>
                        </label>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-[#feb705]" />
                        Security
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <button className="text-[#023047] font-bold hover:text-[#feb705] transition-colors">
                            Change Password →
                          </button>
                        </div>
                        <div>
                          <button className="text-[#023047] font-bold hover:text-[#feb705] transition-colors">
                            Enable Two-Factor Authentication →
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="pt-6 border-t border-red-200">
                      <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                      <button className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
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

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Create New</h2>
                <button
                  onClick={() => setShowNewCampaignModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                  <select
                    value={newCampaignForm.type}
                    onChange={(e) => setNewCampaignForm({...newCampaignForm, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                  >
                    <option value="campaign">Campaign</option>
                    <option value="event">Event</option>
                    <option value="fundraiser">Fundraiser</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newCampaignForm.name}
                    onChange={(e) => setNewCampaignForm({...newCampaignForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCampaignForm.description}
                    onChange={(e) => setNewCampaignForm({...newCampaignForm, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] h-24"
                    placeholder="Describe your campaign, event, or fundraiser"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Funding Goal ($)</label>
                  <input
                    type="text"
                    value={newCampaignForm.goal ? parseFloat(newCampaignForm.goal.replace(/,/g, '')).toLocaleString() : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      if (value === '' || /^\d+$/.test(value)) {
                        setNewCampaignForm({...newCampaignForm, goal: value});
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    placeholder="25,000"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newCampaignForm.startDate}
                      onChange={(e) => setNewCampaignForm({...newCampaignForm, startDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={newCampaignForm.endDate}
                      onChange={(e) => setNewCampaignForm({...newCampaignForm, endDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCreateCampaign}
                    className="flex-1 bg-[#feb705] text-[#023047] font-bold px-6 py-3 rounded-lg hover:bg-[#e5a605] transition-colors"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewCampaignModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {showEditCampaignModal && editingCampaign && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Edit Campaign</h2>
                <button
                  onClick={() => {
                    setShowEditCampaignModal(false);
                    setEditingCampaign(null);
                    setEditCampaignForm({
                      type: "",
                      name: "",
                      description: "",
                      goal: "",
                      startDate: "",
                      endDate: ""
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                  <select
                    value={editCampaignForm.type}
                    onChange={(e) => setEditCampaignForm({...editCampaignForm, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                  >
                    <option value="campaign">Campaign</option>
                    <option value="event">Event</option>
                    <option value="fundraiser">Fundraiser</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={editCampaignForm.name}
                    onChange={(e) => setEditCampaignForm({...editCampaignForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editCampaignForm.description}
                    onChange={(e) => setEditCampaignForm({...editCampaignForm, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Funding Goal ($)</label>
                  <input
                    type="text"
                    value={editCampaignForm.goal ? parseFloat(editCampaignForm.goal.replace(/,/g, '')).toLocaleString() : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      if (value === '' || /^\d+$/.test(value)) {
                        setEditCampaignForm({...editCampaignForm, goal: value});
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={editCampaignForm.startDate}
                      onChange={(e) => setEditCampaignForm({...editCampaignForm, startDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={editCampaignForm.endDate}
                      onChange={(e) => setEditCampaignForm({...editCampaignForm, endDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleEditCampaign}
                    className="flex-1 bg-[#feb705] text-[#023047] font-bold px-6 py-3 rounded-lg hover:bg-[#e5a605] transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditCampaignModal(false);
                      setEditingCampaign(null);
                      setEditCampaignForm({
                        type: "",
                        name: "",
                        description: "",
                        goal: "",
                        startDate: "",
                        endDate: ""
                      });
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Delete Campaign?</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this campaign? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCampaign}
                className="flex-1 bg-red-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingCampaignId(null);
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Update Modal */}
      {showNewUpdateModal && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Post New Update</h2>
                <button 
                  onClick={() => setShowNewUpdateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Update Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]"
                    placeholder="Enter update title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Update Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047]">
                    <option value="milestone">Milestone</option>
                    <option value="update">General Update</option>
                    <option value="launch">Campaign Launch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] h-32"
                    placeholder="Share your update with donors..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      alert('Update posted successfully!');
                      setShowNewUpdateModal(false);
                    }}
                    className="flex-1 bg-[#023047] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#034561] transition-colors"
                  >
                    Post Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewUpdateModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl border-4 border-[#feb705]">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#023047] mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#feb705] text-[#023047] font-bold px-6 py-3 rounded-lg hover:bg-[#e5a605] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && sharingCampaign && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#023047]">Share Campaign</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">Share "{sharingCampaign.name}" with your network</p>
            
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Copy size={20} className="text-[#023047]" />
                <span className="font-bold text-[#023047]">Copy Link</span>
              </button>
              
              <button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://pairwell.org/campaign/${sharingCampaign.id}`)}`, '_blank');
                  setShowShareModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Facebook size={20} className="text-[#1877F2]" />
                <span className="font-bold text-[#023047]">Share on Facebook</span>
              </button>
              
              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://pairwell.org/campaign/${sharingCampaign.id}`)}&text=${encodeURIComponent(sharingCampaign.name)}`, '_blank');
                  setShowShareModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Twitter size={20} className="text-[#1DA1F2]" />
                <span className="font-bold text-[#023047]">Share on Twitter</span>
              </button>
              
              <button
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://pairwell.org/campaign/${sharingCampaign.id}`)}`, '_blank');
                  setShowShareModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Linkedin size={20} className="text-[#0A66C2]" />
                <span className="font-bold text-[#023047]">Share on LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
