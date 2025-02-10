import "./signin.scss";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import { register } from "../../services/authService";

const variants = {
  initial: { x: -500, y: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: { duration: 1, staggerChildren: 0.1 },
  },
};

const sliderVariants = {
  initial: { x: 0 },
  animate: {
    x: "10%",
    transition: { repeat: Infinity, repeatType: "mirror", duration: 5 },
  },
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setError("Username must be one word (no spaces or special characters)");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateInput()) return;

    try {
      const response = await register(formData);
      console.log("Registration Successful:", response);
      navigate("/create", {
        state: { message: "Congratulations! Your account has been created." },
      });
    } catch (error) {
      console.error("Error registering:", error);
      setError("Registration failed. Try again.");
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
        Engaged
      </motion.div>

      <motion.div className="wrapper" variants={variants}>
        <motion.div className="form-box register" variants={variants}>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            {error && <p className="error-message">{error}</p>}

            <motion.div className="input-box" variants={variants}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
              />
              <FaUser className="icon" />
            </motion.div>

            <motion.div className="input-box" variants={variants}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <FaLock className="icon" />
            </motion.div>

            <button type="submit">Sign Up</button>

            <motion.div className="register-link" variants={variants}>
              <p>
                Already have an account? <Link to="/signin">Sign In</Link>
              </p>
              <div className="homeIcon">
                <HomeIcon onClick={() => navigate("/")} />
              </div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
