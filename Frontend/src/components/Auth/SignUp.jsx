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
  BookOpen,
  Building2,
} from "lucide-react";

// Reusable Input Component for consistency
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="auth-field animate-auth-field w-full">
    <label className="block text-white/90 text-sm font-medium mb-1.5 ml-1">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
      )}
      <input
        {...props}
        className={`w-full h-11 ${
          Icon ? "pl-12" : "pl-4"
        } pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm`}
      />
    </div>
  </div>
);

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    collegeName: "",
    department: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    userType: "CEG",
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    setIsSubmitting(true);
    
    // Simulate API Call
    await new Promise((r) => setTimeout(r, 800));
    
    const { confirmPassword, acceptTerms, ...payload } = form;
    console.log("Payload to send:", payload);
    setIsSubmitting(false);
  };

  const passwordsMatch = form.password === form.confirmPassword || !form.confirmPassword;

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0a0c1a]">
      {/* Background Gradients (Directly from Auth.jsx) */}
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

      {/* Left: Promotional section (Identical to Auth.jsx) */}
      <div className="relative z-10 flex flex-col justify-between w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-6 lg:py-12 order-1 lg:order-1">
        <div className="auth-promo-content animate-auth-promo flex flex-col">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors mb-6 lg:mb-16 self-start"
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
            of culture.
          </h1>
          <p className="hidden lg:block mt-6 text-white/70 text-base sm:text-lg max-w-md leading-relaxed">
            Join our community of visionaries and creators. Secure, fast, and beautifully crafted for
            the modern web.
          </p>
        </div>

        <div className="hidden lg:block mt-10 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm">
            © 2026 Techofes ·{" "}
            <span className="text-white/60 hover:text-white transition-colors">
              Technical team
            </span>
          </p>
        </div>
      </div>

      {/* Right: Sign Up form section */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-6 lg:py-12 order-2 lg:order-2">
        <div className="auth-card animate-auth-card w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Create Account</h2>
          <p className="text-white/60 text-sm sm:text-base mb-8">
            Fill in your details to join Techofes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Grid for fields to prevent the form from becoming too long */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Username" name="username" icon={User} value={form.username} onChange={handleChange} required placeholder="john123" />
              <InputField label="Full Name" name="fullName" icon={User} value={form.fullName} onChange={handleChange} required placeholder="John Doe" />
              
              <InputField label="Email Address" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} required placeholder="john@example.com" />
              <InputField label="Phone Number" name="phoneNumber" type="tel" icon={Phone} value={form.phoneNumber} onChange={handleChange} required placeholder="9876543210" />
              
              <InputField label="College Name" name="collegeName" icon={Building2} value={form.collegeName} onChange={handleChange} required placeholder="Your College" />
              <InputField label="Department" name="department" icon={BookOpen} value={form.department} onChange={handleChange} required placeholder="Your dept" />
              
              <InputField label="Roll No" name="rollNo" icon={School} value={form.rollNo} onChange={handleChange} required placeholder="202xxxxxxx" />

              <div className="auth-field animate-auth-field">
                <label className="block text-white/90 text-sm font-medium mb-1.5 ml-1">User Type</label>
                <select
                  name="userType"
                  value={form.userType}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm appearance-none"
                >
                  <option value="CEG" className="bg-[#1a1d3a]">CEG</option>
                  <option value="NON-CEG" className="bg-[#1a1d3a]">Other College</option>
                  <option value="GUEST" className="bg-[#1a1d3a]">Guest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <InputField 
                  label="Password" name="password" 
                  type={showPassword ? "text" : "password"} 
                  icon={Lock} value={form.password} onChange={handleChange} required placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-9.5 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <InputField 
                label="Confirm Password" name="confirmPassword" 
                type="password" icon={Lock} value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••" 
              />
            </div>

            {!passwordsMatch && (
              <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
            )}

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group mb-6">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                />
                <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                  I agree to the <a href="#" className="text-indigo-400 underline">Terms</a> and <a href="#" className="text-indigo-400 underline">Privacy Policy</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting || !passwordsMatch || !form.acceptTerms}
                className="auth-submit animate-auth-submit w-full h-12 sm:h-14 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
            </div>
          </form>

          <p className="mt-6 text-center text-white/60 text-sm">
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