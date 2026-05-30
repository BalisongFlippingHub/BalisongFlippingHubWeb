import { useEffect, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Profile } from "../../modals/User";
import { setNewUser } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

type LinkType = "facebook" | "instagram" | "twitter" | "youtube" | "reddit" | "discord" | "email" | "website";

interface LinkConfig {
  label: string;
  placeholder: string;
  apiUrl: string;
  userField: keyof Profile;
  inputType: "url" | "email" | "text";
  prefix?: string;
  hint: string;
}

const LINK_CONFIGS: Record<LinkType, LinkConfig> = {
  facebook: {
    label: "Facebook",
    placeholder: "https://www.facebook.com/yourprofile",
    apiUrl: "accounts/me/update-facebook-link",
    userField: "facebookLink",
    inputType: "url",
    prefix: "https://www.facebook.com",
    hint: "Must be a valid facebook.com profile URL",
  },
  instagram: {
    label: "Instagram",
    placeholder: "https://www.instagram.com/yourhandle",
    apiUrl: "accounts/me/update-instagram-link",
    userField: "instagramLink",
    inputType: "url",
    prefix: "https://www.instagram.com",
    hint: "Must be a valid instagram.com profile URL",
  },
  twitter: {
    label: "Twitter / X",
    placeholder: "https://x.com/yourhandle",
    apiUrl: "accounts/me/update-twitter-link",
    userField: "twitterLink",
    inputType: "url",
    prefix: "https://",
    hint: "Must be a valid twitter.com or x.com profile URL",
  },
  youtube: {
    label: "YouTube",
    placeholder: "https://www.youtube.com/@yourchannel",
    apiUrl: "accounts/me/update-youtube-link",
    userField: "youtubeLink",
    inputType: "url",
    prefix: "https://www.youtube.com",
    hint: "Must be a valid youtube.com channel URL",
  },
  reddit: {
    label: "Reddit",
    placeholder: "https://www.reddit.com/u/yourname",
    apiUrl: "accounts/me/update-reddit-link",
    userField: "redditLink",
    inputType: "url",
    prefix: "https://www.reddit.com",
    hint: "Must be a valid reddit.com profile URL",
  },
  discord: {
    label: "Discord",
    placeholder: "your_username",
    apiUrl: "accounts/me/update-discord-link",
    userField: "discordLink",
    inputType: "text",
    hint: "Enter your Discord username",
  },
  email: {
    label: "Personal Email",
    placeholder: "you@example.com",
    apiUrl: "accounts/me/update-personal-email-link",
    userField: "personalEmailLink",
    inputType: "email",
    hint: "This email will be visible on your public profile",
  },
  website: {
    label: "Personal Website",
    placeholder: "https://yourwebsite.com",
    apiUrl: "accounts/me/update-personal-website-link",
    userField: "personalWebsiteLink",
    inputType: "url",
    prefix: "https://",
    hint: "Must start with https://",
  },
};

interface Props {
  linkType: LinkType;
}

const LinkConfiguration = ({ linkType }: Props) => {
  const config = LINK_CONFIGS[linkType];

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const current = user?.[config.userField] as string | undefined;
    if (current && current !== "") setValue(current);
  }, []);

  const handleOnChange = (val: string) => {
    setValue(val);
    if (isError) { setIsError(false); setErrMsg(""); }
  };

  const validate = (val: string): boolean => {
    if (config.prefix && !val.toLowerCase().startsWith(config.prefix)) {
      setIsError(true);
      setErrMsg(`${config.hint}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!validate(trimmed)) return;

    setIsLoading(true);
    await axiosApiInstanceAuth
      .request({
        url: config.apiUrl,
        method: "post",
        data: { newLink: trimmed },
      })
      .then((res) => {
        dispatch(setNewUser({ ...user, [config.userField]: res.data } as Profile));
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrMsg("Something went wrong. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  const currentValue = user?.[config.userField] as string | undefined;
  const isUnchanged = value.trim() === (currentValue ?? "");

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

      {/* Current value */}
      <div className="bg-[#13161d] border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-0.5">
        <span className="text-xs text-white/30 uppercase tracking-wider font-medium">Current</span>
        <p className="text-white/60 text-sm truncate">
          {currentValue && currentValue !== ""
            ? currentValue
            : <span className="text-white/25 italic">Not set</span>}
        </p>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
          {config.label}
        </label>
        <input
          type={config.inputType}
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
          placeholder={config.placeholder}
          className="w-full bg-[#1c1f27] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/25"
        />
        <p className="text-xs text-white/25">{config.hint}</p>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-red text-sm font-medium">{errMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isUnchanged || !value.trim() || isLoading}
        className="w-full py-3 rounded-xl bg-blue-primary text-white text-sm font-semibold hover:bg-blue-primary/80 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? "Saving..." : `Save ${config.label}`}
      </button>

    </form>
  );
};

export default LinkConfiguration;
