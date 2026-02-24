import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  School,
  BookOpen,
  Building2,
  Hash,
  ArrowLeft,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect if not logged in
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Token expired or invalid
        if (res.status === 401) {
          localStorage.removeItem("token");

          navigate("/login", { replace: true });

          return;
        }

        let data;

        try {
          data = await res.json();
        } catch {
          data = null;
        }

        setUser(data);
      } catch (err) {
        console.error("Profile Error:", err);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  /* ======================
     Loading Screen
  ====================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0c1a] text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0c1a]">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#0f1329] via-[#1a1d3a] to-[#16132a]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_50%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.12),transparent_50%)]" />
      </div>

      <button
        onClick={() => navigate(-1)}
        className="
    absolute top-6 left-6
    flex items-center gap-2
    px-4 py-2
    rounded-xl
    bg-white/10
    border border-white/20
    text-white
    hover:bg-white/20
    transition
  "
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Card */}

      <div className="relative z-10 w-full max-w-3xl px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">My Profile</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <ProfileField icon={User} label="Username" value={user?.username} />

            <ProfileField icon={Hash} label="T-ID" value={user?.T_ID} />

            <ProfileField icon={Mail} label="Email" value={user?.email} />

            <ProfileField
              icon={Phone}
              label="Phone"
              value={user?.phoneNumber}
            />

            <ProfileField
              icon={School}
              label="Roll Number"
              value={user?.rollNo}
            />

            <ProfileField
              icon={Building2}
              label="College"
              value={user?.college}
            />

            <ProfileField
              icon={BookOpen}
              label="Department"
              value={user?.department}
            />

            <ProfileField
              icon={User}
              label="User Type"
              value={user?.userType}
            />
          </div>

          {/* Logout Button */}

          <button
            onClick={() => {
              localStorage.removeItem("token");

              navigate("/login", { replace: true });
            }}
            className="mt-8 w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

/* ======================
   Field Component
====================== */

const ProfileField = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 text-indigo-400" />

        <span className="text-white/70 text-sm">{label}</span>
      </div>

      <div className="text-white font-medium">{value || "-"}</div>
    </div>
  );
};

export default Profile;
