//import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
//import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgGroup8 from "figma:asset/8da2e0d43ba28d9ebdc12154aae2f29c2da83ffa.png";
import imgHeroBackground from "figma:asset/3af8407c479b3c50b9d21203c0794304d39968ff.png";
import { useState, useEffect } from "react";
import { Menu, X, CheckCircle2, TrendingUp, Users, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function NonprofitPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
      question: "How do I get started?",
      answer: "Simply create a profile, list your projects, and start connecting with funders. The more details you provide, the easier it is to attract donors."
    },
    {
      question: "How does PairWell help us gain visibility?",
      answer: "PairWell connects you with a network of engaged donors actively searching for causes to support. Our platform helps showcase your mission and impact."
    },
    {
      question: "Can we update donors on project progress?",
      answer: "Yes! You can share regular updates, photos, and milestones with your donors to keep them engaged and informed about the impact of their contributions."
    },
    {
      question: "How much does it cost to join PairWell?",
      answer: "Creating a profile and listing projects on PairWell is completely free. We only charge a small processing fee on donations received."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      <style dangerouslySetInnerHTML={{__html: `
        .nonprofit-hero-background {
          background-image: url(${imgHeroBackground});
          background-size: 120%;
          background-position: right top;
          background-repeat: no-repeat;
        }
        @media (max-width: 760px) {
          .nonprofit-hero-background {
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

      {/* Combined Header, Nav and Hero Section with Background */}
      <div className="relative nonprofit-hero-background">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-black">
                  Connect with Funders Who Believe in Your Mission
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-black">
                  PairWell helps nonprofits like yours gain visibility, attract donors, and secure the funding needed to bring impactful projects to life. Create a profile, share your mission, and track your progress—all in one place.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                    Create a Profile
                  </button>
                  <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
                    Get Funding
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </section>
      </div>

      {/* Unlock More Funding Opportunities */}
      <section className="bg-[#f4f4f4] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-black text-center mb-12">
            Unlock More Funding Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Get Discovered",
                description: "Increase visibility by showcasing active projects and demonstrating real impact.",
                imageUrl: "https://images.unsplash.com/photo-1771924368572-2ba8c7f6c79d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGNlbGVicmF0aW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzczODY2ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "Build an Engaging Profile",
                description: "Stand out to funders by telling your story, highlighting past success, and clearly defining funding needs.",
                imageUrl: "https://images.unsplash.com/photo-1655990280051-1a0b3e61048a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3b3JraW5nJTIwY29tcHV0ZXIlMjBsYXB0b3B8ZW58MXx8fHwxNzczODY2ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "ProgressShare",
                description: "Keep donors engaged with project milestones, images, and real-time updates on the impact of their contributions.",
                imageUrl: "https://images.unsplash.com/photo-1588822534638-028d5ddc07ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMHZvbHVudGVlciUyMGhlbHBpbmd8ZW58MXx8fHwxNzczODY2OTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
                />
                <h3 className="font-bold text-xl md:text-2xl text-black">{item.title}</h3>
                <p className="text-sm md:text-base text-black">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
              Join PairWell
            </button>
          </div>
        </div>
      </section>

      {/* Insights & Engagement Tools */}
      <section className="bg-[#fdc485] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-black text-center mb-12">
            Insights & Engagement Tools for Nonprofits
          </h2>
          
          <div className="space-y-12 md:space-y-16">
            {/* Project & Progress Tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="font-bold text-2xl md:text-3xl text-black">
                  Project & Progress Tracking
                </h3>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black">
                  <li>Monitor how much funding each campaign has raised.</li>
                  <li>Track project milestones and completion levels.</li>
                  <li>Share real-time updates with donors.</li>
                </ul>
              </div>
              <div className="bg-[#fb8500] h-64 md:h-96 rounded-lg"></div>
            </div>

            {/* Donor Engagement Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-[#fb8500] h-64 md:h-96 rounded-lg order-2 lg:order-1"></div>
              <div className="space-y-4 order-1 lg:order-2">
                <h3 className="font-bold text-2xl md:text-3xl text-black">
                  Donor Engagement Insights
                </h3>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black">
                  <li>See how many donors are viewing and favoriting your profile.</li>
                  <li>Gain insights into donor behavior and preferences.</li>
                  <li>Understand what resonates with funders to optimize your campaigns.</li>
                </ul>
              </div>
            </div>

            {/* Concierge Support */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="font-bold text-2xl md:text-3xl text-black">
                  Concierge Support for Your Nonprofit
                </h3>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black">
                  <li>Get hands-on guidance from our support team.</li>
                  <li>Receive personalized recommendations to improve fundraising success.</li>
                  <li>Have questions? We're here to help every step of the way.</li>
                </ul>
              </div>
              <div className="bg-[#fb8500] h-64 md:h-96 rounded-lg"></div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg md:text-xl hover:bg-[#e5a605] transition-colors">
              Talk To Our Team
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f4f4f4] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-black text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <h3 className="font-bold text-xl md:text-2xl text-black">{faq.question}</h3>
                  <ChevronDown size={24} className={openFaq === index ? "rotate-180" : ""} />
                </div>
                {openFaq === index && (
                  <p className="text-sm md:text-base text-black mt-4">{faq.answer}</p>
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
              {/*<img src={imgFooterLogo} alt="PairWell Logo" className="w-32 h-auto" />*/}
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
