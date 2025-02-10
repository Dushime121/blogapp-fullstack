import "./signin.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/authService";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};
const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "10%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 5,
    },
  },
};
const SignIn = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/");
  };
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log("User logged in:", response);
      navigate("/create");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrors({ server: "Invalid credentials. Please try again." });
    }
  };

  return (
    <motion.div
      className="wrapper1"
      variants={variants}
      initial="initial"
      whileInView="animate"
    >
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Inspiring
      </motion.div>
      <motion.div className="wrapper" variants={variants}>
        <motion.div className="form-box login" variants={variants}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <motion.div className="input-box" variants={variants}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </motion.div>
            <motion.div className="input-box" variants={variants}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <FaLock className="icon" />
            </motion.div>
            {errors.server && <p className="error">{errors.server}</p>}
            <button type="submit">Sign In</button>
            <motion.div className="register-link" variants={variants}>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
              <div className="homeIcon">
                <HomeIcon onClick={handleGetStarted} />
              </div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export default SignIn;
