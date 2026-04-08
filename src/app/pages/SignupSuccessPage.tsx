import imgNavLogo from "figma:asset/bf13ae1cb860c8ce8df707faa88363ac05a2d647.png";
import imgFooterLogo from "figma:asset/d58acd654a386e9b126468e74eac71f30aff0fc4.png";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useSearchParams } from "react-router";
import { AuthHeader } from "../components/AuthHeader";

export default function SignupSuccessPage() {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "donor";
  const accountId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif] flex flex-col">
      {/* Header */}
      <AuthHeader />

      {/* Success Content */}
      <section className="flex-1 flex items-center justify-center py-12 md:py-20 px-4 md:px-8 bg-[#f5f5f5]">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-lg border border-[rgba(2,48,71,0.2)] p-8 md:p-12 text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-[#feb705] rounded-full flex items-center justify-center">
                <CheckCircle size={48} className="text-[#023047]" strokeWidth={3} />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="font-bold text-3xl md:text-4xl text-black">
                Welcome to PairWell!
              </h1>
              <p className="text-lg md:text-xl text-black">
                Your account has been successfully created.
              </p>
              {accountId && (
                <p className="text-sm text-gray-600">
                  Account ID: {accountId}
                </p>
              )}
            </div>

            {/* User Type Specific Message */}
            <div className="bg-[#f5f5f5] p-6 rounded-lg">
              {userType === "donor" ? (
                <div className="space-y-3">
                  <h2 className="font-bold text-xl text-black">What's Next?</h2>
                  <ul className="text-left space-y-2 text-base text-black">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-[#feb705] flex-shrink-0 mt-1" size={20} />
                      <span>Browse and discover nonprofits that align with your interests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-[#feb705] flex-shrink-0 mt-1" size={20} />
                      <span>Set up your donation preferences and recurring giving</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-[#feb705] flex-shrink-0 mt-1" size={20} />
                      <span>Track your impact and see how your donations make a difference</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-3">
                  <h2 className="font-bold text-xl text-black">What's Next?</h2>
                  <ul className="text-left space-y-2 text-base text-black">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-[#feb705] flex-shrink-0 mt-1" size={20} />
                      <span>Complete your organization profile and add photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-[#feb705] flex-shrink-0 mt-1" size={20} />
                      <span>Create your first campaign or project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-[#feb705] flex-shrink-0 mt-1" size={20} />
                      <span>Connect with donors and start sharing your impact</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {userType === "donor" ? (
                <>
                  <Link to="/directory">
                    <button className="w-full sm:w-auto bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                      Browse Nonprofits
                    </button>
                  </Link>
                  <Link to="/donor-account">
                    <button className="w-full sm:w-auto border-2 border-[#023047] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#023047] hover:text-white transition-colors">
                      Go To Account
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/nonprofit-account">
                    <button className="w-full sm:w-auto bg-[#feb705] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#e5a605] transition-colors">
                      Complete Profile
                    </button>
                  </Link>
                  <Link to="/nonprofits">
                    <button className="w-full sm:w-auto border-2 border-[#023047] text-[#023047] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#023047] hover:text-white transition-colors">
                      Resources
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address.
              </p>
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