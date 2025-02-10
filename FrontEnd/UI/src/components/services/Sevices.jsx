import "./services.scss";
import { motion } from "framer-motion";

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

const Services = () => {
  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      //   animate="animate"
      whileInView="animate"
    >
      <motion.div className="textContainer">
        <p>
          Your words have the power to make
          <br /> a difference
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" alt="" />
          <h1>
            <motion.b whileHover={{ color: "green" }}>Engaging </motion.b>
            Stories
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "green" }}>One Post </motion.b>at a
            Time.
          </h1>
          <img src="/image.png" alt="" />
        </div>
      </motion.div>
      <div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgreen", color: "black" }}
        >
          <h2>Ideas That Spark Conversations.</h2>
          <p>
            A great blog isn’t just about writing—it’s about igniting
            discussions and inspiring new perspectives. Whether you’re sharing
            knowledge, opinions, or personal experiences, your words have the
            power to engage and bring people together through meaningful
            dialogue.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgreen", color: "black" }}
          variants={variants}
        >
          <h2>Your Thoughts, Your Voice, Your Blog..</h2>
          <p>
            Everyone has a unique voice, and your blog is the perfect place to
            express it. Whether you’re a writer, thinker, or creator, this
            platform gives you the freedom to share your thoughts and ideas in a
            way that resonates with your audience.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgreen", color: "black" }}
        >
          <h2>Where Creativity Meets Expression.</h2>
          <p>
            Blogging is more than just writing—it’s a creative journey where
            ideas turn into impactful content. From storytelling to thought
            leadership, this platform helps bring your creativity to life and
            share it with the world.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgreen", color: "black" }}
        >
          <h2>Inspiring Minds Through Words.</h2>
          <p>
            Words have the power to inform, motivate, and inspire. With every
            blog post, you contribute to a world of knowledge and creativity,
            helping others learn, grow, and discover new possibilities.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;
