import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

// Import images from Figma
import img9 from "figma:asset/2b06ccfd9ab91d791345a842995eb26a1542167b.png";
import imgGroup4 from "figma:asset/1d8b7c241bc6f29337a06c57f5c8fbbf4c1c97e2.png";
import imgHeroCollage from "figma:asset/41e6c61af349e8ce359acee6b36a51887c270571.png";
import imgIStock680197664 from "figma:asset/1c50b9c02afe4ebd52239b7e09871c218e6d1d1e.png";
import imgIStock144319931 from "figma:asset/911838239dec33e6408aa8ba26e649aff43d37f0.png";
import imgImage from "figma:asset/d56183714a64e74e111307986e1c7ba9755e7699.png";
import imgImage2 from "figma:asset/0599b740cb25777d1c667ec655a275a6819354c4.png";
import imgImage3 from "figma:asset/3686d65dc265e3e1d05392eb8ef8d1634305858e.png";
import imgImage4 from "figma:asset/6cb1cdd2b3b1aaf0a20c2c03f27d50573cd1bb28.png";
import imgImage5 from "figma:asset/dbb0629d60dcda987588b4483f8e1a3612f8c641.png";
import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const projectCampaigns = getProjectCampaigns();
  const projectImages = [imgIStock144319931, imgImage5, imgImage4];
  const charityCampaigns = getCharityCampaigns();
  const charityImages = [imgImage3, imgImage, imgImage2];

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif] m-0 p-0">
      <style dangerouslySetInnerHTML={{__html: `
        .hero-background {
          background-image: url(${imgGroup4});
          background-size: 120%;
          background-position: center center;
          background-repeat: no-repeat;
        }
        @media (max-width: 760px) {
          .hero-background {
            background-image: none;
          }
        }
      `}} />
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

      {/* Combined Nav and Hero Section with Single Background */}
      <div className="relative m-0 hero-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="z-10 space-y-6">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-black">Find. Fund. Empower.</h1>
                <p className="text-lg md:text-xl text-black max-w-2xl">
                  A smarter way to discover and support nonprofits. Connect with causes you care about, track your impact, and simplify giving.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/donors">
                    <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                      Start Giving Today
                    </button>
                  </Link>
                  <Link to="/nonprofits">
                    <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                      Get Funded
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative z-10">
                <img src={imgHeroCollage} alt="People enjoying outdoors" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Discover Charities and Events Section */}
      <section className="bg-[#f5f5f5] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black">Discover Charities and Events</h2>
            <Link to="/directory">
              <button className="hidden md:block bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                View All
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charityCampaigns.length > 0 ? (
              charityCampaigns.map((campaign: any, index: number) => (
                <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-[rgba(2,48,71,0.2)]">
                  <img src={charityImages[index]} alt={campaign.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-2xl text-black mb-4">{campaign.name}</h3>
                    <p className="text-base text-black mb-4">
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
                    <h3 className="font-bold text-2xl text-black mb-4">{charity.title}</h3>
                    <p className="text-base text-black mb-4">
                      {charity.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link to="/directory">
            <button className="md:hidden mt-8 mx-auto block bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
              View All
            </button>
          </Link>
        </div>
      </section>

      {/* Project-Based Giving Section */}
      <section className="bg-[#f5f5f5] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black">Project-Based Giving</h2>
            <Link to="/directory">
              <button className="hidden md:block bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                View All
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectCampaigns.length > 0 ? (
              projectCampaigns.map((campaign: any, index: number) => (
                <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-[rgba(2,48,71,0.2)]">
                  <img src={projectImages[index]} alt={campaign.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-2xl text-black mb-4">{campaign.name}</h3>
                    <p className="text-base text-black mb-4">
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
                    <h3 className="font-bold text-2xl text-black mb-4">{project.title}</h3>
                    <p className="text-base text-black">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="md:hidden mt-8 mx-auto block bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
            View All
          </button>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative bg-[#023047] py-12 md:py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full">
          <img src={img9} alt="Background decoration" className="absolute left-0 top-0 h-full w-auto object-cover" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 items-center">
            {/* Empty left column */}
            <div></div>
            {/* Right column with content */}
            <div className="text-white space-y-6">
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">Who We Are</h2>
              <p className="text-lg md:text-xl">
                PairWell bridges the gap between businesses, individual donors, and nonprofits, making funding seamless and impactful. We empower nonprofits to showcase their projects and connect with funders who align with their mission. Through PairWell, donors can discover opportunities, contribute with confidence, and track their impact—all in one place.
              </p>
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                Learn More PairWell
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Power of Giving Section */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black text-center mb-8">The Power of Giving</h2>
          <p className="text-base md:text-lg text-black text-center max-w-4xl mx-auto mb-12">
            Every contribution—big or small—creates lasting change. When you give through PairWell, you're not just donating money; you're fueling projects, empowering communities, and helping nonprofits turn their missions into reality.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { amount: "$25", image: "https://images.unsplash.com/photo-1759678444893-9c1762e022fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdXBwbGllcyUyMGNoaWxkcmVuJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3MTg3NTAwMXww&ixlib=rb-4.1.0&q=80&w=1080", description: "a child in need gets provided school supplies." },
              { amount: "$50", image: "https://images.unsplash.com/photo-1760624683181-7570791efd52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudGluZyUyMHRyZWVzJTIwZW52aXJvbm1lbnQlMjBmb3Jlc3R8ZW58MXx8fHwxNzcxODc1MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080", description: "100 trees get planted to help combat climate change." },
              { amount: "$100", image: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3VwcGxpZXMlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3MTc4NzI0M3ww&ixlib=rb-4.1.0&q=80&w=1080", description: "underserved communities get critical medical supplies." },
              { amount: "$500+", image: "https://images.unsplash.com/photo-1691795416651-d31a454b4b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3VzaW5nJTIwc2hlbHRlcnxlbnwxfHx8fDE3NzE4NzUwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080", description: "housing programs can help families experiencing hardship." }
            ].map((impact, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-48 h-48 rounded-full overflow-hidden">
                  <img src={impact.image} alt={`Impact for ${impact.amount}`} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-xl md:text-2xl text-black">For Every {impact.amount}</h3>
                <p className="text-base text-black">{impact.description}</p>
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