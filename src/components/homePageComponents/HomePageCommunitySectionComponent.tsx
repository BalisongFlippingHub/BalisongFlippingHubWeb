import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faLayerGroup,
  faPenToSquare,
  faHeart,
  faShareNodes,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const features = [
  {
    icon: faCircleUser,
    title: "Build Your Profile",
    description:
      "Create your identity in the balisong community. Set up your display name, profile image, and let your personality speak for itself.",
    bullets: [
      "Custom display name and profile picture",
      "Personal bio and social links",
      "View your full post and activity history",
      "Unique identifier code for your public profile URL",
    ],
  },
  {
    icon: faLayerGroup,
    title: "Showcase Your Collection",
    description:
      "Catalog every knife with detailed specs, photos, and personal ratings. Your collection is your legacy — keep it sharp.",
    bullets: [
      "Full spec sheets — blade, handle, pivot, latch, and more",
      "Photo gallery for each individual knife",
      "Personal ratings and notes per knife",
      "Share your collection publicly with the community",
    ],
  },
  {
    icon: faPenToSquare,
    title: "Post & Share",
    description:
      "Share flipping clips, knife photos, and community moments with enthusiasts around the world. Every flip tells a story.",
    bullets: [
      "Photo and video post support",
      "Tag knives directly from your collection",
      "Cross-post to the Tutorial Center or Product World",
      "Captions, descriptions, and rich post formatting",
    ],
  },
  {
    icon: faHeart,
    title: "Engage With Others",
    description:
      "Like, comment, save, and bookmark posts from fellow flippers. The conversation is always open and the community is always growing.",
    bullets: [
      "Like and react to posts",
      "Comment and reply in threaded discussions",
      "Save and bookmark your favorite posts",
      "Flag and report inappropriate content",
    ],
  },
  {
    icon: faShareNodes,
    title: "Contribute to the Hub",
    description:
      "Your posts can feed directly into the Tutorial Center and Product World, helping the entire community learn, discover, and grow together.",
    bullets: [
      "Submit tutorial posts to the Tutorial Center",
      "Add product content to the Product World",
      "Help build the community knowledge base",
      "Get recognition for your contributions",
    ],
  },
];

const HomePageCommunitySectionComponent = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const isLoggedIn = user && accessToken && accessToken !== "";

  return (
    <section
      className="min-h-screen w-full text-white flex items-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #0c2d35 0%, #061a1f 50%, #030d11 100%)',
        borderRadius: '0 0 50% 50% / 0 0 80px 80px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
        zIndex: 4,
        position: 'relative',
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <FontAwesomeIcon icon={faGlobe} className="text-blue-primary text-sm" />
          <span className="uppercase tracking-widest text-base font-semibold text-blue-primary">
            Community
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center font-bold xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
          Your Knife Journey, <span className="text-blue-primary">Shared</span>
        </h2>

        {/* Subheading */}
        <p className="text-center text-white/60 xsm:text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
          The Community is the heart of the Balisong Flipping Center. Create an account,
          build your profile, and connect with a passionate network of flippers, collectors,
          and makers from around the world.
        </p>

        {/* Feature Cards */}
        <div className="grid xsm:grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {features.slice(0, 4).map((feature) => (
            <div
              key={feature.title}
              className="group bg-dark-neutral-offset border border-white/10 rounded-xl p-6 flex flex-col gap-3 hover:border-blue-primary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={feature.icon} className="text-blue-primary" />
                </div>
                <h3 className="font-bold text-base sm:text-lg">{feature.title}</h3>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover-reveal bullet points */}
              <ul className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-500 ease-in-out flex flex-col gap-1.5 border-t border-white/0 group-hover:border-white/10 group-hover:pt-3 group-hover:mt-1">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-blue-primary mt-1 text-xs">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 5th card — centered spanning both columns */}
          <div className="md:col-span-2 flex justify-center">
            <div className="group bg-dark-neutral-offset border border-white/10 rounded-xl p-6 flex flex-col gap-3 hover:border-blue-primary/40 transition-all duration-300 w-full md:max-w-[calc(50%-10px)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={features[4].icon} className="text-blue-primary" />
                </div>
                <h3 className="font-bold text-base sm:text-lg">{features[4].title}</h3>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{features[4].description}</p>

              {/* Hover-reveal bullet points */}
              <ul className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-500 ease-in-out flex flex-col gap-1.5 border-t border-white/0 group-hover:border-white/10 group-hover:pt-3 group-hover:mt-1">
                {features[4].bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-blue-primary mt-1 text-xs">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex xsm:flex-col sm:flex-row items-center justify-center gap-4 mt-14">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => navigate("/community")}
              className="xsm:w-full sm:w-auto px-8 py-3 bg-blue-primary text-white font-semibold text-base rounded hover:brightness-110 transition-[filter] duration-300"
            >
              Go to Community
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="xsm:w-full sm:w-auto px-8 py-3 bg-blue-primary text-white font-semibold text-base rounded hover:brightness-110 transition-[filter] duration-300"
              >
                Join the Community
              </button>
              <button
                type="button"
                onClick={() => navigate("/community")}
                className="xsm:w-full sm:w-auto px-8 py-3 border border-white/30 text-white font-semibold text-base rounded hover:border-blue-primary hover:text-blue-primary hover:bg-blue-primary/10 transition-all duration-300"
              >
                Explore Posts
              </button>
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default HomePageCommunitySectionComponent;
