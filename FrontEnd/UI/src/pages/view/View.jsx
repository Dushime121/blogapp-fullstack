import { useEffect, useState } from "react";
import { Typography, Divider, message, Card } from "antd";
import { getPostById } from "../../services/postService";
import { useParams } from "react-router-dom";
import "../create/create.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ViewPost = () => {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const [post, setPost] = useState(null); // State to store the post data
  const navigate = useNavigate();

  // Fetch the post details on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id); // Fetch the post data from the API
        setPost(data); // Set the post data to the state
      } catch (error) {
        message.error("Failed to load post");
      }
    };
    fetchPost();
  }, [id]); // Dependency array ensures it fetches the post data when the id changes

  // If post data is still loading
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="content">
      <header>
        <h1>{post.title}</h1>
      </header>

      <div className="content-body">
        {/* <Text style={{ color: "white" }}>{post.content}</Text> */}
        <Card
          style={{
            width: "100%",
            marginBottom: "6px",
            height: "100%",
            justifyContent: "center",
            fontSize: "19px",
          }} // Full width and margin for spacing
        >
          {post.content}
        </Card>
      </div>

      <Divider
        variant="dashed"
        style={{ borderColor: "#7cb305", fontSize: "24px", color: "#7cb305" }}
      >
        End of Post
      </Divider>
      <div className="backIcon">
        <ArrowBackIcon
          type="primary"
          onClick={() => navigate(-1)} // Navigate back to the previous page
          style={{ marginBottom: "20px" }}
        />
      </div>
    </div>
  );
};

export default ViewPost;
