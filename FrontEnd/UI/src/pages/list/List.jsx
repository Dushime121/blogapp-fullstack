import { useEffect, useState } from "react";
import { Card, Divider, message } from "antd"; // Import Divider
import { getAllPosts, deletePost } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        message.error("Failed to load posts");
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      message.success("Post deleted successfully");
    } catch (error) {
      message.error("Failed to delete post");
    }
  };

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post, index) => (
          <div key={post.id}>
            <Card
              style={{ width: "950px", marginBottom: "16px", height: "200px" }} // Full width and margin for spacing
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <VisibilityIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/post/${post.id}`)}
                  />
                  <EditNoteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/edit/${post.id}`)}
                  />
                  <DeleteSweepIcon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(post.id)}
                  />
                </div>
              </div>
            </Card>
            {/* Add a Divider between posts, except after the last one */}
            {index < posts.length - 1 && (
              <Divider
                variant="dashed"
                style={{
                  borderColor: "#7cb305",
                  fontSize: "24px",
                  color: "#7cb305",
                }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
