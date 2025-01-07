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
        <div className="relative flex items-center justify-center min-h-screen bg-[rgb(128,178,214)] overflow-x-hidden">
            <div className=" bg-[url('assets/signup_no_background.png')] bg-contain bg-no-repeat w-screen h-screen absolute left-5 pointer-events-none z-10"></div>
            <div className="bg-white p-8 rounded shadow-lg w-80 z-20">
                <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
                    Create New Account
                </h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-sm text-center w-full">
                    Already Have an Account? <a href="/signin">Sign in</a>
                </p>
            </div>
        </div>
    );
}