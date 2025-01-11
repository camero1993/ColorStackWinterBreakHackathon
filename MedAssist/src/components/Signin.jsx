import { useState } from "react";
import { signInUser} from "../firebase/auth.js";
import { useNavigate } from "react-router-dom";

export default function Signin () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (!email || !password) {
            setError(1);
            setIsLoading(false);
            return;
        }
        
        const user = await signInUser(email, password);
        if (user) {
            navigate("/medassist");
        } else {
            setError(2);
        }
        setIsLoading(false);
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center p-4">
            {/* Background Image with Blur Effect */}
            <div className="absolute inset-0 bg-[url('assets/signup_no_background.png')] bg-contain bg-no-repeat opacity-20"></div>
            
            {/* Main Card */}
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md z-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
                    Welcome Back
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Error Messages */}
                    {error === 1 && (
                        <p className="text-red-500 text-sm animate-fade-in">
                            Please fill in all fields
                        </p>
                    )}
                    {error === 2 && (
                        <p className="text-red-500 text-sm animate-fade-in">
                            Invalid email or password
                        </p>
                    )}

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:hover:transform-none"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    {/* Links */}
                    <div className="space-y-4">
                        <p className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <p
                                onClick={() => navigate('/signup')}
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                Sign up
                            </p>
                        </p>
                        <a 
                            href="#" 
                            className="block text-center text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}