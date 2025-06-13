import React, { useState } from "react";
import {
  Plus,
  Clock,
  ShieldCheck,
  CreditCard,
  FileText,
  Shield,
  Monitor,
  MessageCircle,
  AlertTriangle,
  Mail,
  Phone,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const supportCategories = [
  {
    title: "Payment Issues",
    desc: "Resolve payment delays, disputes, and processing errors.",
    count: 42,
    icon: (
      <>
        <div className="p-2 bg-green-100 rounded-full">
          <CreditCard size={24} className="text-green-600" />
        </div>
      </>
    ),
  },
  {
    title: "Contract Disputes",
    desc: "Handle contract disagreements, scope changes, and terminations.",
    count: 38,
    icon: (
      <>
        <div className="p-2 bg-green-100 rounded-full">
          <FileText size={24} className="text-green-600" />
        </div>
      </>
    ),
  },
  {
    title: "Account Security",
    desc: "Protect your account, report suspicious activity, and recover access.",
    count: 29,
    icon: (
      <>
        <div className="p-2 bg-green-100 rounded-full">
          <Shield size={24} className="text-green-600" />
        </div>
      </>
    ),
  },
  {
    title: "Platform Usage",
    desc: "Learn how to use platform features, tools, and improve workflow.",
    count: 56,
    icon: (
      <>
        <div className="p-2 bg-green-100 rounded-full">
          <Monitor size={24} className="text-green-600" />
        </div>
      </>
    ),
  },
  {
    title: "Communication Issues",
    desc: "Solve messaging problems, unresponsive clients, and language barriers.",
    count: 31,
    icon: (
      <>
        <div className="p-2 bg-green-100 rounded-full">
          <MessageCircle size={24} className="text-green-600" />
        </div>
      </>
    ),
  },
  {
    title: "Terms Violation",
    desc: "Report policy violations, inappropriate behavior, and fraud attempts.",
    count: 24,
    icon: (
      <>
        <div className="p-2 bg-green-100 rounded-full">
          <AlertTriangle size={20} className="text-green-600" />
        </div>
      </>
    ),
  },
];


export default function SupportCenter() {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "",
    emailUpdates: true,
  });

  const [attachments, setAttachments] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [helpful, setHelpful] = useState(null); // 'yes' | 'no' | null
  const [feedback, setFeedback] = useState("");
 const navigate =useNavigate()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePriorityClick = (level) => {
    setFormData((prev) => ({ ...prev, priority: level }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);

    // Generate preview URLs
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) =>
          resolve({ name: file.name, url: e.target.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(setPreviewUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to API or console log for now
    const payload = {
      ...formData,
      attachments,
    };

    console.log("Submitting Ticket:", payload);
    alert("Ticket submitted!");
  };

  const handleSubmitHelpful = () => {
    if (!helpful && !feedback.trim()) {
      alert("Please select Yes/No or leave some feedback.");
      return;
    }

    const payload = {
      helpful,
      feedback,
    };

    console.log("Feedback submitted:", payload);
    alert("Thank you for your feedback!");
    // Optionally reset form
    setHelpful(null);
    setFeedback("");
  };

  return (
    <div className="tw-css bg-gray-50 min-h-screen">
      {/* Header */}

      <div className="bg-gradient-to-r from-green-100 to-purple-50 px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-10 px-4 py-5">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Support & Dispute Resolution Center
          </h1>
          <p className="text-gray-600 mt-4 text-base md:text-lg">
            Get help with your account, projects, or resolve disputes quickly
            and efficiently.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center rounded-full shadow bg-white overflow-hidden">
              <input
                type="text"
                placeholder="Search help articles and FAQs"
                className="flex-grow px-4 py-2 outline-none text-gray-700"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-medium rounded-r-full">
                Search
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row sm:flex-row justify-center gap-4 mt-6">
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2 rounded-lg shadow hover:bg-gray-100">
              <Plus size={16} /> Submit Ticket
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2 rounded-lg shadow hover:bg-gray-100">
              <Clock size={16} /> Track Request
            </button>
            <button 
            onClick={()=>navigate('/dashboard-candidate/dispute-resolution')}
            className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2 rounded-lg shadow hover:bg-gray-100">
              <ShieldCheck size={16} /> Start Dispute
            </button>
          </div>
        </div>
      </div>

      {/* Support Section with Gradient Background */}
      <div className="py-12 px-4 max-w-7xl mx-auto space-y-14">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Left: Support Categories */}

          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3 ">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600">{item.desc}</p>
                <span className="text-sm text-gray-500 mt-2 inline-block">
                  {item.count} articles
                </span>
              </div>
            ))}
          </div>

          {/* Right: Quick Links & Active Cases */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Quick Links
              </h4>
              <ul className="space-y-2 text-green-700 font-medium">
                <li>Frequently Asked Questions</li>
                <li>User Guides & Tutorials</li>
                <li>Safety & Security Center</li>
                <li>Terms of Service</li>
                <li>Community Forums</li>
              </ul>
            </div>

            {/* Active Cases */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Your Active Cases
              </h4>
              <div className="border-l-4 border-yellow-500 pl-4 mb-4">
                <p className="text-sm text-gray-600">#TK-38291</p>
                <p className="font-semibold text-gray-800">
                  Payment not received for completed milestone
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">Updated: May 10, 2025</p>
                <button className="text-green-700 font-medium mt-1 hover:underline">
                  View Details
                </button>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 mb-4">
                <p className="text-sm text-gray-600">#TK-38291</p>
                <p className="font-semibold text-gray-800">
                  Payment not received for completed milestone
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">Updated: May 10, 2025</p>
                <button className="text-green-700 font-medium mt-1 hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 p-8 mx-auto py-5">
          {/* LEFT: Submit Ticket Form */}
          <div className="md:col-span-2 bg-white p-8 rounded-md shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">
              Submit a Support Ticket
            </h2>

            <form
              onSubmit={handleSubmit}
              className="md:col-span-2 bg-white p-6 rounded-md shadow-sm border"
            >
              <h2 className="text-xl font-semibold mb-4">
                Submit a Support Ticket
              </h2>

              {/* Issue Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Issue Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="login">Login Issues</option>
                  <option value="billing">Billing</option>
                  <option value="bug">Bug Report</option>
                </select>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide as much detail as possible..."
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                ></textarea>
              </div>

              {/* Attachments */}
              {/* Attachments */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Attachments
                </label>
                <label className="w-full border-dashed border-2 border-gray-300 rounded px-3 py-6 text-center text-sm text-gray-500 cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  📎 Drag files here or click to upload
                  <p className="text-xs mt-1">
                    Max file size: 10MB. Supported formats: JPG, PNG, PDF, DOC,
                    DOCX
                  </p>
                </label>

                {/* Previews */}
                {previewUrls.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {previewUrls.map((file, idx) =>
                      file.url.startsWith("data:image") ? (
                        <img
                          key={idx}
                          src={file.url}
                          alt={file.name}
                          className="rounded border w-full object-cover h-32"
                        />
                      ) : (
                        <div
                          key={idx}
                          className="rounded border p-3 text-xs text-gray-600 bg-gray-50 flex items-center justify-center h-32"
                        >
                          {file.name}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Priority Level */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Priority Level
                </label>
                <div className="flex gap-3">
                  {["Low", "Medium", "High"].map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => handlePriorityClick(level)}
                      className={`flex-1 border rounded px-3 py-2 text-sm ${
                        formData.priority === level
                          ? "bg-green-600 text-white"
                          : "bg-white"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Updates */}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="emailUpdates"
                  checked={formData.emailUpdates}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Email me updates about this ticket
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm font-medium"
              >
                Submit Ticket
              </button>
            </form>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6">
            {/* Contact Us */}
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="text-sm font-semibold mb-3">Contact Us</h3>

              <div className="text-sm space-y-4">
                {/* Live Chat */}
                <div>
                  <p className="flex items-center gap-2 mb-1">
                    <div className="p-2 bg-green-100 rounded-full">
                      <MessageCircle className="w-4 h-4 text-green-500" />
                    </div>

                    <strong>Live Chat</strong>
                  </p>
                  <p className="text-xs text-gray-500 ml-5">
                    Available now – Response in 2 min
                  </p>
                  <a
                    href="#"
                    className="ml-5 text-blue-600 hover:underline text-xs"
                  >
                    Start Chat
                  </a>
                </div>

                {/* Email Support */}
                <div>
                  <p className="flex items-center gap-2 mb-1">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>

                    <strong>Email Support</strong>
                  </p>
                  <p className="text-xs text-gray-500 ml-5">
                    24/7 • Response in 24 hours
                  </p>
                  <a
                    href="#"
                    className="ml-5 text-blue-600 hover:underline text-xs"
                  >
                    Send Email
                  </a>
                </div>

                {/* Phone Support */}
                <div>
                  <div className="flex items-center gap-x-2 mb-1">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Phone className="w-4 h-4 text-purple-400" />
                    </div>
                    <strong>Phone Support</strong>
                  </div>

                  <p className="text-xs text-gray-500 ml-5">
                    Mon–Fri, 9AM–6PM GMT
                  </p>
                  <a
                    href="tel:+18005550123"
                    className="ml-5 text-green-600 font-medium hover:underline text-xs"
                  >
                    +233 (200) 555-0123
                  </a>
                </div>
              </div>
            </div>

            {/* Help Us Improve */}
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="text-sm font-semibold mb-3">Help Us Improve</h3>
              <p className="text-sm mb-2">
                Was this support center helpful? Let us know how we can improve.
              </p>

              {/* Like / Dislike */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setHelpful("yes")}
                  className={`flex-1 border rounded px-3 py-2 text-sm flex items-center justify-center gap-2 transition ${
                    helpful === "yes"
                      ? "bg-green-100 border-green-400"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHelpful("no")}
                  className={`flex-1 border rounded px-3 py-2 text-sm flex items-center justify-center gap-2 transition ${
                    helpful === "no"
                      ? "bg-red-100 border-red-400"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  No
                </button>
              </div>

              {/* Feedback Textarea */}
              <textarea
                rows="2"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Share your feedback..."
              ></textarea>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmitHelpful}
                className="mt-2 w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 text-sm font-medium"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Dispute Resolution Process
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Our structured dispute resolution process helps clients and
            freelancers reach fair resolutions efficiently.
          </p>

          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-sm ${
                      index === 0
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-gray-100 text-gray-500 border-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-20 bg-gray-300 mx-auto"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {step.description}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" /> {step.time}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded font-medium">
              Start Dispute Process
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
