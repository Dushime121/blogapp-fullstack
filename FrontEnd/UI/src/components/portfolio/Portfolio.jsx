import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    id: 1,
    title: "The Future of Tech: How Computers Shape Our World",
    img: "/computer.webp",
    descr:
      "Computers have revolutionized every aspect of life, from business to entertainment. Discover the latest innovations, AI advancements, and how technology is shaping our future......",
  },
  {
    id: 2,
    title: "The Magic of Weddings: A Celebration of Love",
    img: "/wedding.webp",
    descr:
      "Weddings are a beautiful union of love and tradition. Explore unique wedding ideas, planning tips, and inspiring love stories that make every ceremony special......",
  },
  {
    id: 3,
    title: "A Taste of Culture: The Story of Nouilles",
    img: "nouilles.jpeg",
    descr:
      "Nouilles, or noodles, are a staple in cuisines around the world. Learn about their history, various cooking styles, and why they remain a favorite comfort food......",
  },
  {
    id: 4,
    title: "The Untamed Beauty of the Forest",
    img: "/forest.jpeg",
    descr:
      "Forests are nature’s sanctuary, home to diverse wildlife and breathtaking landscapes. Discover the wonders of the wild and why preserving our forests is essential......",
  },
  {
    id: 5,
    title: "Finding Inspiration in Everyday Moments",
    img: "/inspiration.jpeg",
    descr:
      "Life is full of inspiration, from simple interactions to extraordinary experiences. Learn how to embrace creativity and find meaning in the little things......",
  },
];

const Single = ({ item }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section ref={ref}>
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer">
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer">
            <h2>{item.title}</h2>
            <p>{item.descr}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Discover, Read, and Get Inspired!</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
