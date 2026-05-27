import { useEffect, useRef, useState } from "react";
import { PostCover } from "../modals/Post";
import { axiosApiInstanceAuth } from "../api/axios";
import ProfilePostCover from "./ProfilePostCover";
import { useAppSelector } from "../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTableCells, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const FILTER_OPTIONS = ["All", "Sell/Trade", "Flipping", "Show-Off", "Collection", "Mod-Work"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

type SortOption = "newest" | "oldest" | "likes" | "comments";

const SORT_LABELS: Record<SortOption, string> = {
  newest:   "Newest",
  oldest:   "Oldest",
  likes:    "Most Liked",
  comments: "Most Commented",
};

const UserProfilePostsComponent = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [sortBy, setSortBy]             = useState<SortOption>("newest");
  const [filterOpen, setFilterOpen]     = useState(false);
  const [sortOpen, setSortOpen]         = useState(false);
  const [posts, setPosts]               = useState<PostCover[]>([]);

  const user       = useAppSelector((state) => state.auth.user);
  const navigate   = useNavigate();
  const filterRef  = useRef<HTMLDivElement>(null);
  const sortRef    = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
      if (sortRef.current   && !sortRef.current.contains(e.target as Node))   setSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch posts
  useEffect(() => {
    axiosApiInstanceAuth
      .request({ url: `/posts/any/${user?.id}/posts`, method: "get" })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Filter
  const filtered =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.identifier === activeFilter);

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "likes")    return b.likes    - a.likes;
    if (sortBy === "comments") return b.comments - a.comments;
    // newest / oldest: requires creationDate on PostCover — preserve fetch order for now
    return 0;
  });

  return (
    <div className="w-full flex flex-col text-white">

      {/* ── Filter + Sort bar ── */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4 border-t border-white/10 xsm:gap-1 md:gap-3">

        {/* Filter dropdown */}
        <div ref={filterRef} className="relative justify-self-start">

          <button
            type="button"
            onClick={() => { setFilterOpen((p) => !p); setSortOpen(false); }}
            className="flex items-center gap-1.5 xsm:px-2 xsm:py-1 xsm:text-xs md:px-3 md:py-1.5 md:text-sm rounded-lg font-medium border bg-blue-primary border-blue-primary text-white transition-all duration-150 whitespace-nowrap"
          >
            {activeFilter}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-xs transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full mt-1 w-40 rounded-xl border border-white/10 bg-dark-neutral-offset overflow-y-auto z-20 max-h-64"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.8)" }}
              >
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setActiveFilter(opt); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 hover:bg-white/5 ${
                      activeFilter === opt
                        ? "text-white bg-white/5"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center cell — lines + count */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <div className="w-20 h-px bg-white/10" />
            <div className="w-px h-5 bg-white/10 flex-shrink-0" />
          </div>

          <div className="flex flex-col items-center gap-0.5 flex-shrink-0 px-2">
            <span className="text-white font-bold text-lg leading-none">{sorted.length}</span>
            <span className="text-white/30 text-[10px] uppercase tracking-widest leading-none">
              {activeFilter === "All" ? "Posts" : activeFilter}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="w-px h-5 bg-white/10 flex-shrink-0" />
            <div className="w-20 h-px bg-white/10" />
          </div>
        </div>

        {/* Sort dropdown */}
        <div ref={sortRef} className="relative justify-self-end">
          <button
            type="button"
            onClick={() => { setSortOpen((p) => !p); setFilterOpen(false); }}
            className="flex items-center gap-1.5 xsm:px-2 xsm:py-1 xsm:text-xs md:px-3 md:py-1.5 md:text-sm text-white/50 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-150 whitespace-nowrap rounded-lg"
          >
            {SORT_LABELS[sortBy]}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-xs transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-white/10 bg-dark-neutral-offset overflow-hidden z-20"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.8)" }}
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setSortBy(opt); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-white/5 ${
                      sortBy === opt
                        ? "text-white bg-white/5"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {SORT_LABELS[opt]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Posts grid / empty state ── */}
      {sorted.length > 0 ? (
        <div className="grid xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-6 pt-2 pb-8">
          {sorted.map((post) => (
            <ProfilePostCover post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <FontAwesomeIcon icon={faTableCells} className="text-white/20 text-2xl" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-white/50 text-sm font-medium">
              {activeFilter === "All" ? "No posts yet." : `No ${activeFilter} posts yet.`}
            </p>
            {activeFilter === "All" && (
              <p className="text-white/25 text-xs">Share your first flip with the community.</p>
            )}
          </div>
          {activeFilter === "All" && (
            <button
              type="button"
              onClick={() => navigate("/create-post")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/50 hover:text-white text-sm transition-all duration-200"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
              Create a post
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default UserProfilePostsComponent;
