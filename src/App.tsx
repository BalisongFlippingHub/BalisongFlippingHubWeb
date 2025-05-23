import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { LoginPage } from "./pages/auth/LoginPage";

import ProfilePage from "./pages/ProfilePage";
import AuthProtectedRoutes from "./routes/AuthProtectedRoutes";
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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setCredentials, setToRememberLoginInfo } from "./redux/auth/authSlice";
import { loginWithRefreshToken } from "./redux/auth/authActions";
import { setCollection } from "./redux/collection/collectionSlice";
import ProfileConfigurationCollectionBannerImagePage from "./pages/configuration/ProfileConfigurationCollectionBannerImagePage";
import CollectionKnifePage from "./pages/CollectionKnifePage";
import TestPage from "./pages/TestPage";
import RegisterVerifyPage from "./pages/auth/RegisterVerifyPage";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    // configure app on mount
    // get remember login state
    const toRememberLogin = localStorage.getItem("save-user-info");
    if (toRememberLogin === "true") {
      dispatch(setToRememberLoginInfo());
    }

    // attempt to login user with valid refresh token
    if (!user && !accessToken) {
      dispatch(loginWithRefreshToken())
        .unwrap()
        .then((res) => {
          console.log("Response from refresh token login ->: " + res)
          dispatch(
            setCredentials({
              newUser: res.account,
              newAccessToken: res.accessToken,
            })
          );
          dispatch(setCollection(res.collection));
        })
        .catch((error) => console.log("Error caught attempting to login with existing refresh token: " + error));
    }

    // dispatch(
    //   setCredentials({
    //     newUser: {
    //       id: "1",
    //       displayName: "Test",
    //       identifierCode: "4444",
    //       role: "USER",
    //       email: "test@gmail.com",
    //       collectionId: "1123",
    //     } as Profile,
    //     newAccessToken: "1234",
    //   })
    // );

    setIsLoading(false);
  }, []);

  if (isLoading) {
    // loading screen
    return (
      <main className="w-full h-screen flex justify-center items-center text-5xl">
        <h1>Loading...</h1>
      </main>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/*Public Routes*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunityPage />} />

          <Route path="/tutorial-center" element={<TutorialCenterPage />} />
          <Route path="/product-world" element={<ProductWorldPage />} />
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/unauthorized" element={<h2>Unaothorized</h2>} />
          <Route path="/test" element={<TestPage />} />

          <Route path="/:account/:identifier" element={<ProfilePage />} />

          <Route
            path="/:account/:identifier/collection"
            element={<UserCollectionPage />}
          />

          <Route
            path="/:account/:identifier/collection/:knife"
            element={<CollectionKnifePage />}
          />

          {/*Protected Routes from Auth*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/verify/:verifiedEmail" element={<RegisterVerifyPage />} />
          </Route>

          {/*Auth Protected Routes for only users*/}
          <Route element={<AuthProtectedRoutes allowedRoles={["USER"]} />}>
            {/*Configuration routes*/}
            <Route path="/configure" element={<ProfileConfigurePage />} />

            <Route
              path="/configure/profile-banner"
              element={<ProfileConfigurationProfileBannerPage />}
            />

            <Route
              path="/configure/profile-image"
              element={<ProfileConfigurationProfileImagePage />}
            />

            <Route
              path="/configure/display_name"
              element={<ProfileConfigurationDisplayNamePage />}
            />
            <Route
              path="/configure/profile_caption"
              element={<ProfileConfigurationProfileCaptionPage />}
            />
            <Route
              path="/configure/facebook_link"
              element={<ProfileConfigurationLinksPage linkType="facebook" />}
            />
            <Route
              path="/configure/instagram_link"
              element={<ProfileConfigurationLinksPage linkType="instagram" />}
            />
            <Route
              path="/configure/twitter_link"
              element={<ProfileConfigurationLinksPage linkType="twitter" />}
            />
            <Route
              path="/configure/youtube_link"
              element={<ProfileConfigurationLinksPage linkType="youtube" />}
            />
            <Route
              path="/configure/reddit_link"
              element={<ProfileConfigurationLinksPage linkType="reddit" />}
            />
            <Route
              path="/configure/discord_link"
              element={<ProfileConfigurationLinksPage linkType="discord" />}
            />
            <Route
              path="/configure/personal_email_link"
              element={<ProfileConfigurationLinksPage linkType="email" />}
            />
            <Route
              path="/configure/personal_website_link"
              element={<ProfileConfigurationLinksPage linkType="website" />}
            />

            <Route
              path="/configure/measurement_units"
              element={<ProfileConfigurationMeasurementUnitsPage />}
            />

            <Route
              path="/configure/currency"
              element={<ProfileConfigurationChangeCurrencyPage />}
            />

            <Route
              path="/configure/collection-banner-image"
              element={<ProfileConfigurationCollectionBannerImagePage />}
            />

            <Route
              path="/configure/email"
              element={<ProfileConfigurationChangeEmailPage />}
            />

            <Route
              path="/configure/password"
              element={<ProfileConfigurationChangePasswordPage />}
            />

            <Route
              path="/configure/reset_account"
              element={<ProfileConfigurationResetAccountPage />}
            />

            <Route
              path="/configure/hide_account"
              element={<ProfileConfigurationHideAccountPage />}
            />

            <Route
              path="/configure/delete_account"
              element={<ProfileConfigurationDeleteAccountPage />}
            />

            {/*Auth Collection Routes*/}
            <Route
              path="/add-collection-knife"
              element={<AddNewKnifeToCollectionPage />}
            />
          </Route>

          {/*Auth protected routes for both admins and users*/}
          <Route
            element={<AuthProtectedRoutes allowedRoles={["USER", "ADMIN"]} />}
          >
            <Route path="/create-post" element={<CreatePostPage />} />
          </Route>

          {/*Catch all 404*/}
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    );
  }
};

export default App;
