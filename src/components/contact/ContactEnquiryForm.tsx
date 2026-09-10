"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { apiFetch } from "@/utils/apiClient";

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
  privacy?: string;
  dates?: string;
}

type FeedbackType = "success" | "error" | null;

export default function ContactEnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "General Enquiry",
    arrivalDate: "",
    departureDate: "",
    message: "",
    privacyAgreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [submitting, setSubmitting] = useState(false);

  // Field Refs for focusing first invalid field on error
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);
  const departureDateRef = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    if (!formData.privacyAgreed) {
      newErrors.privacy = "You must agree to the privacy policy.";
    }

    if (formData.arrivalDate && formData.departureDate) {
      if (new Date(formData.departureDate) < new Date(formData.arrivalDate)) {
        newErrors.dates = "Departure date must be on or after check-in date.";
      }
    }

    setErrors(newErrors);

    // Focus first invalid field
    if (newErrors.fullName && fullNameRef.current) {
      fullNameRef.current.focus();
    } else if (newErrors.email && emailRef.current) {
      emailRef.current.focus();
    } else if (newErrors.message && messageRef.current) {
      messageRef.current.focus();
    } else if (newErrors.dates && departureDateRef.current) {
      departureDateRef.current.focus();
    } else if (newErrors.privacy && privacyRef.current) {
      privacyRef.current.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setFeedbackType(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const body = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.enquiryType,
        message: formData.message,
        enquiry_type: formData.enquiryType,
        arrival_date: formData.arrivalDate || null,
        departure_date: formData.departureDate || null,
      };

      const res = await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const successMsg =
        (res as any)?.message ||
        (res as any)?.data?.message ||
        "Thank you! Your enquiry has been sent. We'll be in touch soon.";

      setFeedbackType("success");
      setFeedback(successMsg);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        enquiryType: "General Enquiry",
        arrivalDate: "",
        departureDate: "",
        message: "",
        privacyAgreed: false,
      });
    } catch (err: any) {
      const errorMsg =
        err?.message ||
        err?.data?.message ||
        "Sorry, something went wrong. Please try again or call us directly.";
      setFeedbackType("error");
      setFeedback(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Reveal direction="up" delay={150}>
      <div className="bg-white border border-[#d9d0c4] rounded-xl p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#20382f] font-normal mb-1">
          Send us an enquiry.
        </h3>
        <p className="text-sm text-[#50544e] mb-6 font-sans">
          Fill in the form below and we’ll be in touch soon.
        </p>

        {/* Form Feedback Area */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-6 p-4 rounded-md text-sm font-medium flex items-center justify-between ${
              feedbackType === "error"
                ? "bg-red-50 border border-red-400/40 text-red-700"
                : "bg-[#e9efe8] border border-[#52c92d]/40 text-[#20382f]"
            }`}
          >
            <span>{feedback}</span>
            <button
              type="button"
              onClick={() => {
                setFeedback(null);
                setFeedbackType(null);
              }}
              className={`text-xs underline ml-2 ${
                feedbackType === "error"
                  ? "text-red-500 hover:text-red-700"
                  : "text-[#50544e] hover:text-[#20382f]"
              }`}
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4 font-sans">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold uppercase tracking-wider text-[#20382f] mb-1.5"
              >
                Full Name <span className="text-[#80563e]">*</span>
              </label>
              <input
                ref={fullNameRef}
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Your full name"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`w-full h-[48px] px-4 bg-white border ${
                  errors.fullName ? "border-red-500" : "border-[#d9d0c4]"
                } rounded-md text-sm text-[#20382f] focus:outline-none focus:ring-2 focus:ring-[#52c92d]`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-xs text-red-600 mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#20382f] mb-1.5"
              >
                Email Address <span className="text-[#80563e]">*</span>
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@email.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full h-[48px] px-4 bg-white border ${
                  errors.email ? "border-red-500" : "border-[#d9d0c4]"
                } rounded-md text-sm text-[#20382f] focus:outline-none focus:ring-2 focus:ring-[#52c92d]`}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone & Enquiry Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold uppercase tracking-wider text-[#20382f] mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Your phone number"
                className="w-full h-[48px] px-4 bg-white border border-[#d9d0c4] rounded-md text-sm text-[#20382f] focus:outline-none focus:ring-2 focus:ring-[#52c92d]"
              />
            </div>

            <div>
              <label
                htmlFor="enquiryType"
                className="block text-xs font-semibold uppercase tracking-wider text-[#20382f] mb-1.5"
              >
                Enquiry Type
              </label>
              <select
                id="enquiryType"
                value={formData.enquiryType}
                onChange={(e) =>
                  setFormData({ ...formData, enquiryType: e.target.value })
                }
                className="w-full h-[48px] px-4 bg-white border border-[#d9d0c4] rounded-md text-sm text-[#20382f] focus:outline-none focus:ring-2 focus:ring-[#52c92d]"
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="Room Information">Room Information</option>
                <option value="Amenities & Services">Amenities & Services</option>
                <option value="Accessibility Request">Accessibility Request</option>
                <option value="Local Recommendations">
                  Local Recommendations
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Arrival Date & Departure Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="arrivalDate"
                className="block text-xs font-semibold uppercase tracking-wider text-[#20382f] mb-1.5"
              >
                Arrival Date — Optional
              </label>
              <input
                id="arrivalDate"
                type="date"
                value={formData.arrivalDate}
                onChange={(e) =>
                  setFormData({ ...formData, arrivalDate: e.target.value })
                }
                className="w-full h-[48px] px-4 bg-white border border-[#d9d0c4] rounded-md text-sm text-[#20382f] focus:outline-none focus:ring-2 focus:ring-[#52c92d]"
              />
            </div>

            <div>
              <label
                htmlFor="departureDate"
                className="block text-xs font-semibold uppercase tracking-wider text-[#20382f] mb-1.5"
              >
                Departure Date — Optional
              </label>
              <input
                ref={departureDateRef}
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) =>
                  setFormData({ ...formData, departureDate: e.target.value })
                }
                aria-invalid={!!errors.dates}
                aria-describedby={errors.dates ? "dates-error" : undefined}
                className={`w-full h-[48px] px-4 bg-white border ${
                  errors.dates ? "border-red-500" : "border-[#d9d0c4]"
                } rounded-md text-sm text-[#20382f] focus:outline-none focus:ring-2 focus:ring-[#52c92d]`}
              />
              {errors.dates && (
                <p id="dates-error" className="text-xs text-red-600 mt-1">
                  {errors.dates}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-[#20382f] mb-1.5"
            >
              Message <span className="text-[#80563e]">*</span>
            </label>
            <textarea
              ref={messageRef}
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Tell us how we can help..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full min-h-[120px] p-4 bg-white border ${
                errors.message ? "border-red-500" : "border-[#d9d0c4]"
              } rounded-md text-sm text-[#20382f] focus:outline-none focus:ring-2 focus:ring-[#52c92d]`}
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-red-600 mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* Row 5: Privacy Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              ref={privacyRef}
              id="privacyAgreed"
              type="checkbox"
              checked={formData.privacyAgreed}
              onChange={(e) =>
                setFormData({ ...formData, privacyAgreed: e.target.checked })
              }
              className="w-4 h-4 text-[#80563e] border-[#d9d0c4] rounded focus:ring-[#52c92d]"
            />
            <label htmlFor="privacyAgreed" className="text-xs text-[#50544e]">
              I agree to the{" "}
              <Link href="/privacy-policy" className="underline hover:text-[#20382f]">
                privacy policy
              </Link>
              . <span className="text-[#80563e]">*</span>
            </label>
          </div>
          {errors.privacy && (
            <p className="text-xs text-red-600 mt-0.5">{errors.privacy}</p>
          )}

          {/* Row 6: Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-[50px] bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#80563e] inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  SENDING...
                </>
              ) : (
                <>SEND ENQUIRY &rarr;</>
              )}
            </button>
          </div>
        </form>
      </div>
    </Reveal>
  );
}
