export default function Post({
    post,
    onDelete,
    onPostClick,
    onEdit,
    onToggleFavourite,
    showDeleteButton = false,
    showEditButton = false,
    showFavouriteButton = false,
    isNew = false
}) {
    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete(post.id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(post);
        }
    };

    const handleFavourite = (e) => {
        e.stopPropagation();
        if (onToggleFavourite) {
            onToggleFavourite(post.id);
        }
    };

    const handlePostClick = () => {
        if (onPostClick) {
            onPostClick(post);
        }
    };

    // Функція для отримання першого речення
    const getFirstSentence = (text) => {
        if (!text) return '';

        const sentenceEnders = /[.!?]/;
        const match = text.match(sentenceEnders);

        if (match) {
            const endIndex = match.index + 1;
            return text.substring(0, endIndex).trim();
        }

        return text.length > 120 ? text.substring(0, 120) + '...' : text;
    };

    // Функція для відображення preview тексту
    const renderPreviewText = (text) => {
        if (!text) return '';

        const firstSentence = getFirstSentence(text);
        const hasMoreContent = text.length > firstSentence.length;

        return (
            <div className="post-body-content">
                {firstSentence}
                {hasMoreContent && <span className="read-more">Read more</span>}
            </div>
        );
    };

    return (
        <div
            className={`post-card ${onPostClick ? 'clickable' : ''} ${isNew ? 'new-post' : ''}`}
            onClick={handlePostClick}
        >
            {/* Індикатор нового поста */}
            {isNew && <div className="new-badge">🆕 New</div>}

            <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-actions">
                    {showFavouriteButton && onToggleFavourite && (
                        <button
                            onClick={handleFavourite}
                            className={`favourite-btn ${post.isFavourite ? 'favourited' : ''}`}
                            aria-label={post.isFavourite ? "Remove from favourites" : "Add to favourites"}
                            title={post.isFavourite ? "Remove from favourites" : "Add to favourites"}
                        >
                            {post.isFavourite ? '❤️' : '🤍'}
                        </button>
                    )}
                    {showEditButton && onEdit && (
                        <button
                            onClick={handleEdit}
                            className="edit-btn"
                            aria-label="Edit post"
                            title="Edit post"
                        >
                            ✏️
                        </button>
                    )}
                    {showDeleteButton && onDelete && (
                        <button
                            onClick={handleDelete}
                            className="delete-btn"
                            aria-label="Delete post"
                            title="Delete post"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            {post.image && (
                <div className="post-image">
                    <img src={post.image} alt={post.title} />
                </div>
            )}

            <div className="post-body">
                {renderPreviewText(post.body)}
            </div>
        </div>
    );
}