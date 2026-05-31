import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const DISCORD_URL = "https://discord.gg/k6JPnkbBC";

// Routes that show the footer
const FOOTER_ROUTES = ["/", "/community", "/tutorial-center", "/product-world", "/about", "/terms", "/privacy"];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const SiteFooter = () => (
  <footer className="w-full bg-[#0a0c10] border-t border-white/[0.06] pb-28">
    <div className="max-w-[1775px] mx-auto px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Left — branding */}
      <div className="flex flex-col items-center sm:items-start gap-1">
        <span className="text-white font-bold text-sm">Balisong Flipping Center</span>
        <span className="text-white/30 text-xs">© {new Date().getFullYear()} All rights reserved.</span>
      </div>

      {/* Center — nav links */}
      <div className="flex items-center gap-6 text-white/40 text-xs font-medium">
        <a href="/about" className="hover:text-white/70 transition-colors duration-200">About</a>
        <a href="/about" className="hover:text-white/70 transition-colors duration-200">Contact</a>
        <a href="/terms" className="hover:text-white/70 transition-colors duration-200">Terms</a>
        <a href="/privacy" className="hover:text-white/70 transition-colors duration-200">Privacy</a>
      </div>

      {/* Right — Discord */}
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/25 text-[#5865F2] text-xs font-semibold hover:bg-[#5865F2]/20 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faDiscord} className="text-sm" />
        Join our Discord
      </a>
    </div>
  </footer>
);

const MainLayout = () => {
  const { pathname } = useLocation();
  const showFooter = FOOTER_ROUTES.includes(pathname);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      {showFooter && <SiteFooter />}
    </>
  );
};

export default MainLayout;
