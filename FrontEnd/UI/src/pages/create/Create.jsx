import { useState } from "react";
import { Typography, Input, Button, message, Divider } from "antd";
import { createPost } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import "./create.scss";
import List from "../list/List";

const { Text } = Typography;
const { TextArea } = Input;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // const handleCreate = async () => {
  //   if (!title || !content) {
  //     message.error("Title and Content are required");
  //     return;
  //   }

  //   try {
  //     await createPost({ title, content });
  //     message.success("Post created successfully!");
  //   } catch (error) {
  //     message.error("Failed to create post");
  //     console.error(error);
  //   }
  // };
  const handleCreate = async () => {
    if (!title || !content) {
      message.error("Title and Content are required");
      return;
    }

    const userId = localStorage.getItem("user_id"); // Get userId from localStorage
    if (!userId) {
      message.error("You must be logged in to create a post");
      return;
    }

    try {
      await createPost({ title, content, userId }); // Include userId
      message.success("Post created successfully!");
      navigate("/create"); // Redirect after successful post creation
    } catch (error) {
      message.error("Failed to create post");
      console.error(error);
    }
  };

  return (
    <div className="content">
      <header>
        <h1>Welcome to ByteBlog❤</h1>
      </header>

      <div className="content-form">
        <form>
          <Text strong>Title</Text>
          <TextArea
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
          <Text strong>Content</Text>
          <TextArea
            placeholder="Write your post content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
          <Button type="primary" onClick={handleCreate}>
            Create
          </Button>
        </form>
      </div>
      <Divider
        variant="dashed"
        style={{ borderColor: "#7cb305", fontSize: "24px", color: "#7cb305" }}
      >
        Blogs
      </Divider>

      <List />
    </div>
  );
};

export default CreatePost;
