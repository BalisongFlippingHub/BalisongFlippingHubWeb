import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLock, faShield } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { axiosApiInstanceAuth } from "../../api/axios";
import { setNewUser } from "../../redux/auth/authSlice";
import { Profile } from "../../modals/User";

const ProfileConfigurationChangeEmailPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = newEmail.trim();
    if (!trimmedEmail) return;

    setIsLoading(true);
    setIsError(false);
    setErrMsg("");

    await axiosApiInstanceAuth
      .request({
        url: "accounts/me/change-email",
        method: "post",
        data: { newEmail: trimmedEmail },
      })
      .then((res) => {
        dispatch(setNewUser({ ...user, email: res.data } as Profile));
        navigate(-1);
      })
      .catch((err) => {
        setIsError(true);
        if (err.response?.status === 401) {
          setErrMsg("Incorrect password. Please try again.");
        } else if (err.response?.status === 409) {
          setErrMsg("That email is already in use.");
        } else {
          setErrMsg("Something went wrong. Please try again.");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const isUnchanged = newEmail.trim() === (user?.email ?? "") || !newEmail.trim();

  return (
    <section className="w-full min-h-screen flex justify-center pb-28 pt-6 px-4 lg:pl-[192px] bg-[#080a0e]">
      <div className="w-full max-w-[480px] md:max-w-[640px] flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
          <h1 className="text-white font-bold text-xl">Change Email</h1>
        </div>

        {/* Security banner */}
        <div className="flex gap-3 bg-gold/5 border border-gold/25 rounded-xl px-4 py-3.5">
          <FontAwesomeIcon icon={faShield} className="text-gold text-sm mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-0.5">
            <p className="text-gold text-xs font-semibold">Account credential change</p>
            <p className="text-white/50 text-xs leading-relaxed">
              Your email is used to sign in. Changing it will update your login credentials. You must confirm with your current password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Current email */}
          <div className="bg-[#13161d] border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-0.5">
            <span className="text-xs text-white/30 uppercase tracking-wider font-medium">Current Email</span>
            <p className="text-white/60 text-sm truncate">{user?.email ?? "—"}</p>
          </div>

          {/* New email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40 uppercase tracking-wider font-medium">New Email</label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => { setNewEmail(e.target.value); if (isError) { setIsError(false); setErrMsg(""); } }}
              placeholder="you@example.com"
              className="w-full bg-[#1c1f27] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/25"
            />
          </div>

          {/* Error */}
          {isError && (
            <p className="text-red text-sm font-medium">{errMsg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isUnchanged || isLoading}
            className="w-full py-3 rounded-xl bg-blue-primary text-white text-sm font-semibold hover:bg-blue-primary/80 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faLock} className="text-xs" />
            {isLoading ? "Updating..." : "Update Email"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default ProfileConfigurationChangeEmailPage;
