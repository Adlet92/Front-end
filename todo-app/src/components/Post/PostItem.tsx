import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import activeCommentImage from "../../img/commentBlue.svg";
import editImage from "../../img/edit.svg";
import commentImage from "../../img/message-square.svg";
import favoriteImage from "../../img/star.svg";
import deleteImage from "../../img/trash-2.svg";
import { CommentProps, PostProps } from "../../types/types";
import "./Post.css";

interface PostItemProps {
  post: PostProps;
}

const PostItem = ({ post }: PostItemProps) => {
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${post.userId}`
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [post.userId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post.id]);

  const toggleCommentSection = () => {
    setCommentSectionOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="post-card">
        <div className="separate-post">
            <p><strong>Title:</strong> {post.title}</p>
            <p><strong>Username:</strong> {username}</p>
            <p>{post.body}</p>
            <div className="icons">
              <Link to={`/update/${post.id}`}><img src={editImage} alt="" /></Link>
              <img
                src={commentSectionOpen ? activeCommentImage : commentImage}
                alt=""
                onClick={toggleCommentSection}
              />
              <img src={favoriteImage} alt="" />
              <img src={deleteImage} alt="" />
            </div>
        </div>
        {commentSectionOpen && (
          <div className="comments">
            <h4>Comments:</h4>
            <ul>
              {comments.map((comment) => (
                <li key={comment.name}>
                  <p>{comment.name}</p>
                  <p>{comment.email}</p>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>

  );
}

export default PostItem;
