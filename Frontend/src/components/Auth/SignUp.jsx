import { memo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  UserPlus,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Phone,
  School,
} from "lucide-react";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    rollNo: "",
    userType: "Student",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const inputClass =
    "w-full h-9 sm:h-10 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm";
  const inputClassWithIcon =
    "w-full h-9 sm:h-10 pl-10 pr-10 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = name === "email" ? value.toLowerCase() : value;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : nextValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return;
    if (!form.acceptTerms) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
  };

  const passwordsMatch = form.password === form.confirmPassword || !form.confirmPassword;

  return (
    <section className="relative h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0a0c1a]">
      {/* Gradient background with glow */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1329] via-[#1a1d3a] to-[#16132a]" />
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

      {/* Left: Promotional section - logo first on mobile, description hidden on mobile */}
      <div className="relative z-10 flex flex-col justify-between w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-6 lg:py-12 order-1 lg:order-1">
        <div className="auth-promo-content animate-auth-promo flex flex-col">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors mb-6 lg:mb-16 self-start"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 mb-6 lg:mb-24">
            <img src="/T79-logo.png" alt="Techofes" className="h-10 w-auto object-contain" />
            <span className="text-xl font-semibold text-white tracking-tight">TECHOFES</span>
          </div>

          <h1 className="hidden lg:block text-3xl sm:text-4xl lg:text-5xl xl:text-[2.75rem] font-bold text-white leading-tight max-w-lg">
            Experience the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
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
            © 2025 Techofes ·{" "}
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Right: Sign up form - under logo on mobile */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full lg:w-1/2 px-3 sm:px-6 lg:px-8 py-3 lg:py-6 order-2 lg:order-2">
        <div
          className="auth-card animate-auth-card w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_36px_-12px_rgba(0,0,0,0.5)] p-3 sm:p-4 lg:p-6 my-1 flex flex-col"
          style={{ width: 'calc(100% - 60px)', maxWidth: '612px', maxHeight: 'calc(100vh - 110px)' }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Create your account</h2>
          <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
            Fill in your details to join Techofes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-12 auth-field animate-auth-field">
                <label htmlFor="signup-username" className="block text-white/90 text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                    <input
                    id="signup-username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="your-username"
                    autoComplete="username"
                    required
                      className={inputClass}
                  />
                </div>
              </div>

              <div className="sm:col-span-6 auth-field animate-auth-field">
                <label htmlFor="signup-first" className="block text-white/90 text-sm font-medium mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                  <input
                    id="signup-first"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    autoComplete="given-name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="sm:col-span-6 auth-field animate-auth-field">
                <label htmlFor="signup-last" className="block text-white/90 text-sm font-medium mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                  <input
                    id="signup-last"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    autoComplete="family-name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="sm:col-span-12 auth-field animate-auth-field">
                <label htmlFor="signup-email" className="block text-white/90 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    autoComplete="email"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="sm:col-span-6 auth-field animate-auth-field">
                <label htmlFor="signup-phone" className="block text-white/90 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                  <input
                    id="signup-phone"
                    name="phoneNumber"
                    type="tel"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="sm:col-span-6 auth-field animate-auth-field">
                <label htmlFor="signup-roll" className="block text-white/90 text-sm font-medium mb-2">
                  Roll No
                </label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                  <input
                    id="signup-roll"
                    name="rollNo"
                    type="text"
                    value={form.rollNo}
                    onChange={handleChange}
                    placeholder="Roll number / ID"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="sm:col-span-12 auth-field animate-auth-field">
                <label htmlFor="signup-usertype" className="block text-white/90 text-sm font-medium mb-2">
                  User Type
                </label>
                <div className="relative">
                  <select
                    id="signup-usertype"
                    name="userType"
                    value={form.userType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Student</option>
                    <option>Faculty</option>
                    <option>Guest</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="auth-field animate-auth-field">
              <label htmlFor="signup-password" className="block text-white/90 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={inputClassWithIcon}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="auth-field animate-auth-field">
              <label
                htmlFor="signup-confirm"
                className="block text-white/90 text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                <input
                  id="signup-confirm"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  required
                  className={`${inputClassWithIcon} ${!passwordsMatch ? "border-red-500/50 focus:ring-red-500/50" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors p-1"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {!passwordsMatch && (
                <p className="mt-1 text-sm text-red-400">Passwords do not match</p>
              )}
            </div>

            <label className="auth-field animate-auth-field flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
              />
              <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                I agree to the{" "}
                <a href="#" className="text-indigo-400 hover:text-indigo-300 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-400 hover:text-indigo-300 underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !passwordsMatch || !form.acceptTerms}
              className="auth-submit animate-auth-submit w-full h-10 sm:h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_3px_10px_rgba(99,102,241,0.35)] hover:shadow-[0_5px_16px_rgba(99,102,241,0.45)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          <div className="auth-social mt-3 sm:mt-5 mt-auto">
            <div className="flex items-center gap-4 my-3">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-white/50 text-xs font-medium tracking-wider">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-white/20" />
            </div>
            <button
              type="button"
              className="auth-social animate-auth-social w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-4 sm:mt-6 text-center text-white/60 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(SignUp);
