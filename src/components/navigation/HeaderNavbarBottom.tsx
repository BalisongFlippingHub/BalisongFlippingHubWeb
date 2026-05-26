import { faCircleUser, faCubes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const NOTCH_HW = 30;   // notch half-width
const NOTCH_D  = 20;   // notch depth
const NOTCH_S  = 10;   // shoulder smoothing
const CORNER_R = 28;   // pill corner radius

const buildPillPath = (W: number, H: number, cx: number, depth: number): string => {
  if (!W || !H) return '';
  const r = CORNER_R;

  const notchSection = [
    `L ${cx - NOTCH_HW - NOTCH_S} 0`,
    `C ${cx - NOTCH_HW} 0 ${cx - NOTCH_HW / 3} ${depth} ${cx} ${depth}`,
    `C ${cx + NOTCH_HW / 3} ${depth} ${cx + NOTCH_HW} 0 ${cx + NOTCH_HW + NOTCH_S} 0`,
  ].join(' ');

  return [
    `M ${r} 0`,
    notchSection,
    `L ${W - r} 0`,
    `Q ${W} 0 ${W} ${r}`,
    `L ${W} ${H - r}`,
    `Q ${W} ${H} ${W - r} ${H}`,
    `L ${r} ${H}`,
    `Q 0 ${H} 0 ${H - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    `Z`,
  ].join(' ');
};

const MIN_STIFF = 70;
const MAX_STIFF = 160;
const MIN_DIST  = 50;
const MAX_DIST  = 220;

const getSpringConfig = (distance: number) => {
  const t = Math.min(1, Math.max(0, (distance - MIN_DIST) / (MAX_DIST - MIN_DIST)));
  const stiffness = MIN_STIFF + t * (MAX_STIFF - MIN_STIFF);
  return { type: 'spring' as const, stiffness, damping: 18 };
};

// Bouncy spring for the active-icon pop/pulse
const pulseSpring = { type: 'spring' as const, stiffness: 500, damping: 15 };

// ─── Shared nav item ────────────────────────────────────────────────────────
interface NavItemProps {
  isActive: boolean;
  label: string;
  springConfig: ReturnType<typeof getSpringConfig>;
  children: React.ReactNode;
  className?: string;
}

const NavItem = ({ isActive, label, springConfig, children, className = '' }: NavItemProps) => (
  <div className={`flex flex-col items-center px-2 pt-3.5 pb-2 gap-1 ${className}`}>
    {/* Float wrapper */}
    <motion.div
      animate={{ y: isActive ? -16 : 0 }}
      transition={springConfig}
    >
      {/* Scale + pulse wrapper */}
      <motion.div
        animate={{ scale: isActive ? 1.6 : 1 }}
        whileHover={!isActive ? { scale: 1.15 } : undefined}
        transition={isActive ? pulseSpring : springConfig}
      >
        {children}
      </motion.div>
    </motion.div>

    {/* Label */}
    <motion.span
      className="text-[9px] font-medium tracking-wide"
      animate={{
        opacity: isActive ? 0.85 : 0.4,
        color: isActive ? '#108198' : '#ffffff',
      }}
      transition={{ duration: 0.25 }}
    >
      {label}
    </motion.span>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────
const HeaderNavbarBottom = () => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  const containerRef  = useRef<HTMLDivElement>(null);
  const profileRef    = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const createRef     = useRef<HTMLDivElement>(null);

  const [notchX, setNotchX]         = useState(0);
  const [notchDepth, setNotchDepth] = useState(0);
  const [dims, setDims]             = useState({ w: 0, h: 0 });

  const prevNotchXRef = useRef(0);
  const notchDistance = Math.abs(notchX - prevNotchXRef.current);
  const springConfig  = getSpringConfig(notchDistance);

  const profilePath    = `/${user?.displayName}/${user?.identifierCode}`;
  const collectionPath = `/${user?.displayName}/${user?.identifierCode}/collection`;
  const createPath     = '/create-post';

  const isProfile    = location.pathname === profilePath;
  const isCollection = location.pathname === collectionPath;
  const isCreate     = location.pathname === createPath;

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setDims({ w: containerRect.width, h: containerRect.height });

    const activeRef = isProfile ? profileRef
      : isCollection ? collectionRef
      : isCreate ? createRef
      : null;

    if (activeRef?.current) {
      const iconRect = activeRef.current.getBoundingClientRect();
      setNotchX(iconRect.left + iconRect.width / 2 - containerRect.left);
      setNotchDepth(NOTCH_D);
    } else {
      setNotchDepth(0);
    }
  }, [isProfile, isCollection, isCreate]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    prevNotchXRef.current = notchX;
  }, [notchX]);

  const effectiveCx = notchX > 0 ? notchX : dims.w / 2;
  const svgPath = buildPillPath(dims.w, dims.h, effectiveCx, notchDepth);

  return (
    <div ref={containerRef} className="relative">

      {/* SVG pill — gradient fill + animated notch */}
      {svgPath && (
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* 3 — subtle top-to-bottom depth gradient */}
            <linearGradient id="pillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1c1f27" />
              <stop offset="100%" stopColor="#111318" />
            </linearGradient>
            <filter id="pillGlow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            fill="url(#pillGrad)"
            initial={{ d: svgPath }}
            animate={{ d: svgPath }}
            transition={springConfig}
          />
          <motion.path
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            filter="url(#pillGlow)"
            initial={{ d: svgPath }}
            animate={{ d: svgPath }}
            transition={springConfig}
          />
        </svg>
      )}

      {/* Icons */}
      <div className="relative z-10 flex items-center gap-12 px-24 text-white">

        {/* Profile */}
        <div ref={profileRef}>
          <NavLink to={profilePath}>
            {({ isActive }) => (
              <NavItem isActive={isActive} label="Profile" springConfig={springConfig}>
                <div className={`rounded-full flex items-center justify-center w-10 h-10 transition-colors duration-200 ${
                  isActive
                    ? "bg-[#111318] text-blue-primary border border-white/15"
                    : "text-white/65 hover:text-white"
                }`}>
                  <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
                </div>
              </NavItem>
            )}
          </NavLink>
        </div>

        {/* Collection */}
        <div ref={collectionRef}>
          <NavLink to={collectionPath}>
            {({ isActive }) => (
              <NavItem isActive={isActive} label="Collection" springConfig={springConfig}>
                <div className={`rounded-full flex items-center justify-center w-10 h-10 transition-colors duration-200 ${
                  isActive
                    ? "bg-[#111318] text-blue-primary border border-white/15"
                    : "text-white/65 hover:text-white"
                }`}>
                  <FontAwesomeIcon icon={faCubes} className="text-xl" />
                </div>
              </NavItem>
            )}
          </NavLink>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch bg-white/15 my-3" />

        {/* Create Post */}
        <div ref={createRef}>
          <NavLink to={createPath}>
            {({ isActive }) => (
              <NavItem isActive={isActive} label="Create" springConfig={springConfig}>
                <div className="rounded-full flex items-center justify-center w-10 h-10 bg-blue-primary">
                  <FontAwesomeIcon icon={faPlus} className="text-white text-lg" />
                </div>
              </NavItem>
            )}
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default HeaderNavbarBottom;
