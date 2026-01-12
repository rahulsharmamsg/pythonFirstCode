import { useForm } from "react-hook-form"
import { LoginFormData } from "../common/types/register"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import redirectUrl from "../common/RedirectUrl"
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()
    const navigate = useNavigate()
    
    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await axios.post(API_URL+"/login", data)
            if (res.status == 200 || res.status == 201) {
                console.log(res.data)
                localStorage.setItem("token", res.data.accesstoken)
                localStorage.setItem("refreshToken",res.data.refreshtoken)
                localStorage.setItem("userName", res.data.user)
                const decoded = jwtDecode(res.data.accesstoken)
                redirectUrl(decoded as any, navigate)
                toast.success("Login successful");
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.detail || "Invalid Crediential")
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    }
    return (<>
        <div className="min-h-screen flex items-center justify-center from-indigo-500 to-purple-600">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email ID
                        </label>
                        <input
                            {...register("userName", {
                                required: "Email is required",
                            })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.userName && (
                            <p className="text-red-500 text-sm">
                                {errors.userName.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Don’t have an account?
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    </>)
}
export default Login