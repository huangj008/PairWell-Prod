import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Heart,
  Calendar,
  DollarSign,
  Users,
  Share2,
  MapPin,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ArrowLeft
} from "lucide-react";
import { Link, useNavigate, useParams, useLocation } from "react-router";
import { AuthHeader } from "../components/AuthHeader";
import { DonationModal } from "../components/DonationModal";

export default function CampaignDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [campaignRaised, setCampaignRaised] = useState(0);

  // Load campaign data from localStorage - in a real app, this would come from an API
  const getDefaultCampaigns = () => [
    {
      id: 1,
      name: "Clean Water Initiative",
      description: "Providing clean water access to rural communities",
      fullDescription: "Our Clean Water Initiative aims to bring safe, accessible drinking water to rural communities that currently lack this basic necessity. Through the installation of water filtration systems and wells, we're working to improve health outcomes and quality of life for thousands of families.",
      type: "campaign",
      goal: 25000,
      raised: 18750,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      donors: 156,
      location: "Rural Communities, East Region",
      organizer: "Water Access Foundation",
      impact: "500+ families will receive clean water access"
    },
    {
      id: 2,
      name: "Education for All",
      description: "School supplies and scholarships for underprivileged children",
      fullDescription: "Education for All provides school supplies, books, and scholarships to underprivileged children who lack the resources to pursue their education. We believe every child deserves access to quality education regardless of their economic background.",
      type: "campaign",
      goal: 15000,
      raised: 4200,
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      donors: 48,
      location: "Urban Schools, Central District",
      organizer: "Education Access Coalition",
      impact: "200 students will receive school supplies and support"
    },
    {
      id: 3,
      name: "Community Food Drive",
      description: "Annual food collection for local families in need",
      fullDescription: "Join us for our annual Community Food Drive where we collect non-perishable food items, fresh produce, and essential groceries for local families experiencing food insecurity. This event brings our community together to support our neighbors in need.",
      type: "event",
      goal: 10000,
      raised: 10500,
      status: "completed",
      startDate: "2023-11-01",
      endDate: "2023-12-15",
      donors: 125,
      location: "Community Center, 123 Main Street",
      organizer: "Local Food Bank Alliance",
      impact: "150 families will receive food assistance"
    },
    {
      id: 4,
      name: "Food Drive",
      description: "Join us in collecting non-perishable food items for local families experiencing food insecurity. Every donation helps provide nutritious meals to those in need.",
      fullDescription: "Join us in collecting non-perishable food items for local families experiencing food insecurity. Every donation helps provide nutritious meals to those in need. Our food drive collects essential groceries and distributes them to families who need support, ensuring no one in our community goes hungry.",
      type: "event",
      goal: 8000,
      raised: 5200,
      status: "active",
      startDate: "2026-03-01",
      endDate: "2026-05-31",
      donors: 78,
      location: "Community Center, Downtown",
      organizer: "Community Food Alliance",
      impact: "100+ families will receive food assistance"
    },
    {
      id: 5,
      name: "Visit Older Adults",
      description: "Volunteer to spend time with seniors in our community. Share stories, play games, and bring joy to older adults who may be experiencing loneliness.",
      fullDescription: "Volunteer to spend time with seniors in our community. Share stories, play games, and bring joy to older adults who may be experiencing loneliness. Our program connects volunteers with elderly community members for regular visits, companionship, and activities that enrich their lives.",
      type: "event",
      goal: 5000,
      raised: 3400,
      status: "active",
      startDate: "2026-02-15",
      endDate: "2026-12-15",
      donors: 52,
      location: "Senior Living Center, Westside",
      organizer: "Elder Care Volunteers",
      impact: "50+ seniors will receive regular companionship"
    },
    {
      id: 6,
      name: "City Clean Up",
      description: "Help keep our city beautiful by participating in our community clean-up events. Together, we can make a positive impact on our environment and neighborhoods.",
      fullDescription: "Help keep our city beautiful by participating in our community clean-up events. Together, we can make a positive impact on our environment and neighborhoods. Volunteers gather to clean parks, streets, and public spaces, removing litter and promoting environmental stewardship.",
      type: "event",
      goal: 6000,
      raised: 4100,
      status: "active",
      startDate: "2026-04-01",
      endDate: "2026-06-30",
      donors: 65,
      location: "City Parks & Public Spaces",
      organizer: "Green City Initiative",
      impact: "10+ parks and neighborhoods will be cleaned"
    },
    {
      id: 7,
      name: "Forest Clean Up",
      description: "Join us in protecting our forests by removing litter, invasive species, and debris. Help preserve natural habitats and maintain the beauty of our woodland areas.",
      fullDescription: "Join us in protecting our forests by removing litter, invasive species, and debris. Help preserve natural habitats and maintain the beauty of our woodland areas. Our forest clean-up initiatives work to restore and protect natural ecosystems, ensuring wildlife habitats remain healthy and accessible for future generations.",
      type: "event",
      goal: 7500,
      raised: 4800,
      status: "active",
      startDate: "2026-05-01",
      endDate: "2026-08-31",
      donors: 89,
      location: "National Forest Reserve, North Region",
      organizer: "Forest Conservation Alliance",
      impact: "5+ forest areas will be restored and protected"
    },
    {
      id: 8,
      name: "Affordable Healthcare",
      description: "Support our mission to provide accessible healthcare services to underserved communities. Your donation helps fund medical supplies, equipment, and care for those in need.",
      fullDescription: "Support our mission to provide accessible healthcare services to underserved communities. Your donation helps fund medical supplies, equipment, and care for those in need. We operate mobile clinics, provide free health screenings, and ensure everyone has access to quality medical care regardless of their financial situation.",
      type: "campaign",
      goal: 20000,
      raised: 12500,
      status: "active",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      donors: 145,
      location: "Underserved Communities, Multiple Locations",
      organizer: "Healthcare Access Foundation",
      impact: "300+ patients will receive free healthcare services"
    },
    {
      id: 9,
      name: "Community Programs",
      description: "Empower our community through educational workshops, skills training, and social programs that bring people together and create lasting positive change.",
      fullDescription: "Empower our community through educational workshops, skills training, and social programs that bring people together and create lasting positive change. Our comprehensive community programs include job training, literacy classes, youth mentorship, and social events that strengthen community bonds and provide opportunities for growth.",
      type: "campaign",
      goal: 12000,
      raised: 8300,
      status: "active",
      startDate: "2026-02-01",
      endDate: "2026-11-30",
      donors: 112,
      location: "Community Center, Downtown",
      organizer: "Community Empowerment Network",
      impact: "500+ community members will participate in programs"
    }
  ];

  const getCampaigns = () => {
    const stored = localStorage.getItem("pairwell_campaigns");
    if (stored) {
      const storedCampaigns = JSON.parse(stored);
      // Add default fields for campaigns that don't have them (newly created ones)
      return storedCampaigns.map((camp: any) => ({
        ...camp,
        fullDescription: camp.fullDescription || camp.description || "Campaign description",
        location: camp.location || "Local Community",
        organizer: camp.organizer || "Community Organization",
        impact: camp.impact || "Making a positive impact in our community",
        raised: camp.raised ?? 0,
        goal: camp.goal ?? 10000,
        donors: camp.donors ?? 0,
        status: camp.status || "active"
      }));
    }
    return getDefaultCampaigns();
  };

  const campaigns = getCampaigns();
  const campaign = campaigns.find(c => c.id === parseInt(id || "0"));

  // Helper function to format date strings without timezone issues
  const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
    if (!dateString) return '';
    // Parse the date string as YYYY-MM-DD and treat it as local date
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-US', options || {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize campaign raised amount
  useEffect(() => {
    if (campaign) {
      setCampaignRaised(campaign.raised);
    }
  }, [campaign]);

  // Handle successful donation
  const handleDonationSuccess = (amount: number) => {
    setCampaignRaised(prev => prev + amount);
    // Optionally update localStorage
    const stored = localStorage.getItem("pairwell_campaigns");
    if (stored && campaign) {
      const campaigns = JSON.parse(stored);
      const updatedCampaigns = campaigns.map((c: any) => {
        if (c.id === campaign.id) {
          return { ...c, raised: c.raised + amount };
        }
        return c;
      });
      localStorage.setItem("pairwell_campaigns", JSON.stringify(updatedCampaigns));
    }
  };

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#023047] mb-4">Campaign Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-[#feb705] hover:text-[#023047] font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.min((campaignRaised / campaign.goal) * 100, 100);

  // Calculate days left using proper date parsing
  const calculateDaysLeft = () => {
    if (!campaign.endDate) return 0;
    const [year, month, day] = campaign.endDate.split('-').map(Number);
    const endDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft();

  const copyToClipboard = (text: string) => {
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch(() => {
        // Fallback to old method
        fallbackCopyToClipboard(text);
      });
    } else {
      // Use fallback for older browsers or non-secure contexts
      fallbackCopyToClipboard(text);
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
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${campaign.name} on PairWell!`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        copyToClipboard(url);
        break;
    }
    setShareDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Row - Dark Blue with Auth Buttons using AuthHeader component */}
        <AuthHeader />

        {/* Second Row - Logo and Nav */}
        <div className={`py-4 px-4 md:px-8 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
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

      {/* Hero Section */}
      <div className="pb-12 bg-gradient-to-br from-[#023047] to-[#035680]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
            onClick={() => {
              const state = location.state as { from?: string; tab?: string } | null;
              if (state?.from === 'dashboard' && state?.tab) {
                navigate(`/nonprofit-account?tab=${state.tab}`);
              } else if (state?.from === 'donor-dashboard' && state?.tab) {
                navigate(`/donor-account?tab=${state.tab}`);
              } else {
                navigate(-1);
              }
            }}
            className="flex items-center gap-2 text-white hover:text-[#feb705] transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-block px-3 py-1 bg-[#feb705] text-[#023047] rounded-full text-sm font-semibold mb-4">
                {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {campaign.name}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {campaign.description}
              </p>
              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>By {campaign.organizer}</span>
                </div>
              </div>
            </div>

            {/* Donation Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-3xl font-bold text-[#023047]">
                    ${campaignRaised.toLocaleString()}
                  </div>
                  <div className="text-gray-600">
                    of ${campaign.goal.toLocaleString()} goal
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-[#feb705] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {campaign.donors} donors
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowDonationModal(true)}
                className="w-full bg-[#feb705] text-[#023047] font-bold py-4 rounded-full hover:bg-[#023047] hover:text-white transition-all mb-3"
              >
                Donate Now
              </button>

              <div className="relative">
                <button
                  onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
                  className="w-full border-2 border-[#023047] text-[#023047] font-semibold py-3 rounded-full hover:bg-[#023047] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Share Campaign
                </button>

                {shareDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Facebook size={18} className="text-blue-600" />
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Twitter size={18} className="text-sky-500" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Linkedin size={18} className="text-blue-700" />
                      <span>Share on LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Copy size={18} className="text-gray-600" />
                      <span>{copySuccess ? 'Link Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[#023047] mb-4">About This {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {campaign.fullDescription}
              </p>
              <div className="bg-[#feb705]/10 border-l-4 border-[#feb705] p-4 rounded">
                <div className="flex items-start gap-3">
                  <Target className="text-[#feb705] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold text-[#023047] mb-1">Our Goal</h3>
                    <p className="text-gray-700">{campaign.impact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[#023047] mb-6">Campaign Timeline</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#feb705] rounded-full flex items-center justify-center">
                    <Calendar className="text-[#023047]" size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[#023047]">Start Date</div>
                    <div className="text-gray-600">{formatDate(campaign.startDate)}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[#023047]">Current Progress</div>
                    <div className="text-gray-600">{Math.round(progress)}% of goal reached with {campaign.donors} donors</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${daysLeft > 0 ? 'bg-gray-200' : 'bg-green-500'} rounded-full flex items-center justify-center`}>
                    <CheckCircle className={daysLeft > 0 ? 'text-gray-500' : 'text-white'} size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[#023047]">End Date</div>
                    <div className="text-gray-600">{formatDate(campaign.endDate)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[#023047] mb-6">Recent Updates</h2>
              <div className="space-y-4">
                {/* Show "just getting started" message if no donations yet - MOST RECENT */}
                {campaign.raised === 0 && (
                  <div className="border-l-4 border-blue-300 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#023047]">Be the First to Support!</h3>
                      <span className="text-sm text-gray-500">Now</span>
                    </div>
                    <p className="text-gray-700">This campaign just launched and is looking for its first supporters. Your donation can help get this important work off the ground!</p>
                  </div>
                )}

                {/* Show milestone update only if campaign has meaningful progress */}
                {progress >= 25 && campaign.raised > 0 && (
                  <div className="border-l-4 border-[#feb705] pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#023047]">
                        {progress >= 100 ? "Goal Achieved!" : `${Math.floor(progress / 25) * 25}% Milestone Reached!`}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {progress >= 100 ? "Recently" : "2 days ago"}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {progress >= 100
                        ? `We've reached our fundraising goal of $${campaign.goal.toLocaleString()}! Thank you to all ${campaign.donors} donors for your incredible support.`
                        : `We've reached ${Math.round(progress)}% of our fundraising goal! Thank you to all our amazing donors for your continued support.`}
                    </p>
                  </div>
                )}

                {/* Show partnership update only if campaign has some traction */}
                {campaign.donors > 20 && (
                  <div className="border-l-4 border-gray-300 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#023047]">Growing Community Support</h3>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-700">We're grateful for the support from our community and local organizations helping to maximize the impact of this campaign.</p>
                  </div>
                )}

                {/* Campaign launched - always show - OLDEST */}
                <div className="border-l-4 border-gray-300 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[#023047]">
                      {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)} Launched
                    </h3>
                    <span className="text-sm text-gray-500">{formatDate(campaign.startDate)}</span>
                  </div>
                  <p className="text-gray-700">
                    We're thrilled to launch this {campaign.type} and begin making a difference in our community. Join us in {campaign.impact.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Impact Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-[#023047] mb-4">Impact Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#feb705]/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-[#feb705]" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#023047]">${campaign.raised.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Raised</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#023047]/20 rounded-lg flex items-center justify-center">
                    <Users className="text-[#023047]" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#023047]">{campaign.donors}</div>
                    <div className="text-sm text-gray-600">Donors</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#023047]">{Math.round(progress)}%</div>
                    <div className="text-sm text-gray-600">Goal Reached</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-[#023047] mb-4">Organizer</h3>
              <div className="space-y-3">
                <div className="font-semibold text-[#023047] text-lg">{campaign.organizer}</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{campaign.location}</span>
                </div>
                <button className="w-full mt-4 border-2 border-[#023047] text-[#023047] font-semibold py-2 rounded-full hover:bg-[#023047] hover:text-white transition-all">
                  Contact Organizer
                </button>
              </div>
            </div>

            {/* Campaign Type */}
            <div className="bg-gradient-to-br from-[#023047] to-[#035680] rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Campaign Type</h3>
              <p className="text-white/90 mb-4">{campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}</p>
              <div className="bg-white/20 rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} />
                  <span>Verified by PairWell</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>Tax-deductible donations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <li><Link to="/directory" className="hover:text-[#feb705] transition-colors">Directory</Link></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4">For Nonprofits</h3>
              <ul className="space-y-2 text-lg md:text-xl">
                <li><Link to="/nonprofits" className="hover:text-[#feb705] transition-colors">Join PairWell</Link></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4">PairWell</h3>
              <ul className="space-y-2 text-lg md:text-xl">
                <li><a href="#" className="hover:text-[#feb705] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#feb705] transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-lg md:text-xl">Copyright ©2026</p>
          </div>
        </div>
      </footer>

      {/* Donation Modal */}
      {showDonationModal && (
        <DonationModal
          campaignId={campaign.id}
          campaignName={campaign.name}
          onClose={() => setShowDonationModal(false)}
          onSuccess={handleDonationSuccess}
        />
      )}
    </div>
  );
}
