import imgNewBackground from "figma:asset/6f7bc8f6b6d39c0e29f43e4ae59e1bc83ddb321d.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgGroup9 from "figma:asset/1f0a5ef089cacfe847d8d70741e15f03013d1136.png";
import { useState, useEffect } from "react";
import { Menu, X, CheckCircle2, TrendingUp, Heart, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function DonorPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const faqs = [
    {
      question: "Do I need an account to donate?",
      answer: "Yes, creating an account allows you to track your donations and it makes the donation process much easier."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes! All donations made through PairWell are tax-deductible. You'll receive a receipt for your records."
    },
    {
      question: "How do I know my donation is making a difference?",
      answer: "Nonprofits share real-time updates and progress reports so you can see exactly how your contribution is making an impact."
    },
    {
      question: "Can I set up recurring donations?",
      answer: "Absolutely! You can set up weekly, monthly, quarterly, or annual recurring donations to support your favorite causes consistently."
    }
  ];

  // Load specific campaigns by name for Discover Charities and Events section
  const getCharityCampaigns = () => {
    const stored = localStorage.getItem("pairwell_campaigns");
    if (stored) {
      const storedCampaigns = JSON.parse(stored);
      const campaignNames = ["Forest Clean Up", "Affordable Healthcare", "Community Programs"];
      return campaignNames.map(name =>
        storedCampaigns.find((c: any) => c.name === name)
      ).filter(Boolean); // Remove any undefined entries
    }
    return [];
  };

  const charityCampaigns = getCharityCampaigns();

  const charities = [
    {
      title: "Charity #1",
      description: "A nature-focused charity dedicated to environmental conservation and promoting sustainable practices that protect our planet for future generations.",
      imageUrl: "https://images.unsplash.com/photo-1764264342202-24ef1b096970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBoaWtpbmclMjBmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzczODY3MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Charity #2",
      description: "A community-focused charity providing essential healthcare services and support to elderly individuals in our local communities, while building strong relationships.",
      imageUrl: "https://images.unsplash.com/photo-1764006145420-df3006edf060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwZWxkZXJseSUyMHdoZWVsY2hhaXIlMjBjYXJlfGVufDF8fHx8MTc3Mzg2NzA5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Charity #3",
      description: "A development organization working to improve infrastructure and quality of life in underserved communities through housing and community group building programs.",
      imageUrl: "https://images.unsplash.com/photo-1584048140229-2037d75e87fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaXR5JTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzM4NjcwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const charityImages = [
    "https://images.unsplash.com/photo-1764264342202-24ef1b096970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBoaWtpbmclMjBmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzczODY3MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1764006145420-df3006edf060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwZWxkZXJseSUyMHdoZWVsY2hhaXIlMjBjYXJlfGVufDF8fHx8MTc3Mzg2NzA5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1584048140229-2037d75e87fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaXR5JTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzM4NjcwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      <style dangerouslySetInnerHTML={{__html: `
        .donor-hero-background {
          background-image: url(${imgGroup9});
          background-size: 120%;
          background-position: right top;
          background-repeat: no-repeat;
        }
        @media (max-width: 760px) {
          .donor-hero-background {
            background-image: none;
          }
        }
      `}} />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Row - Dark Blue with Auth Buttons */}
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

      {/* Combined Header, Nav and Hero Section with Background */}
      <div className="relative donor-hero-background">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black">
                  Give with Confidence. Make an Impact.
                </h1>
                <p className="text-base md:text-lg text-black">
                  Donated made is easy to support the causes you care about. Whether you're sponsoring a child, funding clean water, or supporting healthcare, every dollar makes a real difference. With real-time updates and transparent reporting, you'll see exactly how your generosity makes a positive impact.
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </section>
      </div>

      {/* How It Works Section */}
      <section className="bg-[#fdc485] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-black text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Find a Cause",
                description: "Search for nonprofits, causes, and projects that resonate with your values and passion."
              },
              {
                title: "Make an Impact",
                description: "Choose the amount you want to donate and see the tangible difference your gift can make."
              },
              {
                title: "See the Change",
                description: "Get real-time updates on the projects you support and witness the direct impact of your generosity."
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#fb8500] rounded-full"></div>
                <h3 className="font-bold text-xl md:text-2xl text-black">{item.title}</h3>
                <p className="text-sm md:text-base text-black">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                Create a Profile
              </button>
            </Link>
            <Link to="/directory">
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg text-lg hover:bg-[#e5a605] transition-colors">
                Search Charities
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Discover Charities and Events */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-black mb-12">
            Discover Charities and Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {charityCampaigns.length > 0 ? (
              charityCampaigns.map((campaign: any, index: number) => (
                <div key={campaign.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src={charityImages[index]}
                    alt={campaign.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-xl md:text-2xl text-black">{campaign.name}</h3>
                    <p className="text-sm md:text-base text-black mb-4">{campaign.description}</p>
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
              charities.map((charity, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src={charity.imageUrl}
                    alt={charity.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-xl md:text-2xl text-black">{charity.title}</h3>
                    <p className="text-sm md:text-base text-black">{charity.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/directory">
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                View All
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flexible Donation Options */}
      <section className="bg-[#023047] py-12 md:py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-0 bottom-0 w-64 h-64 opacity-30">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="0" cy="200" r="100" fill="#feb705"/>
            <circle cx="50" cy="150" r="80" fill="#fdc485"/>
          </svg>
        </div>
        <div className="absolute right-0 top-0 w-96 h-96 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M 200 0 Q 150 50 200 100 Q 150 150 200 200 L 200 0" fill="#feb705"/>
            <path d="M 180 20 Q 130 70 180 120 Q 130 170 180 200 L 200 200 L 200 0" fill="#fdc485"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1758272133786-ee98adcc6837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwc21pbGluZyUyMHRvZ2V0aGVyJTIwaGFwcHl8ZW58MXx8fHwxNzczODY3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy donors"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-6 text-white">
              <h2 className="font-bold text-3xl md:text-4xl">
                Flexible Donation Options
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-xl md:text-2xl mb-2">One-Time Donation</h3>
                  <p className="text-base md:text-lg">Make a one-time gift to support a cause you care about.</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl mb-2">Recurring Donation</h3>
                  <p className="text-base md:text-lg">Set up weekly, monthly, quarterly, or annual giving to provide sustained support.</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl mb-2">Matching Donation</h3>
                  <p className="text-base md:text-lg">See if your employer offers donation matching to double your impact.</p>
                </div>
              </div>
              <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                Start Donating
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#fdc485] py-12 md:py-20 px-4 md:px-8">
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