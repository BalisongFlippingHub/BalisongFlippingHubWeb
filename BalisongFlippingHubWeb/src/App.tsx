import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { LoginPage } from "./pages/LoginPage";

import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import TutorialCenterPage from "./pages/TutorialCenterPage";
import ProductWorldPage from "./pages/ProductWorldPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/CreatePostPage";
import UserCollectionPage from "./pages/UserCollectionPage";
import ProfileConfigurePage from "./pages/ProfileConfigurePage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import AddNewKnifeToCollectionPage from "./pages/AddNewKnifeToCollectionPage";
import ProfileConfigurationLinksPage from "./pages/ProfileConfigurationLinksPage";
import ProfileConfigurationDisplayNamePage from "./pages/ProfileConfigurationDisplayNamePage";
import ProfileConfigurationProfileCaptionPage from "./pages/ProfileConfigurationProfileCaptionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/*Public Routes*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tutorial-center" element={<TutorialCenterPage />} />
        <Route path="/product-world" element={<ProductWorldPage />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/unauthorized" element={<h2>Unaothorized</h2>} />

        {/*Protected Routes*/}
        <Route element={<ProtectedRoutes allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/me" element={<ProfilePage />} />
        </Route>

        {/*Profile Configuration Routes*/}
        <Route element={<ProtectedRoutes allowedRoles={["USER"]} />}>
          <Route path="/me/configure" element={<ProfileConfigurePage />} />
          <Route
            path="/me/configure/display_name"
            element={<ProfileConfigurationDisplayNamePage />}
          />
          <Route
            path="/me/configure/profile_caption"
            element={<ProfileConfigurationProfileCaptionPage />}
          />
          <Route
            path="/me/configure/facebook_link"
            element={<ProfileConfigurationLinksPage linkType="facebook" />}
          />
          <Route
            path="/me/configure/instagram_link"
            element={<ProfileConfigurationLinksPage linkType="instagram" />}
          />
          <Route
            path="/me/configure/twitter_link"
            element={<ProfileConfigurationLinksPage linkType="twitter" />}
          />
          <Route
            path="/me/configure/youtube_link"
            element={<ProfileConfigurationLinksPage linkType="youtube" />}
          />
          <Route
            path="/me/configure/reddit_link"
            element={<ProfileConfigurationLinksPage linkType="reddit" />}
          />
          <Route
            path="/me/configure/discord_link"
            element={<ProfileConfigurationLinksPage linkType="discord" />}
          />
          <Route
            path="/me/configure/personal_email_link"
            element={<ProfileConfigurationLinksPage linkType="email" />}
          />
          <Route
            path="/me/configure/personal_website_link"
            element={<ProfileConfigurationLinksPage linkType="website" />}
          />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["USER"]} />}>
          <Route path="/me/collection" element={<UserCollectionPage />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["USER"]} />}>
          <Route
            path="/me/collection/add-knife"
            element={<AddNewKnifeToCollectionPage />}
          />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/me/create-post" element={<CreatePostPage />} />
        </Route>

        {/*Catch all 404*/}
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
