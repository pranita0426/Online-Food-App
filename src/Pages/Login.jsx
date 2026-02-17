
import { useState } from "react";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  // common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup-only fields
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  // forgot password
  const [forgotEmail, setForgotEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // Basic validation
      if (!username || !fullName || !address || !contact || !email || !password) {
        alert("Please fill all signup fields.");
        return;
      }
      // Here you'd send signup request to backend
      alert(`Signup submitted for ${username} (${email})`);
      // clear fields or switch to login
      setIsSignup(false);
      setUsername("");
      setFullName("");
      setAddress("");
      setContact("");
      setEmail("");
      setPassword("");
    } else {
      if (!email || !password) {
        alert("Please provide email and password to login.");
        return;
      }
      // Here you'd send login request to backend
      alert(`Login submitted for ${email}`);
      setEmail("");
      setPassword("");
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      alert("Please enter your email to reset password.");
      return;
    }
    // Simulate sending reset link
    alert(`If ${forgotEmail} is registered, a reset link has been sent.`);
    setForgotEmail("");
    setForgotOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="tel"
                placeholder="Contact No"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            {!isSignup && (
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 ml-1 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

        {/* Forgot password modal/panel */}
        {forgotOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-30" onClick={() => setForgotOpen(false)}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
              <p className="text-sm text-gray-600 mb-4">Enter your account email to receive a password reset link.</p>
              <form onSubmit={handleForgot} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setForgotOpen(false)} className="px-3 py-2 rounded border">
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">
                    Send Reset Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
