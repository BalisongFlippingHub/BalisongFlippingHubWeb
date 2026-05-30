import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLock, faShield, faEye, faEyeSlash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { axiosApiInstanceAuth } from "../../api/axios";

const ProfileConfigurationChangePasswordPage = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const hasMinLength = newPassword.length >= 7;
  const hasCapital = /[A-Z]/.test(newPassword);
  const hasSpecial = /[^a-zA-Z0-9]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";
  const isValid = hasMinLength && hasCapital && hasSpecial && passwordsMatch;

  const clearError = () => { if (isError) { setIsError(false); setErrMsg(""); } };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setErrMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setErrMsg("");

    await axiosApiInstanceAuth
      .request({
        url: "accounts/me/change-password",
        method: "post",
        data: { newPassword: newPassword.trim() },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrMsg("Something went wrong. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

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
          <h1 className="text-white font-bold text-xl">Change Password</h1>
        </div>

        {/* Security banner */}
        <div className="flex gap-3 bg-gold/5 border border-gold/25 rounded-xl px-4 py-3.5">
          <FontAwesomeIcon icon={faShield} className="text-gold text-sm mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-0.5">
            <p className="text-gold text-xs font-semibold">Account security change</p>
            <p className="text-white/50 text-xs leading-relaxed">
              Choose a strong password and don't reuse it across other sites. You'll need your current password to confirm this change.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* New password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40 uppercase tracking-wider font-medium">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); clearError(); }}
                onFocus={() => setNewPasswordFocused(true)}
                onBlur={() => setNewPasswordFocused(false)}
                placeholder="••••••••"
                className="w-full bg-[#1c1f27] border border-white/10 rounded-xl px-4 py-3 pr-10 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/25"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} />
              </button>
            </div>

            {/* Requirements checklist */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: newPasswordFocused || newPassword.length > 0 ? "6rem" : "0", opacity: newPasswordFocused || newPassword.length > 0 ? 1 : 0 }}
            >
              <div className="flex flex-col gap-1 pt-1">
                {[
                  { label: "At least 7 characters", met: hasMinLength },
                  { label: "One capital letter", met: hasCapital },
                  { label: "One special character", met: hasSpecial },
                ].map(({ label, met }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`text-[10px] transition-colors duration-200 ${met ? "text-green" : "text-white/20"}`}
                    />
                    <span className={`text-xs transition-colors duration-200 ${met ? "text-green" : "text-white/30"}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Confirm new password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Confirm New Password</label>
              {confirmPassword.length > 0 && (
                <span className={`text-xs font-medium transition-colors duration-200 ${passwordsMatch ? "text-green" : "text-red"}`}>
                  {passwordsMatch ? "Passwords match" : "Does not match"}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                placeholder="••••••••"
                className="w-full bg-[#1c1f27] border border-white/10 rounded-xl px-4 py-3 pr-10 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/25"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Error */}
          {isError && (
            <p className="text-red text-sm font-medium">{errMsg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full py-3 rounded-xl bg-blue-primary text-white text-sm font-semibold hover:bg-blue-primary/80 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faLock} className="text-xs" />
            {isLoading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default ProfileConfigurationChangePasswordPage;
