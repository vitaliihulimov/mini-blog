import { useState, useMemo } from 'react';
import Post from '../components/Post';

export default function Favourites({ posts, onDelete, onPostClick, onEdit, onToggleFavourite }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Розрахунок даних для пагінації
    const { currentPosts, totalPages } = useMemo(() => {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        return { currentPosts, totalPages };
    }, [posts, currentPage, postsPerPage]);

    // Функції для пагінації
    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
    };

    // Генерація номерів сторінок для відображення
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div>
            <div className="favourites-header">
                <h2>❤️ Favourite Posts ({posts.length})</h2>

                {posts.length === 0 && (
                    <div className="no-favourites">
                        <p>No favourite posts yet.</p>
                        <p>Click the heart icon on any post to add it to favourites!</p>
                    </div>
                )}
            </div>

            {posts.length > 0 && (
                <>
                    {/* Інформація про поточну сторінку */}
                    <div className="pagination-info">
                        Showing {currentPosts.length} of {posts.length} favourite posts
                        {totalPages > 1 && (
                            <span className="page-info"> - Page {currentPage} of {totalPages}</span>
                        )}
                    </div>

                    {/* Сітка з постами */}
                    <div className="posts-grid">
                        {currentPosts.map((p) => (
                            <Post
                                key={p.id}
                                post={p}
                                onDelete={onDelete}
                                onPostClick={onPostClick}
                                onEdit={onEdit}
                                onToggleFavourite={onToggleFavourite}
                                showDeleteButton={true}
                                showEditButton={true}
                                showFavouriteButton={true}
                            />
                        ))}
                    </div>

                    {/* Пагінація */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                                className="pagination-btn pagination-prev"
                            >
                                ← Previous
                            </button>

                            <div className="pagination-numbers">
                                {getPageNumbers().map(page => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="pagination-btn pagination-next"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}