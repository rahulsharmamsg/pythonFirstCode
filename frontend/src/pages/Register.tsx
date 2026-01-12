import { RegisterFormData, registerSchema } from "../common/types/register"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })
    const navigate = useNavigate()
    const onSubmit = async (data: RegisterFormData) => {
        try {
            const res = await axios.post(API_URL+'/register', data)
            if (res.status === 200 || res.status === 201) {
                toast.success("Registration successful");
                navigate('/login')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.detail || "Registration failed")
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    };
    return (<>
        <div className="min-h-screen flex items-center justify-center from-indigo-500 to-purple-600">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">User Name</label>
                        <input
                            {...register("userName")}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email ID</label>
                        <input
                            {...register("emailId")}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                        <input
                            {...register("phoneNumber")}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                        <select
                            {...register("gender")}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Already have an account?
                    <span className="text-indigo-600 font-medium cursor-pointer hover:underline"> Login</span>
                </p>
            </div>
        </div>

    </>)
}
export default Register