import { useEffect, useState } from "react";
import { Typography, Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postService";
import "../create/create.scss";

const { Text } = Typography;
const { TextArea } = Input;

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        message.error("Failed to fetch post details");
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updatePost(id, { title, content });
      message.success("Post updated successfully!");
      navigate("/create");
    } catch (error) {
      message.error("Failed to update post");
    }
  };

  return (
    <div className="content">
      <header>
        <h1>Edit Post</h1>
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
          <Button type="primary" onClick={handleUpdate}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
