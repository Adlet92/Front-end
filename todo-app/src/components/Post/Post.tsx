import axios from "axios";
import { useEffect, useState } from "react";
import { PostProps } from "../../types/types";
import Pagination from "../Pagination/Pagination";
import "./Post.css";
import PostItem from "./PostItem";

const Post = () => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const url_posts = 'https://jsonplaceholder.typicode.com/posts/'
  useEffect(() => {
    axios.get(url_posts).then((response) => {
      setPosts(response.data);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    const storedPostsPerPage = localStorage.getItem('postsPerPage');
    if (storedPostsPerPage) {
      setPostsPerPage(parseInt(storedPostsPerPage));
    }
  }, []);

  const handlePostsPerPage = (perPage: number) => {
    setPostsPerPage(perPage);
    localStorage.setItem('postsPerPage', perPage.toString());
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

   return (
     <div className="posts-grid">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
           <>
            <div className="post-per-page">
              <p>Post per page:</p>
              <p className={`number-of-posts ${postsPerPage === 10 ? 'active' : ''}`} onClick={() => handlePostsPerPage(10)}>10</p>
              <p className={`number-of-posts ${postsPerPage === 20 ? 'active' : ''}`} onClick={() => handlePostsPerPage(20)}>20</p>
              <p className={`number-of-posts ${postsPerPage === 50 ? 'active' : ''}`} onClick={() => handlePostsPerPage(50)}>50</p>
              <p className={`number-of-posts ${postsPerPage === 100 ? 'active' : ''}`} onClick={() => handlePostsPerPage(100)}>100</p>
              <p className={`number-of-posts ${postsPerPage === posts.length ? 'active' : ''}`} onClick={() => handlePostsPerPage(posts.length)}>All</p>
            </div>
           <div className="grid-container">
             {currentPosts.map((post, index) => (
               <PostItem key={index} post={post} />
             ))}
           </div>
           <Pagination
             totalPosts={posts.length}
             postsPerPage={postsPerPage}
             setCurrentPage={setCurrentPage}
             currentPage={currentPage}
           />
         </>
       )}
    </div>
  );
}

export default Post
