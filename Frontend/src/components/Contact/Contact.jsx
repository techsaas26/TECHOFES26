import { memo, useState, useCallback } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../Footer/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Techofes '79 – Contact Query");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );

    window.location.href = `mailto:saascegc@gmail.com?cc=techsaas26@gmail.com&subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <>
    <section className="relative min-h-screen bg-blue text-white">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0 bg-black" />
      
      {/* Scrollable Content */}
      <div className="relative z-10 py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
              For event details, collaborations, or technical queries - reach out
              to us.
            </p>
          </div>

          {/* Contact Info & Form - 2 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Side - Contact Info Cards */}
            <div>
              {/* Email and Phone Row */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6">
                {/* Email Card */}
                <div className="bg-gray-900/40 border border-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:border-gray-700 transition aspect-square flex flex-col justify-center items-center">
                  <div className="flex justify-center mb-2 md:mb-3">
                    <div className="text-2xl sm:text-3xl md:text-4xl">@</div>
                  </div>
                  <h3 className="text-gray-300 uppercase tracking-widest text-xs font-semibold mb-1 md:mb-2">
                    Email
                  </h3>
                  <p className="text-white text-xs sm:text-sm font-medium mb-0.5 md:mb-1 line-clamp-1">
                    saascegc@gmail.com
                  </p>
                  <p className="text-gray-500 text-xs mb-0.5 md:mb-1">
                    Tech Queries
                  </p>
                  <p className="text-white text-xs sm:text-sm font-medium line-clamp-1">
                    techsaas26@gmail.com
                  </p>
                </div>

                {/* Phone Card */}
                <div className="bg-gray-900/40 border border-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:border-gray-700 transition aspect-square flex flex-col justify-center items-center">
                  <div className="flex justify-center mb-2 md:mb-3">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-gray-300 uppercase tracking-widest text-xs font-semibold mb-1 md:mb-2">
                    Phone
                  </h3>
                  <p className="text-gray-500 text-xs mb-0.5">HR - DHARSHINI</p>
                  <p className="text-white text-xs sm:text-sm font-medium mb-1 md:mb-2">
                    +91 63854 47456
                  </p>
                  <p className="text-gray-500 text-xs mb-0.5">HR - THILAGARAJ</p>
                  <p className="text-white text-xs sm:text-sm font-medium">
                    +91 90254 04846
                  </p>
                </div>
              </div>

              {/* Location Card - Centered */}
              <div className="flex justify-center">
                <div className="bg-gray-900/40 border border-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:border-gray-700 transition aspect-square w-1/2 flex flex-col justify-center items-center">
                  <div className="flex justify-center mb-2 md:mb-3">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-gray-300 uppercase tracking-widest text-xs font-semibold mb-1 md:mb-2">
                    Location
                  </h3>
                  <p className="text-white text-xs sm:text-sm font-medium mb-0.5 md:mb-1">
                    Anna University, Guindy
                  </p>
                  <p className="text-gray-400 text-xs font-medium mb-0.5 md:mb-1">
                    Chennai, Tamil Nadu
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Anna+University/@13.0110783,80.2337369,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52679fd80e657f:0x9727dde0ba49c84e!8m2!3d13.0110731!4d80.2363118!16zL20vMDI0NTFr?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition text-xs font-semibold mt-1 md:mt-2 inline-block"
                  >
                    VIEW ON MAP →
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-gray-900/30 border border-gray-800 rounded-lg sm:rounded-xl md:rounded-3xl p-4 sm:p-6 md:p-8"
              >
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* Name and Email Row */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 md:mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-transparent border-b border-gray-700 px-0 py-2 md:py-3 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 md:mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="hello@example.com"
                        className="w-full bg-transparent border-b border-gray-700 px-0 py-2 md:py-3 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 md:mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="w-full bg-transparent border-b border-gray-700 px-0 py-2 md:py-3 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-2 md:pt-4">
                    <button
                      type="submit"
                      className="px-6 sm:px-8 md:px-12 py-2 md:py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default memo(Contact);
