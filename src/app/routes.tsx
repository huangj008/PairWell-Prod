import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import NonprofitPage from "./pages/NonprofitPage";
import DonorPage from "./pages/DonorPage";
import DirectoryPage from "./pages/DirectoryPage";
import SignupPage from "./pages/SignupPage";
import SignupSuccessPage from "./pages/SignupSuccessPage";
import SignInPage from "./pages/SignInPage";
import DonorAccountPage from "./pages/DonorAccountPage";
import NonprofitAccountPage from "./pages/NonprofitAccountPage";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import AboutUsPage from "./pages/AboutUsPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/nonprofits",
    element: <NonprofitPage />,
  },
  {
    path: "/donors",
    element: <DonorPage />,
  },
  {
    path: "/about",
    element: <AboutUsPage />,
  },
  {
    path: "/directory",
    element: <DirectoryPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signup/success",
    element: <SignupSuccessPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/donor-account",
    element: <DonorAccountPage />,
  },
  {
    path: "/nonprofit-account",
    element: <NonprofitAccountPage />,
  },
  {
    path: "/create-campaign",
    element: <CreateCampaignPage />,
  },
  {
    path: "/campaign/:id",
    element: <CampaignDetailPage />,
  },
]);