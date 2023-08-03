export interface PostProps {
  id: number;
  userId: number;
  title: string;
}
export interface PhotoProps {
  id: number;
  title: string;
  url: string;
}

export interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

