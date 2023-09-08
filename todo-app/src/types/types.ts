export interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export interface PhotoProps {
  id: number;
  title: string;
  url: string;
}
export interface CommentProps {
  name: string;
  email: string;
  body: string;
}
export interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

