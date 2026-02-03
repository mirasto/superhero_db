import ReactPaginate from 'react-paginate';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import PaginationInfo from './PaginationInfo/PaginationInfo';
import styles from './Pagination.module.css';

const Pagination = ({ pagination, onPageChange }) => {
    const { page, totalPages, total } = pagination;

    if (totalPages <= 1) return null;

    const handlePageClick = (event) => {
        onPageChange(event.selected + 1);
    };

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            <PaginationInfo
                page={page}
                totalPages={totalPages}
                total={total}
            />

            <ReactPaginate
                breakLabel="..."
                nextLabel={<FaAngleRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={totalPages}
                previousLabel={<FaAngleLeft />}
                renderOnZeroPageCount={null}
                forcePage={page - 1}
                containerClassName={styles.paginationControls}
                pageClassName={styles.pageItem}
                pageLinkClassName={styles.pageLink}
                previousClassName={styles.pageItem}
                previousLinkClassName={styles.pageLink}
                nextClassName={styles.pageItem}
                nextLinkClassName={styles.pageLink}
                breakClassName={styles.pageItem}
                breakLinkClassName={styles.pageLink}
                activeClassName={styles.active}
                disabledClassName={styles.disabled}
            />
        </nav>
    );
};

export default Pagination;
