import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { LoginPage } from "./pages/auth/LoginPage";

import ProfilePage from "./pages/profiles/ProfilePage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import TutorialCenterPage from "./pages/TutorialCenterPage";
import ProductWorldPage from "./pages/ProductWorldPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/CreatePostPage";
import UserCollectionPage from "./pages/UserCollectionPage";
import ProfileConfigurePage from "./pages/configuration/ProfileConfigurePage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import AddNewKnifeToCollectionPage from "./pages/AddNewKnifeToCollectionPage";
import ProfileConfigurationLinksPage from "./pages/configuration/ProfileConfigurationLinksPage";
import ProfileConfigurationDisplayNamePage from "./pages/configuration/ProfileConfigurationDisplayNamePage";
import ProfileConfigurationProfileCaptionPage from "./pages/configuration/ProfileConfigurationProfileCaptionPage";
import ProfileConfigurationMeasurementUnitsPage from "./pages/configuration/ProfileConfigurationMeasurementUnitsPage";
import ProfileConfigurationChangeEmailPage from "./pages/configuration/ProfileConfigurationChangeEmailPage";
import ProfileConfigurationChangePasswordPage from "./pages/configuration/ProfileConfigurationChangePasswordPage";
import ProfileConfigurationChangeCurrencyPage from "./pages/configuration/ProfileConfigurationChangeCurrencyPage";
import ProfileConfigurationResetAccountPage from "./pages/configuration/ProfileConfigurationResetAccountPage";
import ProfileConfigurationHideAccountPage from "./pages/configuration/ProfileConfigurationHideAccountPage";
import ProfileConfigurationDeleteAccountPage from "./pages/configuration/ProfileConfigurationDeleteAccountPage";
import ProfileConfigurationProfileImagePage from "./pages/configuration/ProfileConfigurationProfileImagePage";
import ProfileConfigurationProfileBannerPage from "./pages/configuration/ProfileConfigurationProfileBannerPage";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setCredentials, setToRememberLoginInfo } from "./redux/auth/authSlice";
import { loginWithRefreshToken } from "./redux/auth/authActions";
import { setCollection } from "./redux/collection/collectionSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // configure app on mount
    // get remember login state
    const toRememberLogin = localStorage.getItem("save-user-info");
    if (toRememberLogin === "true") {
      dispatch(setToRememberLoginInfo());
    }

    // attempt to login user with valid refresh token
    dispatch(loginWithRefreshToken())
      .unwrap()
      .then((res) => {
        dispatch(
          setCredentials({
            newUser: res.data.account,
            newAccessToken: res.data.accessToken,
          })
        );
        dispatch(setCollection(res.data.collection));
        navigate("/community");
      })
      .catch((error) => console.log(error));
  }, []);

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
            path="/me/configure/profile-banner"
            element={<ProfileConfigurationProfileBannerPage />}
          />

          <Route
            path="/me/configure/profile-image"
            element={<ProfileConfigurationProfileImagePage />}
          />

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

          <Route
            path="/me/configure/measurement_units"
            element={<ProfileConfigurationMeasurementUnitsPage />}
          />

          <Route
            path="/me/configure/currency"
            element={<ProfileConfigurationChangeCurrencyPage />}
          />

          <Route
            path="/me/configure/collection-banner-image"
            element={<ProfileConfigurationProfileBannerPage />}
          />

          <Route
            path="/me/configure/email"
            element={<ProfileConfigurationChangeEmailPage />}
          />

          <Route
            path="/me/configure/password"
            element={<ProfileConfigurationChangePasswordPage />}
          />

          <Route
            path="/me/configure/reset_account"
            element={<ProfileConfigurationResetAccountPage />}
          />

          <Route
            path="/me/configure/hide_account"
            element={<ProfileConfigurationHideAccountPage />}
          />

          <Route
            path="/me/configure/delete_account"
            element={<ProfileConfigurationDeleteAccountPage />}
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
