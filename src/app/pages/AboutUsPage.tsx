import imgGroup4 from "figma:asset/1d8b7c241bc6f29337a06c57f5c8fbbf4c1c97e2.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import { useState, useEffect } from "react";
import { Menu, X, Target, Users, Heart, Building2, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function AboutUsPage() {
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

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      <style dangerouslySetInnerHTML={{__html: `
        .about-hero-background {
          background-image: url(${imgGroup4});
          background-size: 120%;
          background-position: center center;
          background-repeat: no-repeat;
        }
        @media (max-width: 760px) {
          .about-hero-background {
            background-image: none;
          }
        }
      `}} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
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

      {/* Combined Nav and Hero Section with Background */}
      <div className="relative about-hero-background">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-[#023047]">
                About PairWell
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-black">
                Connecting funders and nonprofits to drive meaningful impact
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Our Mission Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-bold text-3xl md:text-4xl text-[#023047] mb-8">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-black leading-relaxed">
              PairWell is a nonprofit fundraising platform dedicated to connecting passionate donors with nonprofits that are making a real difference in the world. We believe that every organization deserves the resources to fulfill their mission, and every donor deserves transparency and impact from their contributions.
            </p>
            <p className="text-lg md:text-xl text-black leading-relaxed">
              By creating a direct connection between funders and nonprofits, we eliminate barriers and build trust, making it easier for organizations to get the support they need and for donors to see the tangible results of their generosity.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-[#023047] text-center mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
              <div className="w-16 h-16 bg-[#feb705] rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-[#023047]" />
              </div>
              <h3 className="font-bold text-2xl text-[#023047]">Connect Donors & Nonprofits</h3>
              <p className="text-base md:text-lg text-black">
                We provide a platform where individual donors can discover, support, and engage with nonprofits whose missions align with their values. Every contribution goes directly to the causes that matter most.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
              <div className="w-16 h-16 bg-[#feb705] rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#023047]" />
              </div>
              <h3 className="font-bold text-2xl text-[#023047]">Partner with Corporations</h3>
              <p className="text-base md:text-lg text-black">
                We work with corporate donors to create meaningful partnerships that amplify impact. Companies can support multiple nonprofits, track their giving, and demonstrate their commitment to social responsibility.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
              <div className="w-16 h-16 bg-[#feb705] rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[#023047]" />
              </div>
              <h3 className="font-bold text-2xl text-[#023047]">Empower Nonprofits</h3>
              <p className="text-base md:text-lg text-black">
                We give nonprofits the tools they need to showcase their work, share their stories, and attract the funding required to expand their reach and deepen their impact in communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-[#fdc485]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-[#023047] text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#feb705]" />
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl text-[#023047] mb-2">Transparency</h3>
                  <p className="text-base md:text-lg text-black">
                    We believe in complete openness about where donations go and how they're used. Every nonprofit on our platform provides detailed updates on their projects and impact.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#feb705]" />
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl text-[#023047] mb-2">Impact</h3>
                  <p className="text-base md:text-lg text-black">
                    Every donation should create real, measurable change. We help nonprofits demonstrate their impact and help donors see the difference their contributions make.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#feb705]" />
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl text-[#023047] mb-2">Connection</h3>
                  <p className="text-base md:text-lg text-black">
                    We foster genuine relationships between donors and nonprofits, creating a community built on shared values and mutual support.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#feb705]" />
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl text-[#023047] mb-2">Accessibility</h3>
                  <p className="text-base md:text-lg text-black">
                    Whether you're a small grassroots organization or a large established nonprofit, PairWell provides equal access to funding opportunities and donor connections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-[#023047] text-center mb-12">
            How PairWell Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* For Donors */}
            <div className="space-y-6">
              <h3 className="font-bold text-2xl md:text-3xl text-[#023047]">For Donors</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#feb705] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#023047]">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#023047] mb-1">Discover</h4>
                    <p className="text-base text-black">Browse nonprofits and projects that align with your passions and values</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#feb705] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#023047]">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#023047] mb-1">Donate</h4>
                    <p className="text-base text-black">Make secure, tax-deductible donations directly to the causes you care about</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#feb705] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#023047]">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#023047] mb-1">Track Impact</h4>
                    <p className="text-base text-black">Receive real-time updates and see exactly how your donations are making a difference</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Nonprofits */}
            <div className="space-y-6">
              <h3 className="font-bold text-2xl md:text-3xl text-[#023047]">For Nonprofits</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#feb705] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#023047]">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#023047] mb-1">Create Profile</h4>
                    <p className="text-base text-black">Build a compelling profile that showcases your mission, impact, and funding needs</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#feb705] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#023047]">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#023047] mb-1">Launch Campaigns</h4>
                    <p className="text-base text-black">Share specific projects and funding goals to attract individual and corporate donors</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#feb705] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#023047]">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#023047] mb-1">Engage & Report</h4>
                    <p className="text-base text-black">Keep donors engaged with progress updates and demonstrate the impact of their support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-[#023047]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg md:text-xl text-white">
            Join PairWell today and be part of a community that's changing the world, one connection at a time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/donors">
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                Become a Donor
              </button>
            </Link>
            <Link to="/nonprofits">
              <button className="bg-white text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-gray-100 transition-colors">
                Join as a Nonprofit
              </button>
            </Link>
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
                <li><Link to="/about" className="hover:text-[#feb705] transition-colors">About Us</Link></li>
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