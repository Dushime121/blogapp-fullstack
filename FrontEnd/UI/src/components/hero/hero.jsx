import "./hero.scss";
import Button from "@mui/material/Button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
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
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

const Hero = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/signin");
  };

  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2>Make Your Own Content</motion.h2>
          <motion.h1>Blog at any time you want..</motion.h1>
          <motion.div className="buttons">
            <Button
              onClick={handleGetStarted}
              className="customButton"
              endIcon={<ArrowOutwardIcon />}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Engaging, Inspiring, Informative, Community
      </motion.div>

      <div className="imageContainer">
        <img src="/blogg.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;
