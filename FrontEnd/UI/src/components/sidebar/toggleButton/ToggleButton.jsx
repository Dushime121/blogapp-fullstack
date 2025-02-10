import "../sidebar.scss";
import { motion } from "framer-motion";
const ToggleButton = ({ setOpen }) => {
  return (
    <button onClick={() => setOpen((prev) => !prev)}>
      <svg>
        <motion.path
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 2.5 L 30 2.5" },
            open: { d: "M 3 19.5 L 19 2.5" },
          }}
        />
        <motion.path
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          d="M 2 9.423 L 29 9.423"
          variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
        />
        <motion.path
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 16.346 L 30 16.346" },
            open: { d: "M 3 2.5 L 19 19.346" },
          }}
        />
      </svg>
    </button>
  );
};
export default ToggleButton;
