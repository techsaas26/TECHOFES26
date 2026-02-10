import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Techofes '79 – Contact Query");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );

    window.location.href = `mailto:saascegc@gmail.com?cc=techsaas26@gmail.com&subject=${subject}&body=${body}`;
  };

  return (
    <section className="bg-gray-950 text-gray-300 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-thunder-semi text-purple-200 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            For event details, collaborations, or technical queries — reach out
            to us.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-200 mt-1" />
              <div>
                <h4 className="text-purple-200 font-semibold text-sm mb-1">
                  Email
                </h4>
                <p className="text-gray-400 text-sm">saascegc@gmail.com</p>
                <p className="text-gray-400 text-sm">
                  Tech Queries - techsaas26@gmail.com{" "}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-purple-200 mt-1" />
              <div>
                <h4 className="text-purple-200 font-semibold text-sm mb-1">
                  Phone
                </h4>
                <p className="text-gray-400 text-sm">
                  {/* You will add later */}
                  Events - Nikaash +91 84389 74361{" "}
                </p>
                <p className="text-gray-400 text-sm">
                  Marketing - Navanee +91 93847 91862{" "}
                </p>
                <p className="text-gray-400 text-sm">
                  HR - Dharshini +91 63854 47456
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-purple-200 mt-1" />
              <div>
                <h4 className="text-purple-200 font-semibold text-sm mb-1">
                  Location
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                  Anna University
                  <br />
                  Guindy, Chennai
                  <br />
                  Tamil Nadu, India
                </p>
                <a
                  href="https://www.google.com/maps/place/AnnaUniversityChennaihttps://www.google.com/maps/place/Anna+University/@13.0110783,80.2337369,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52679fd80e657f:0x9727dde0ba49c84e!8m2!3d13.0110731!4d80.2363118!16zL20vMDI0NTFr?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-200 hover:text-purple-100 transition text-sm font-semibold"
                >
                  View on Map →
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8 space-y-6 backdrop-blur"
          >
            <div>
              <label className="block text-xs text-gray-400 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-200 transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-200 transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-200 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center w-full rounded-full bg-purple-200 text-gray-950 py-3 text-sm font-semibold hover:bg-purple-100 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
