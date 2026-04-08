//import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Heart,
  Bell,
  Settings,
  Lock,
  CreditCard,
  LogOut,
  ChevronRight,
  TrendingUp,
  Calendar,
  DollarSign,
  Building2,
  Check,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Circle,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function DonorAccountPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "donations" | "notifications" | "settings" | "privacy" | "payment">("overview");
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to format date strings without timezone issues
  const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
    // Parse the date string as YYYY-MM-DD and treat it as local date
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', options || { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  // Helper function to format datetime strings without timezone issues
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
  };

  // Settings form data
  const [settingsData, setSettingsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    interests: [] as string[],
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showDonations: true,
    allowContact: true,
    shareData: false,
  });

  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    nonprofitUpdates: true,
    monthlyReports: true,
    taxReceipts: true,
    marketingEmails: false,
  });

  // Donation data loaded from localStorage
  const [donations, setDonations] = useState<any[]>([]);

  // Notifications loaded from localStorage
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Load user session data
    const sessionData = localStorage.getItem("pairwell_session") || sessionStorage.getItem("pairwell_session");
    
    if (sessionData) {
      const user = JSON.parse(sessionData);
      setUserData(user);
      setSettingsData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        city: user.city || "",
        state: user.state || "",
        interests: user.interests || [],
      });
      setIsLoading(false);
    } else {
      // No session, redirect to sign in
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load user's donations from localStorage
  useEffect(() => {
    if (userData?.email) {
      const userDonationsKey = `pairwell_donations_${userData.email}`;
      const storedDonations = localStorage.getItem(userDonationsKey);
      if (storedDonations) {
        setDonations(JSON.parse(storedDonations));
      }
    }
  }, [userData]);

  // Load user's notifications from localStorage
  useEffect(() => {
    if (userData?.email) {
      const userNotificationsKey = `pairwell_notifications_${userData.email}`;
      const storedNotifications = localStorage.getItem(userNotificationsKey);
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    }
  }, [userData]);

  // Handle tab navigation from URL query parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'donations', 'notifications', 'settings', 'privacy', 'payment'].includes(tab)) {
      setActiveTab(tab as "overview" | "donations" | "notifications" | "settings" | "privacy" | "payment");
    }
  }, [searchParams]);

  const handleSignOut = () => {
    localStorage.removeItem("pairwell_session");
    sessionStorage.removeItem("pairwell_session");
    navigate("/");
  };

  const toggleNotificationRead = (notificationId: number) => {
    if (!userData?.email) return;

    const updatedNotifications = notifications.map(n =>
      n.id === notificationId ? { ...n, read: !n.read } : n
    );
    setNotifications(updatedNotifications);

    // Save to localStorage
    const userNotificationsKey = `pairwell_notifications_${userData.email}`;
    localStorage.setItem(userNotificationsKey, JSON.stringify(updatedNotifications));
  };

  const handleViewCampaign = (notification: any) => {
    // Try to find the campaign by name
    const campaigns = JSON.parse(localStorage.getItem("pairwell_campaigns") || "[]");
    const campaign = campaigns.find((c: any) => c.name === notification.nonprofit);

    if (campaign) {
      navigate(`/campaign/${campaign.id}`, {
        state: { from: 'donor-dashboard', tab: 'notifications' }
      });
    }
  };

  const handleMarkAllAsRead = () => {
    if (!userData?.email) return;

    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);

    // Save to localStorage
    const userNotificationsKey = `pairwell_notifications_${userData.email}`;
    localStorage.setItem(userNotificationsKey, JSON.stringify(updatedNotifications));
  };

  const calculateTotalDonated = () => {
    return donations.reduce((sum, donation) => sum + donation.amount, 0);
  };

  const calculateMonthlyRecurring = () => {
    return donations
      .filter(d => d.recurring)
      .reduce((sum, donation) => {
        // Convert all recurring donations to monthly equivalent
        const frequency = donation.recurringFrequency || "monthly";
        let monthlyAmount = donation.amount;

        if (frequency === "weekly") {
          monthlyAmount = donation.amount * 4.33; // Average weeks per month
        } else if (frequency === "quarterly") {
          monthlyAmount = donation.amount / 3;
        } else if (frequency === "annually") {
          monthlyAmount = donation.amount / 12;
        }

        return sum + monthlyAmount;
      }, 0);
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: { [key: string]: string } = {
      weekly: "Weekly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      annually: "Annually"
    };
    return labels[frequency] || "Monthly";
  };

  const formatNotificationMessage = (message: string) => {
    // Replace /week, /month, /quarter, /year with " per " format
    return message
      .replace(/\/week/g, " per week")
      .replace(/\/month/g, " per month")
      .replace(/\/quarter/g, " per quarter")
      .replace(/\/year/g, " per year");
  };

  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#feb705] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-black">Loading your account...</p>
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
                Welcome back, {userData?.firstName}!
              </h1>
              <p className="text-lg text-gray-600">
                Manage your donations and account settings
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
                      setActiveTab("donations");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "donations" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Heart size={20} />
                    My Donations
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
                  <button
                    onClick={() => {
                      setActiveTab("privacy");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "privacy" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Lock size={20} />
                    Privacy & Security
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("payment");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "payment" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard size={20} />
                    Payment Methods
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
                      setActiveTab("donations");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "donations" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Heart size={20} />
                    My Donations
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
                  <button
                    onClick={() => {
                      setActiveTab("privacy");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "privacy" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Lock size={20} />
                    Privacy & Security
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("payment");
                      setDashboardMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                      activeTab === "payment" 
                        ? "bg-[#feb705] text-[#023047]" 
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard size={20} />
                    Payment Methods
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-600">Total Donated</h3>
                        <DollarSign className="text-[#feb705]" size={24} />
                      </div>
                      <p className="text-3xl font-bold text-black">${calculateTotalDonated().toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Lifetime contributions</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-600">Monthly Recurring</h3>
                        <Calendar className="text-[#feb705]" size={24} />
                      </div>
                      <p className="text-3xl font-bold text-black">${calculateMonthlyRecurring().toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mt-1">Monthly equivalent</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-600">Nonprofits Supported</h3>
                        <Building2 className="text-[#feb705]" size={24} />
                      </div>
                      <p className="text-3xl font-bold text-black">{new Set(donations.map(d => d.nonprofit)).size}</p>
                      <p className="text-sm text-gray-500 mt-1">Organizations</p>
                    </div>
                  </div>

                  {/* Recent Donations */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Recent Donations</h2>
                    <div className="space-y-4">
                      {donations.length > 0 ? (
                        donations.slice(0, 3).map(donation => (
                          <div key={donation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#feb705] transition-colors">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-black">{donation.nonprofit}</h3>
                              <p className="text-sm text-gray-600">{donation.category} • {formatDate(donation.date)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-[#023047]">${donation.amount.toLocaleString()}</p>
                              {donation.recurring && (
                                <span className="text-xs bg-[#feb705] text-[#023047] px-2 py-1 rounded-full font-bold">
                                  {getFrequencyLabel(donation.recurringFrequency || "monthly")}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p className="text-lg mb-2">No donations yet</p>
                          <p className="text-sm">Start making a difference by donating to a campaign!</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setActiveTab("donations")}
                      className="w-full mt-4 text-[#023047] font-bold py-3 border-2 border-[#023047] rounded-lg hover:bg-[#023047] hover:text-white transition-colors"
                    >
                      View All Donations
                    </button>
                  </div>

                  {/* Recent Notifications */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-black mb-4">Recent Updates</h2>
                    <div className="space-y-3">
                      {notifications.length > 0 ? (
                        notifications.slice(0, 3).map(notification => (
                          <div
                            key={notification.id}
                            className={`p-4 border rounded-lg ${
                              !notification.read ? "border-[#feb705] bg-[#fffbf0]" : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Bell className={!notification.read ? "text-[#feb705]" : "text-gray-400"} size={20} />
                              <div className="flex-1">
                                <h4 className="font-bold text-base text-black">{notification.nonprofit}</h4>
                                <p className="text-sm text-gray-700 mt-1">{formatNotificationMessage(notification.message)}</p>
                                <p className="text-xs text-gray-500 mt-2">{formatDateTime(notification.date)}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p className="text-lg mb-2">No updates yet</p>
                          <p className="text-sm">Make a donation to receive updates from nonprofits!</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setActiveTab("notifications")}
                      className="w-full mt-4 text-[#023047] font-bold py-3 border-2 border-[#023047] rounded-lg hover:bg-[#023047] hover:text-white transition-colors"
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}

              {/* Donations Tab */}
              {activeTab === "donations" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-black mb-6">My Donations</h2>
                    
                    {/* Filter Options */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <button className="px-4 py-2 bg-[#feb705] text-[#023047] font-bold rounded-lg">All</button>
                      <button className="px-4 py-2 border border-gray-300 text-black font-bold rounded-lg hover:border-[#feb705] transition-colors">Recurring</button>
                      <button className="px-4 py-2 border border-gray-300 text-black font-bold rounded-lg hover:border-[#feb705] transition-colors">One-time</button>
                      <button className="px-4 py-2 border border-gray-300 text-black font-bold rounded-lg hover:border-[#feb705] transition-colors">2026</button>
                    </div>

                    {/* Donations List */}
                    <div className="space-y-4">
                      {donations.length > 0 ? (
                        donations.map(donation => (
                          <div key={donation.id} className="p-5 border-2 border-gray-200 rounded-lg hover:border-[#feb705] transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-bold text-lg text-black">{donation.nonprofit}</h3>
                                  {donation.recurring && (
                                    <span className="text-xs bg-[#feb705] text-[#023047] px-2 py-1 rounded-full font-bold">
                                      {getFrequencyLabel(donation.recurringFrequency || "monthly")}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{donation.category}</p>
                                <p className="text-sm text-gray-500">{formatDate(donation.date, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-[#023047]">${donation.amount.toLocaleString()}</p>
                                  <p className="text-xs text-green-600 font-bold flex items-center gap-1 justify-end">
                                    <Check size={14} />
                                    {donation.status}
                                  </p>
                                </div>
                                <button className="text-[#023047] hover:text-[#feb705] transition-colors">
                                  <ChevronRight size={24} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Heart size={64} className="mx-auto mb-4 text-gray-300" />
                          <p className="text-xl font-bold mb-2">No donations yet</p>
                          <p className="text-sm mb-6">Start making a difference by donating to a campaign!</p>
                          <Link to="/directory">
                            <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg hover:bg-[#e5a605] transition-colors">
                              Explore Campaigns
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Download Tax Receipt Button */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button className="w-full md:w-auto bg-[#023047] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#034a6b] transition-colors">
                        Download 2026 Tax Receipt
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-black">Notifications</h2>
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-[#023047] font-bold hover:text-[#feb705] transition-colors"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="space-y-3">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-5 border-2 rounded-lg transition-colors ${
                              !notification.read
                                ? "border-[#feb705] bg-[#fffbf0]"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-start gap-4 mb-3">
                              <div className={`p-2 rounded-full ${!notification.read ? "bg-[#feb705]" : "bg-gray-200"}`}>
                                <Bell className={!notification.read ? "text-[#023047]" : "text-gray-500"} size={20} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-base text-black">{notification.nonprofit}</h4>
                                  {!notification.read && (
                                    <span className="text-xs bg-[#feb705] text-[#023047] px-2 py-1 rounded-full font-bold">New</span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{formatNotificationMessage(notification.message)}</p>
                                <p className="text-xs text-gray-500">{formatDateTime(notification.date)}</p>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                              <button
                                onClick={() => toggleNotificationRead(notification.id)}
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#023047] transition-colors"
                                title={notification.read ? "Mark as unread" : "Mark as read"}
                              >
                                {notification.read ? (
                                  <CheckCircle2 size={20} className="text-[#023047]" />
                                ) : (
                                  <Circle size={20} className="text-gray-400" />
                                )}
                                <span className="font-medium">
                                  {notification.read ? "Mark as unread" : "Mark as read"}
                                </span>
                              </button>

                              <button
                                onClick={() => handleViewCampaign(notification)}
                                className="flex items-center gap-2 text-sm text-[#023047] hover:text-[#feb705] font-medium transition-colors"
                                title="View campaign"
                              >
                                <ExternalLink size={18} />
                                <span>View Event</span>
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Bell size={64} className="mx-auto mb-4 text-gray-300" />
                          <p className="text-xl font-bold mb-2">No notifications yet</p>
                          <p className="text-sm mb-6">You'll receive updates here when you donate to campaigns!</p>
                          <Link to="/directory">
                            <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg hover:bg-[#e5a605] transition-colors">
                              Explore Campaigns
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notification Preferences */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-black mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-bold text-black">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationPrefs.emailNotifications}
                          onChange={(e) => setNotificationPrefs({...notificationPrefs, emailNotifications: e.target.checked})}
                          className="w-5 h-5 accent-[#feb705]"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-bold text-black">Nonprofit Updates</p>
                          <p className="text-sm text-gray-600">Get updates from organizations you support</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationPrefs.nonprofitUpdates}
                          onChange={(e) => setNotificationPrefs({...notificationPrefs, nonprofitUpdates: e.target.checked})}
                          className="w-5 h-5 accent-[#feb705]"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-bold text-black">Monthly Impact Reports</p>
                          <p className="text-sm text-gray-600">See the difference your donations make</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationPrefs.monthlyReports}
                          onChange={(e) => setNotificationPrefs({...notificationPrefs, monthlyReports: e.target.checked})}
                          className="w-5 h-5 accent-[#feb705]"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-bold text-black">Tax Receipts</p>
                          <p className="text-sm text-gray-600">Automatic tax documentation</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationPrefs.taxReceipts}
                          onChange={(e) => setNotificationPrefs({...notificationPrefs, taxReceipts: e.target.checked})}
                          className="w-5 h-5 accent-[#feb705]"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-bold text-black">Marketing Emails</p>
                          <p className="text-sm text-gray-600">Promotional content and newsletters</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationPrefs.marketingEmails}
                          onChange={(e) => setNotificationPrefs({...notificationPrefs, marketingEmails: e.target.checked})}
                          className="w-5 h-5 accent-[#feb705]"
                        />
                      </label>
                    </div>
                    <button className="w-full mt-6 bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg hover:bg-[#e5a605] transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">Account Settings</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={settingsData.firstName}
                          onChange={(e) => setSettingsData({...settingsData, firstName: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={settingsData.lastName}
                          onChange={(e) => setSettingsData({...settingsData, lastName: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-base text-black mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settingsData.email}
                        onChange={(e) => setSettingsData({...settingsData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={settingsData.city}
                          onChange={(e) => setSettingsData({...settingsData, city: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-base text-black mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={settingsData.state}
                          onChange={(e) => setSettingsData({...settingsData, state: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-base text-black mb-2">
                        Change Password
                      </label>
                      <button 
                        type="button"
                        className="text-[#023047] font-bold hover:text-[#feb705] transition-colors"
                      >
                        Update Password →
                      </button>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        className="w-full md:w-auto bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg hover:bg-[#e5a605] transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
                    <div className="space-y-4">
                      <button className="w-full md:w-auto px-6 py-3 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                        Deactivate Account
                      </button>
                      <p className="text-sm text-gray-600">
                        Deactivating your account will temporarily disable it. You can reactivate it anytime.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-6">
                    {/* Privacy Settings */}
                    <div>
                      <h3 className="text-xl font-bold text-black mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block font-bold text-base text-black mb-2">
                            Profile Visibility
                          </label>
                          <select
                            value={privacySettings.profileVisibility}
                            onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#feb705] focus:outline-none"
                          >
                            <option value="public">Public</option>
                            <option value="nonprofits">Nonprofits Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>

                        <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-bold text-black">Show Donation History</p>
                            <p className="text-sm text-gray-600">Let nonprofits see your donation history</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.showDonations}
                            onChange={(e) => setPrivacySettings({...privacySettings, showDonations: e.target.checked})}
                            className="w-5 h-5 accent-[#feb705]"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-bold text-black">Allow Contact from Nonprofits</p>
                            <p className="text-sm text-gray-600">Organizations can send you messages</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.allowContact}
                            onChange={(e) => setPrivacySettings({...privacySettings, allowContact: e.target.checked})}
                            className="w-5 h-5 accent-[#feb705]"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-bold text-black">Share Data with Partners</p>
                            <p className="text-sm text-gray-600">Help improve our service</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.shareData}
                            onChange={(e) => setPrivacySettings({...privacySettings, shareData: e.target.checked})}
                            className="w-5 h-5 accent-[#feb705]"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-black mb-4">Security</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Shield className="text-green-600" size={24} />
                              <div>
                                <p className="font-bold text-black">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-600">Not enabled</p>
                              </div>
                            </div>
                            <button className="px-6 py-2 bg-[#023047] text-white font-bold rounded-lg hover:bg-[#034a6b] transition-colors">
                              Enable
                            </button>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Lock className="text-[#feb705]" size={24} />
                              <div>
                                <p className="font-bold text-black">Password</p>
                                <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                              </div>
                            </div>
                            <button className="px-6 py-2 border-2 border-[#023047] text-[#023047] font-bold rounded-lg hover:bg-[#023047] hover:text-white transition-colors">
                              Change
                            </button>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Mail className="text-[#feb705]" size={24} />
                              <div>
                                <p className="font-bold text-black">Email Verification</p>
                                <p className="text-sm text-green-600 font-bold">Verified ✓</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full md:w-auto bg-[#feb705] text-[#023047] font-bold px-8 py-3 rounded-lg hover:bg-[#e5a605] transition-colors">
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === "payment" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">Payment Methods</h2>
                  
                  <div className="space-y-6">
                    {/* Saved Payment Methods */}
                    <div>
                      <h3 className="text-lg font-bold text-black mb-4">Saved Cards</h3>
                      <div className="space-y-3">
                        <div className="p-5 border-2 border-[#feb705] bg-[#fffbf0] rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                                VISA
                              </div>
                              <div>
                                <p className="font-bold text-black">•••• •••• •••• 4242</p>
                                <p className="text-sm text-gray-600">Expires 12/2027</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-[#feb705] text-[#023047] px-3 py-1 rounded-full font-bold">Default</span>
                              <button className="text-red-600 hover:text-red-800 text-sm font-bold">Remove</button>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">
                                MC
                              </div>
                              <div>
                                <p className="font-bold text-black">•••• •••• •••• 8888</p>
                                <p className="text-sm text-gray-600">Expires 06/2026</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-[#023047] hover:text-[#feb705] text-sm font-bold">Set Default</button>
                              <button className="text-red-600 hover:text-red-800 text-sm font-bold">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full mt-4 border-2 border-[#023047] text-[#023047] font-bold px-8 py-3 rounded-lg hover:bg-[#023047] hover:text-white transition-colors">
                        + Add New Card
                      </button>
                    </div>

                    {/* Bank Account */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-bold text-black mb-4">Bank Account (ACH)</h3>
                      <div className="p-5 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Building2 className="text-[#023047]" size={32} />
                            <div>
                              <p className="font-bold text-black">Chase Bank</p>
                              <p className="text-sm text-gray-600">•••• 1234</p>
                            </div>
                          </div>
                          <button className="text-red-600 hover:text-red-800 text-sm font-bold">Remove</button>
                        </div>
                      </div>

                      <button className="w-full mt-4 border-2 border-[#023047] text-[#023047] font-bold px-8 py-3 rounded-lg hover:bg-[#023047] hover:text-white transition-colors">
                        + Add Bank Account
                      </button>
                    </div>

                    {/* Billing Address */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-bold text-black mb-4">Billing Address</h3>
                      <div className="p-5 border border-gray-200 rounded-lg">
                        <p className="text-black">{settingsData.firstName} {settingsData.lastName}</p>
                        <p className="text-gray-600">{settingsData.city}, {settingsData.state}</p>
                      </div>
                      <button className="mt-3 text-[#023047] font-bold hover:text-[#feb705] transition-colors">
                        Update Address →
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
    </div>
  );
}
