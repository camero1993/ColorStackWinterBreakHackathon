import { useState } from "react";
import { createUser } from "../firebase/auth.js";
import {useNavigate} from "react-router-dom";


export default function Signup () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 1 is email or password is null
        if (!email || !password) {
            setError(1)
        };
        const user = await createUser(email, password);
        if (user) {
            navigate("/");
        } else {
            setError(2)
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('assets/signup_no_background.png')] bg-contain bg-no-repeat opacity-20"></div>
            
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md z-20 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
                    Create Account
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error === 1 && (
                        <p className="text-red-500 text-sm">Please fill in all fields</p>
                    )}
                    
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Already have an account? 
                    <a href="/signin" className="text-blue-600 hover:text-blue-700 ml-1 font-medium">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}