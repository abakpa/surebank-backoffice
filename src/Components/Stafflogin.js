import React,{useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {loginRequest} from '../redux/slices/loginSlice'
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {error,loading} = useSelector((state)=>state.login)
    const [credentials,setCredentials] = useState({email:'',password:''})
    const [showPassword, setShowPassword] = useState(false)
    const sessionExpired = searchParams.get('sessionExpired') === '1'

    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data ={credentials,navigate}
        dispatch(loginRequest(data))
    }
    return(
        <div className="mt-20 flex items-center justify-center bg-gray-100 p-4 sm:p-0">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {sessionExpired && (
              <div className="rounded-lg bg-yellow-100 p-3 text-sm text-yellow-800">
                Your login session has expired. Please login again to continue.
              </div>
            )}

            {/* Email input */}
            <input
              type="email"
              name="email"
              placeholder="Email Number"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Password input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
                  <div className="text-right">
                            <Link 
                                to="/forgotpassword" 
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
  
            {/* Login Button */}
            {loading ? (
                        <button type="button" className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center" disabled>
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Loading"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="opacity-25"
                                />
                                <path
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    className="opacity-75"
                                />
                            </svg>
                            Processing...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                    )}
          </form>
        </div>
      </div>
       
    )
}

export default Login
