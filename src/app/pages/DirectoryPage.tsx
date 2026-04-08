//import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import imgCharity1 from "figma:asset/911838239dec33e6408aa8ba26e649aff43d37f0.png";
import imgCharity2 from "figma:asset/d56183714a64e74e111307986e1c7ba9755e7699.png";
import imgCharity3 from "figma:asset/0599b740cb25777d1c667ec655a275a6819354c4.png";
import imgImage3 from "figma:asset/3686d65dc265e3e1d05392eb8ef8d1634305858e.png";
import imgImage from "figma:asset/d56183714a64e74e111307986e1c7ba9755e7699.png";
import imgImage2 from "figma:asset/0599b740cb25777d1c667ec655a275a6819354c4.png";
import imgProject1 from "figma:asset/3686d65dc265e3e1d05392eb8ef8d1634305858e.png";
import imgProject2 from "figma:asset/6cb1cdd2b3b1aaf0a20c2c03f27d50573cd1bb28.png";
import imgProject3 from "figma:asset/dbb0629d60dcda987588b4483f8e1a3612f8c641.png";
import imgIStock144319931 from "figma:asset/911838239dec33e6408aa8ba26e649aff43d37f0.png";
import imgImage5 from "figma:asset/dbb0629d60dcda987588b4483f8e1a3612f8c641.png";
import imgImage4 from "figma:asset/6cb1cdd2b3b1aaf0a20c2c03f27d50573cd1bb28.png";
import imgImpactAction from "figma:asset/947a5c11a6506690b8192b8493cdd0b2144f68d6.png";
import imgHeroDecor from "figma:asset/c685eeaeed47d3e0ec62a399e8f6319254305ff9.png";
import imgGiveYourWayBg from "figma:asset/ee905a18511db33a16fb635840c31333da9ecf6d.png";
import { useState, useEffect } from "react";
import { Menu, X, Search, Heart, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function DirectoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(2);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load specific campaigns by name for Discover Charities and Events section
  const getCharityCampaigns = () => {
    const stored = localStorage.getItem("pairwell_campaigns");
    if (stored) {
      const storedCampaigns = JSON.parse(stored);
      const campaignNames = ["Food Drive", "Visit Older Adults", "City Clean Up"];
      return campaignNames.map(name =>
        storedCampaigns.find((c: any) => c.name === name)
      ).filter(Boolean); // Remove any undefined entries
    }
    return [];
  };

  const charityCampaigns = getCharityCampaigns();
  const charityImages = [imgImage3, imgImage, imgImage2];

  // Load campaigns from localStorage for Project-Based Giving section
  const getProjectCampaigns = () => {
    const stored = localStorage.getItem("pairwell_campaigns");
    if (stored) {
      const storedCampaigns = JSON.parse(stored);
      // Return only active campaigns, limit to 3
      return storedCampaigns.filter((c: any) => c.status === "active").slice(0, 3);
    }
    return [];
  };

  const projectCampaigns = getProjectCampaigns();
  const projectImages = [imgIStock144319931, imgImage5, imgImage4];

  const charities = [
    {
      title: "Charity #1",
      description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.",
      imageUrl: imgCharity1
    },
    {
      title: "Charity #2",
      description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.",
      imageUrl: imgCharity2
    },
    {
      title: "Charity #3",
      description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.",
      imageUrl: imgCharity3
    }
  ];

  const projects = [
    {
      title: "Project #1",
      description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.",
      imageUrl: imgProject1
    },
    {
      title: "Project #2",
      description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.",
      imageUrl: imgProject2
    },
    {
      title: "Project #3",
      description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.",
      imageUrl: imgProject3
    }
  ];

  const faqs = [
    {
      question: "How do I find a nonprofit that aligns with my interests?",
      answer: "Use our search tool to explore by cause, location, or specific project needs."
    },
    {
      question: "Can I track how my donation is used?",
      answer: "Yes! All nonprofits provide transparency on how donations are used and share regular updates on project progress."
    },
    {
      question: "How do I know if a nonprofit is reputable?",
      answer: "All nonprofits on PairWell are verified and must meet our strict verification standards."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Row - Dark Blue with Auth Buttons */}
        <AuthHeader />
        
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

      {/* Hero Section with Background */}
      <section className="relative bg-white py-12 md:py-16 px-4 md:px-8 overflow-hidden">
        {/* Decorative Background Image */}
        <div className="absolute right-0 top-0 h-full w-auto hidden md:block pointer-events-none">
          <img 
            src={imgHeroDecor}
            alt=""
            className="h-full w-auto object-contain rotate-180 scale-120"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black">
              Make An Impact Today
            </h1>
            <p className="text-base md:text-lg text-black">
              Search and explore nonprofits, charities, and impactful projects that align with your values. Whether you're passionate about education, environmental conservation, healthcare, or local community programs, PairWell makes it easy to find and support the right cause.
            </p>
            <div className="relative max-w-md flex">
              <input
                type="text"
                placeholder="Search nonprofits, causes, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-l-lg border-2 border-[#feb705] focus:outline-none text-base"
              />
              <button className="bg-[#feb705] text-[#023047] font-bold px-6 py-3 rounded-r-lg hover:bg-[#e5a605] transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Charities and Events */}
      <section className="bg-[#f5f5f5] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-black">
              Discover Charities and Events
            </h2>
            <Link to="/directory">
              <button className="hidden md:block bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                View All
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {charityCampaigns.length > 0 ? (
              charityCampaigns.map((campaign: any, index: number) => (
                <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-[rgba(2,48,71,0.2)]">
                  <img src={charityImages[index]} alt={campaign.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl md:text-2xl text-black mb-4">{campaign.name}</h3>
                    <p className="text-sm md:text-base text-black mb-4">
                      {campaign.description}
                    </p>
                    <Link
                      to={`/campaign/${campaign.id}`}
                      className="text-[#feb705] hover:text-[#023047] font-semibold transition-colors"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              [
                {
                  title: "Food Drive",
                  description: "Join us in collecting non-perishable food items for local families experiencing food insecurity.",
                  image: imgImage3
                },
                {
                  title: "Visit Older Adults",
                  description: "Volunteer to spend time with seniors in our community.",
                  image: imgImage
                },
                {
                  title: "City Clean Up",
                  description: "Help keep our city beautiful by participating in our community clean-up events.",
                  image: imgImage2
                }
              ].map((charity, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-[rgba(2,48,71,0.2)]">
                  <img src={charity.image} alt={charity.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl md:text-2xl text-black mb-4">{charity.title}</h3>
                    <p className="text-sm md:text-base text-black mb-4">
                      {charity.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-12 md:hidden">
            <Link to="/directory">
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                View All
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project-Based Giving */}
      <section className="bg-[#f5f5f5] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-black">
              Project-Based Giving
            </h2>
            <Link to="/directory">
              <button className="hidden md:block bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                View All
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectCampaigns.length > 0 ? (
              projectCampaigns.map((campaign: any, index: number) => (
                <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-[rgba(2,48,71,0.2)]">
                  <img src={projectImages[index]} alt={campaign.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl md:text-2xl text-black mb-4">{campaign.name}</h3>
                    <p className="text-sm md:text-base text-black mb-4">
                      {campaign.description}
                    </p>
                    <Link
                      to={`/campaign/${campaign.id}`}
                      className="text-[#feb705] hover:text-[#023047] font-semibold transition-colors"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              [
                { title: "Project #1", description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.", image: imgIStock144319931 },
                { title: "Project #2", description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.", image: imgImage5 },
                { title: "Project #3", description: "A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.", image: imgImage4 }
              ].map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-[rgba(2,48,71,0.2)]">
                  <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl md:text-2xl text-black mb-4">{project.title}</h3>
                    <p className="text-sm md:text-base text-black">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-12 md:hidden">
            <Link to="/directory">
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                View All
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* See the Impact in Action */}
      <section className="bg-[#fdc485] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={imgImpactAction}
                alt="Impact in action"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-bold text-3xl md:text-4xl text-black">
                See the Impact in Action
              </h2>
              <div className="space-y-4 text-base md:text-lg text-black">
                <p>
                  <span className="font-bold">Live Progress Updates:</span> See how campaigns are performing and how close they are to their funding goals.
                </p>
                <p>
                  <span className="font-bold">Campaign Highlights:</span> Follow real-time updates from nonprofits as they reach new milestones.
                </p>
                <p>
                  <span className="font-bold">Visual Impact:</span> View photos and videos of projects in action, showing exactly how donations are being used.
                </p>
              </div>
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                Search Nonprofits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Give Your Way */}
      <section className="bg-white py-[100px] px-4 md:px-8 relative overflow-hidden">
        {/* Decorative Background Image */}
        <div className="absolute inset-0 w-full h-full hidden md:block pointer-events-none">
          <img 
            src={imgGiveYourWayBg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-bold text-3xl md:text-4xl text-black mb-12 text-center md:text-left">
            Give Your Way
          </h2>
          <div className="space-y-6 mb-8 max-w-2xl">
            <div>
              <p className="text-base md:text-lg text-black">
                <span className="font-bold">One-Time Donations:</span> Make a quick and secure contribution to a cause you care about.
              </p>
            </div>
            <div>
              <p className="text-base md:text-lg text-black">
                <span className="font-bold">Recurring Giving:</span> Set up automated donations for ongoing impact.
              </p>
            </div>
            <div>
              <p className="text-base md:text-lg text-black">
                <span className="font-bold">Matching Contributions:</span> Multiply your impact by joining corporate or community matching programs.
              </p>
            </div>
          </div>
          <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
            Donate Today
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f4f4f4] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-black mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-black/20 pb-4">
                <button
                  className="w-full flex justify-between items-center text-left font-bold text-lg md:text-xl text-black py-2"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown 
                    className={`transition-transform flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openFaq === index && (
                  <p className="text-base md:text-lg text-black mt-2">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
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
    </div>
  );
}
