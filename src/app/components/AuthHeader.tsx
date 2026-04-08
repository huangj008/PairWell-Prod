import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

interface AuthHeaderProps {
  className?: string;
}

export function AuthHeader({ className = "" }: AuthHeaderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user session
    const sessionData = localStorage.getItem("pairwell_session") || sessionStorage.getItem("pairwell_session");
    if (sessionData) {
      const user = JSON.parse(sessionData);
      setIsSignedIn(true);
      setUserType(user.userType);
    }
  }, []);

  const handleSignOut = () => {
    setIsLoggingOut(true);
    
    // Simulate a brief loading state
    setTimeout(() => {
      localStorage.removeItem("pairwell_session");
      sessionStorage.removeItem("pairwell_session");
      setIsSignedIn(false);
      setUserType(null);
      setIsLoggingOut(false);
      navigate("/");
    }, 800);
  };

  const getAccountLink = () => {
    if (userType === "donor") {
      return "/donor-account";
    } else if (userType === "nonprofit") {
      return "/nonprofit-account";
    }
    return "/donor-account";
  };

  return (
    <>
      {/* Logging Out Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-[#023047] bg-opacity-95 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#feb705] mb-4"></div>
            <p className="text-white text-2xl font-bold">Logging out...</p>
          </div>
        </div>
      )}
      
      <div className={`bg-[#023047] py-3 px-4 md:px-8 ${className}`}>
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-4">
          {isSignedIn ? (
            <>
              <Link to={getAccountLink()}>
                <button className="text-white font-bold text-sm md:text-base hover:text-[#feb705] transition-colors">
                  My Account
                </button>
              </Link>
              <button 
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="text-white font-bold text-sm md:text-base hover:text-[#feb705] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="text-white font-bold text-sm md:text-base hover:text-[#feb705] transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-white font-bold text-sm md:text-base hover:text-[#feb705] transition-colors">
                  Create An Account
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}