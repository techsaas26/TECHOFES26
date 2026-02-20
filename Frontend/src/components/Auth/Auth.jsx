import { memo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft, Eye, EyeOff } from "lucide-react";

// --- Reusable Sub-Components ---

const AuthBackground = () => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    <div className="absolute inset-0 bg-linear-to-br from-[#0f1329] via-[#1a1d3a] to-[#16132a]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.12),transparent_50%)]" />
    <div
      className="absolute top-0 left-0 right-0 h-px opacity-60"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.6), transparent)",
      }}
    />
  </div>
);

const AuthPromo = ({ onBack }) => (
  <div className="relative z-10 flex flex-col justify-between w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-6 lg:py-12 order-1 lg:order-1">
    <div className="auth-promo-content animate-auth-promo flex flex-col">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors mb-6 lg:mb-16 self-start"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="flex items-center gap-2 mb-6 lg:mb-24">
        <img src="/T79-logo.png" alt="Techofes" className="h-20 w-auto object-contain" />
      </div>

      <h1 className="hidden lg:block text-3xl sm:text-4xl lg:text-5xl xl:text-[2.75rem] font-bold text-white leading-tight max-w-lg">
        Experience the{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
          next frontier
        </span>{" "}
        of tech and culture.
      </h1>
      <p className="hidden lg:block mt-6 text-white/70 text-base sm:text-lg max-w-md leading-relaxed">
        Join our community of visionaries and creators. Secure, fast, and beautifully crafted for
        the modern web.
      </p>
    </div>

    <div className="hidden lg:block mt-10 pt-8 border-t border-white/10">
      <p className="text-white/50 text-sm">
        © 2026 Techofes · <span className="text-white/60">Technical team</span>
      </p>
    </div>
  </div>
);

const AuthInput = ({ label, id, icon: Icon, rightElement, ...props }) => (
  <div className="auth-field animate-auth-field">
    <label htmlFor={id} className="block text-white/90 text-sm font-medium mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
      )}
      <input
        id={id}
        {...props}
        className={`w-full h-12 sm:h-13 ${Icon ? "pl-12" : "pl-4"} ${
          rightElement ? "pr-12" : "pr-4"
        } rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all`}
      />
      {rightElement && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  </div>
);

// --- Main Component ---

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0a0c1a]">
      <AuthBackground />

      <AuthPromo onBack={() => navigate("/")} />

      {/* Right: Sign in form */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-6 lg:py-12 order-2 lg:order-2">
        <div className="auth-card animate-auth-card w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
            Enter your credentials to access your workspace.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              label="Username"
              id="auth-username"
              type="text"
              icon={Mail}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username"
              autoComplete="username"
              required
            />

            <AuthInput
              label="Password"
              id="auth-password"
              type={showPassword ? "text" : "password"}
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/40 hover:text-white/70 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                />
                <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                  Remember this device
                </span>
              </label>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="auth-submit animate-auth-submit w-full h-12 sm:h-14 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-6 sm:mt-8 text-center text-white/60 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Auth);