import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FileUpload } from "../ui/file-upload";
import Typography from "../display/typography/Typography";
import { Loader2 } from "lucide-react";
// CSS import is moved to _app.js or globals.css

const ApplicationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whyJoin: ""
  });
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResumeUpload = (files) => {
    if (files && files.length > 0) {
      // Store the raw file object
      setResume(files[0]);
      console.log("Resume selected:", files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.whyJoin) {
        throw new Error("Please fill all required fields");
      }

      // Create form data for submission
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("whyJoin", formData.whyJoin);

      if (resume) {
        console.log(
          "Attaching resume to form submission:",
          resume.name,
          resume.type,
          resume.size + " bytes"
        );
        submitData.append("resume", resume);
      }

      // Submit form
      const response = await fetch("/api/applications", {
        method: "POST",
        body: submitData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      // Handle success
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        whyJoin: ""
      });
      setResume(null);

      // Redirect after a delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error("Application submission error:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center py-8 md:py-12 application-form-container"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        marginBottom: "50px",
        borderRadius: "8px"
      }}
    >
      {success ? (
        <div className="text-center py-8 w-full">
          <Typography variant="h2" className="text-green-500 mb-4">
            Application Submitted!
          </Typography>
          <Typography variant="body" className="text-white">
            Thank you for applying to join Geek Room Plaksha! We'll review your
            application and get back to you soon.
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start justify-between px-4 md:px-12 w-full">
          {error && (
            <div className="p-4 mb-6 w-full bg-red-900/20 border border-red-800 rounded-md text-red-400">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full md:flex md:flex-wrap md:gap-x-8 md:justify-between"
          >
            <div className="md:w-[48%] md:flex-shrink-0 space-y-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border-solid border-[#00acb2] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#00acb2] bg-transparent"
                  placeholder="Full Name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border-solid border-[#00acb2] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#00acb2] bg-transparent"
                  placeholder="Email Address"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border-solid border-[#00acb2] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#00acb2] bg-transparent"
                  placeholder="Why do you want to join Geek Room Plaksha?"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="md:w-[48%] md:flex-shrink-0 mt-6 md:mt-0 application-file-upload">
              <p className="mb-2 text-sm text-white">Resume / CV (Optional)</p>
              <div className="bg-transparent border border-[#00acb2] rounded file-box h-[220px] flex items-center justify-center">
                <FileUpload onChange={handleResumeUpload} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-gray-400 upload-text">
                  Upload your resume or CV (PDF or Word format preferred)
                </p>
                {resume && (
                  <p className="text-sm text-green-400">
                    ✓ {resume.name} selected
                  </p>
                )}
              </div>
            </div>

            <div className="w-full mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors duration-300 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
