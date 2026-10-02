import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Mail, Phone, Loader2, Check, AlertCircle, Eye, EyeOff, ArrowLeft, Lock } from "lucide-react";

type Mode = "login" | "signup";
type LoginStep = "credentials" | "otp-choice" | "otp" | "success";
type SignupStep = "name-email" | "password" | "otp" | "success";
type Channel = "email" | "phone" | null;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const [mode, setMode] = useState<Mode>("login");

  // Login state (OTP-based only)
  const [loginStep, setLoginStep] = useState<LoginStep>("otp-choice");
  const [loginEmail, setLoginEmail] = useState("");
  const [otpChannel, setOtpChannel] = useState<Channel>(null);

  // Signup state
  const [signupStep, setSignupStep] = useState<SignupStep>("name-email");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // OTP state
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [expiresIn, setExpiresIn] = useState(0);
  const [resendIn, setResendIn] = useState(0);

  // Common state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));
  const isStrongPassword = (pwd: string) => pwd.length >= 8;

  // LOGIN HANDLERS
  const handleLoginEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(loginEmail)) {
      setError("Please enter a valid email");
      return;
    }
    setLoginStep("otp-choice");
    setError("");
  };

  const handleSendOTP = async () => {
    if (!otpChannel) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3003/api/auth/send-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ channel: otpChannel, identifier: loginEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setExpiresIn(data.expiresIn);
      setResendIn(data.resendIn);
      setLoginStep("otp");

      let countdown = data.expiresIn;
      const interval = setInterval(() => {
        countdown--;
        setExpiresIn(countdown);
        if (countdown <= 0) clearInterval(interval);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyLoginOTP = async () => {
    if (!otp || !otpChannel) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3003/api/auth/verify-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ channel: otpChannel, identifier: loginEmail, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");

      login(data.token, data.user);
      setLoginStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // SIGNUP HANDLERS
  const handleSignupNameEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!isValidEmail(signupEmail)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setSignupStep("password");
  };

  const handleSignupPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStrongPassword(signupPassword)) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      setError("Please agree to terms & conditions");
      return;
    }
    setError("");
    handleSendSignupOTP();
  };

  const handleSendSignupOTP = async () => {
    setIsLoading(true);
    setError("");
    setOtpChannel("email");

    try {
      // Register user first
      const registerRes = await fetch("http://localhost:3003/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: signupName, email: signupEmail }),
      });

      if (!registerRes.ok) {
        const data = await registerRes.json();
        throw new Error(data.error || "Failed to register");
      }

      // Then send OTP
      const res = await fetch("http://localhost:3003/api/auth/send-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ channel: "email", identifier: signupEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setExpiresIn(data.expiresIn);
      setResendIn(data.resendIn);
      setSignupStep("otp");

      let countdown = data.expiresIn;
      const interval = setInterval(() => {
        countdown--;
        setExpiresIn(countdown);
        if (countdown <= 0) clearInterval(interval);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySignupOTP = async () => {
    if (!otp) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3003/api/auth/verify-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ channel: "email", identifier: signupEmail, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");

      login(data.token, data.user);
      setSignupStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendIn(0);
    if (mode === "login") {
      await handleSendOTP();
    } else {
      await handleSendSignupOTP();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0b3d5c] to-[#0a2d45] p-12 text-white">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-[#1fa98f] rounded-lg flex items-center justify-center">
                <Lock size={24} />
              </div>
              <span className="text-2xl font-bold">PARIYANI OCEANS</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              {mode === "login" ? "Welcome Back" : "Join Us Today"}
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              {mode === "login"
                ? "Sign in to PARIYANI OCEANS and access your orders"
                : "Create an account at PARIYANI OCEANS - Premium Wholesale Supplier"}
            </p>
            <div className="space-y-4">
              {[
                { icon: "✓", text: "Premium quality meat, fish & seafood" },
                { icon: "✓", text: "FSSAI certified & hygienically processed" },
                { icon: "✓", text: "Fast delivery across Mumbai" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[#1fa98f] text-xl font-bold">{item.icon}</span>
                  <span className="text-blue-100">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-blue-200">
            © 2024 PARIYANI OCEANS PRIVATE LIMITED | GST: 27AARCP2277N1ZK
          </p>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-8 bg-[#f0f3f1] p-1 rounded-lg">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setLoginStep("otp-choice");
                    setSignupStep("name-email");
                    setError("");
                    setLoginEmail("");
                    setOtpChannel(null);
                    setSignupName("");
                    setSignupEmail("");
                    setSignupPassword("");
                    setSignupConfirmPassword("");
                    setOtp("");
                  }}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition cursor-pointer ${
                    mode === m
                      ? "bg-white text-[#0b3d5c] shadow-sm"
                      : "text-[#587371] hover:text-[#0b3d5c] hover:bg-gray-50"
                  }`}
                >
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* LOGIN FLOW - OTP BASED */}
            {mode === "login" && (
              <>
                {/* Login - Email Input */}
                {loginStep === "otp-choice" && (
                  <form onSubmit={handleLoginEmailSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0b3d5c]">Sign In</h2>
                      <p className="text-[#587371] mt-2">Enter your email to receive OTP</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0b3d5c] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          autoFocus
                          className="w-full px-4 py-3 border-2 border-[#d9e3df] rounded-lg focus:outline-none focus:border-[#1fa98f] focus:ring-2 focus:ring-[#1fa98f]/10 transition text-[#0b3d5c]"
                        />
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || !isValidEmail(loginEmail)}
                        className="w-full py-3 bg-[#1fa98f] text-white rounded-lg font-semibold hover:bg-[#168575] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#c0d9d4] transition"
                      >
                        {isLoading ? "Processing..." : "Continue"}
                      </button>
                    </div>
                  </form>
                )}


                {/* Login - OTP Channel Choice */}
                {loginStep === "otp-choice" && (
                  <div className="space-y-6">
                    <button
                      onClick={() => {
                        setLoginStep("credentials");
                        setError("");
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#1fa98f]"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-[#0b3d5c]">Choose verification method</h2>
                      <p className="text-[#587371] mt-2">How would you like to receive your OTP?</p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setOtpChannel("email");
                          handleSendOTP();
                        }}
                        disabled={isLoading}
                        className="w-full flex items-center gap-4 p-4 border-2 border-[#d9e3df] rounded-lg hover:border-[#1fa98f] hover:bg-[#f8f7f4] transition disabled:opacity-50"
                      >
                        <Mail className="w-6 h-6 text-[#1fa98f]" />
                        <div className="text-left flex-1">
                          <p className="font-semibold text-[#0b3d5c]">Email</p>
                          <p className="text-sm text-[#7c9695]">{loginEmail}</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setOtpChannel("phone");
                          handleSendOTP();
                        }}
                        disabled={isLoading}
                        className="w-full flex items-center gap-4 p-4 border-2 border-[#d9e3df] rounded-lg hover:border-[#ff6b4a] hover:bg-[#f8f7f4] transition disabled:opacity-50"
                      >
                        <Phone className="w-6 h-6 text-[#ff6b4a]" />
                        <div className="text-left flex-1">
                          <p className="font-semibold text-[#0b3d5c]">Mobile SMS</p>
                          <p className="text-sm text-[#7c9695]">Verify via SMS</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Login - OTP Verification */}
                {loginStep === "otp" && (
                  <div className="space-y-6">
                    <button
                      onClick={() => {
                        setLoginStep("otp-choice");
                        setError("");
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#1fa98f]"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-[#0b3d5c]">Enter verification code</h2>
                      <p className="text-[#587371] mt-2">
                        We sent a code to your {otpChannel === "email" ? "email" : "phone"}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0b3d5c] mb-3">
                          6-digit code
                        </label>
                        <div className="relative">
                          <input
                            type={showOtp ? "text" : "password"}
                            placeholder="0 0 0 0 0 0"
                            value={otp}
                            onChange={(e) =>
                              setOtp(
                                e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 6)
                              )
                            }
                            maxLength={6}
                            className="w-full px-4 py-4 text-center text-4xl tracking-[0.5em] font-bold border-2 border-[#d9e3df] rounded-lg focus:outline-none focus:border-[#1fa98f] focus:ring-2 focus:ring-[#1fa98f]/10 transition text-[#0b3d5c] font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOtp(!showOtp)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7c9695]"
                          >
                            {showOtp ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#f0f3f1] rounded-lg">
                        <span className="text-sm font-medium text-[#587371]">Expires in</span>
                        <span className={`font-mono font-bold text-lg ${expiresIn < 60 ? "text-red-600" : "text-[#1fa98f]"}`}>
                          {Math.floor(expiresIn / 60)}:{String(expiresIn % 60).padStart(2, "0")}
                        </span>
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      <button
                        onClick={handleVerifyLoginOTP}
                        disabled={isLoading || otp.length !== 6}
                        className="w-full py-3 bg-[#1fa98f] text-white rounded-lg font-semibold hover:bg-[#168575] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#c0d9d4] transition"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          "Verify & Sign In"
                        )}
                      </button>

                      <button
                        onClick={handleResendOTP}
                        disabled={resendIn > 0 || isLoading}
                        className="w-full py-2 text-[#1fa98f] hover:text-[#168575] disabled:text-[#c0d9d4] text-sm font-medium transition"
                      >
                        {resendIn > 0 ? `Resend code in ${resendIn}s` : "Didn't receive a code? Resend"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Login - Success */}
                {loginStep === "success" && (
                  <div className="text-center space-y-8">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-10 h-10 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[#0b3d5c]">Welcome Back!</h2>
                      <p className="mt-3 text-[#587371]">You've been successfully signed in</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* SIGNUP FLOW */}
            {mode === "signup" && (
              <>
                {/* Signup - Name & Email */}
                {signupStep === "name-email" && (
                  <form onSubmit={handleSignupNameEmail} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0b3d5c]">Create Account</h2>
                      <p className="text-[#587371] mt-2">Enter your details to get started</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0b3d5c] mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-[#d9e3df] rounded-lg focus:outline-none focus:border-[#1fa98f] focus:ring-2 focus:ring-[#1fa98f]/10 transition text-[#0b3d5c]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0b3d5c] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-[#d9e3df] rounded-lg focus:outline-none focus:border-[#1fa98f] focus:ring-2 focus:ring-[#1fa98f]/10 transition text-[#0b3d5c]"
                        />
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || !signupName.trim() || !isValidEmail(signupEmail)}
                        className="w-full py-3 bg-[#1fa98f] text-white rounded-lg font-semibold hover:bg-[#168575] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#c0d9d4] transition"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          "Continue"
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Signup - Password */}
                {signupStep === "password" && (
                  <form onSubmit={handleSignupPassword} className="space-y-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSignupStep("name-email");
                        setError("");
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#1fa98f]"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-[#0b3d5c]">Set Your Password</h2>
                      <p className="text-[#587371] mt-2">Create a strong password for your account</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0b3d5c] mb-2">
                          Password (min. 8 characters)
                        </label>
                        <div className="relative">
                          <input
                            type={showSignupPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-[#d9e3df] rounded-lg focus:outline-none focus:border-[#1fa98f] focus:ring-2 focus:ring-[#1fa98f]/10 transition text-[#0b3d5c]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7c9695]"
                          >
                            {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className={`mt-2 text-xs ${isStrongPassword(signupPassword) ? "text-green-600" : "text-[#7c9695]"}`}>
                          {isStrongPassword(signupPassword) ? "✓ Strong password" : "At least 8 characters"}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0b3d5c] mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-[#d9e3df] rounded-lg focus:outline-none focus:border-[#1fa98f] focus:ring-2 focus:ring-[#1fa98f]/10 transition text-[#0b3d5c]"
                        />
                        {signupConfirmPassword && (
                          <p className={`mt-2 text-xs ${signupPassword === signupConfirmPassword ? "text-green-600" : "text-red-600"}`}>
                            {signupPassword === signupConfirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                          </p>
                        )}
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span className="text-sm text-[#587371]">
                          I agree to the <span className="text-[#1fa98f] font-semibold">Terms & Conditions</span>
                        </span>
                      </label>

                      {error && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || !isStrongPassword(signupPassword) || signupPassword !== signupConfirmPassword || !agreeTerms}
                        className="w-full py-3 bg-[#1fa98f] text-white rounded-lg font-semibold hover:bg-[#168575] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#c0d9d4] transition"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            Creating Account...
                          </span>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Signup - OTP Verification */}
                {signupStep === "otp" && (
                  <div className="space-y-6">
                    <button
                      onClick={() => {
                        setSignupStep("password");
                        setError("");
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#1fa98f]"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-[#0b3d5c]">Verify Your Email</h2>
                      <p className="text-[#587371] mt-2">
                        We sent a verification code to <span className="font-semibold">{signupEmail}</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0b3d5c] mb-3">
                          6-digit code
                        </label>
                        <div className="relative">
                          <input
                            type={showOtp ? "text" : "password"}
                            placeholder="0 0 0 0 0 0"
                            value={otp}
                            onChange={(e) =>
                              setOtp(
                                e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 6)
                              )
                            }
                            maxLength={6}
                            className="w-full px-4 py-4 text-center text-4xl tracking-[0.5em] font-bold border-2 border-[#d9e3df] rounded-lg focus:outline-none focus:border-[#1fa98f] focus:ring-2 focus:ring-[#1fa98f]/10 transition text-[#0b3d5c] font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOtp(!showOtp)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7c9695]"
                          >
                            {showOtp ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#f0f3f1] rounded-lg">
                        <span className="text-sm font-medium text-[#587371]">Expires in</span>
                        <span className={`font-mono font-bold text-lg ${expiresIn < 60 ? "text-red-600" : "text-[#1fa98f]"}`}>
                          {Math.floor(expiresIn / 60)}:{String(expiresIn % 60).padStart(2, "0")}
                        </span>
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      <button
                        onClick={handleVerifySignupOTP}
                        disabled={isLoading || otp.length !== 6}
                        className="w-full py-3 bg-[#1fa98f] text-white rounded-lg font-semibold hover:bg-[#168575] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#c0d9d4] transition"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            Creating Account...
                          </span>
                        ) : (
                          "Complete Sign Up"
                        )}
                      </button>

                      <button
                        onClick={handleResendOTP}
                        disabled={resendIn > 0 || isLoading}
                        className="w-full py-2 text-[#1fa98f] hover:text-[#168575] disabled:text-[#c0d9d4] text-sm font-medium transition"
                      >
                        {resendIn > 0 ? `Resend code in ${resendIn}s` : "Didn't receive a code? Resend"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Signup - Success */}
                {signupStep === "success" && (
                  <div className="text-center space-y-8">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-10 h-10 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[#0b3d5c]">Account Created!</h2>
                      <p className="mt-3 text-[#587371]">Welcome {signupName}! Your account is ready to use</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
