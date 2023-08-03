import { PaginationProps } from "../../types/types";
import "./Pagination.css";

const Pagination: React.FC<PaginationProps> = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? "page active" : "page"}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
