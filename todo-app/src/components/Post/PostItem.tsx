import { PostProps } from "../../types/types";
import "./Post.css";

interface PostItemProps {
  post: PostProps;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="separate-post">
      <p>{post.id}</p>
      <p>{post.userId}</p>
      <p>{post.title}</p>
    </div>
  );
}

export default PostItem;
