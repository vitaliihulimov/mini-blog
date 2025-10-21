export default function Post({
    post,
    onDelete,
    onPostClick,
    onEdit,
    showDeleteButton = false,
    showEditButton = false
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

    const handlePostClick = () => {
        if (onPostClick) {
            onPostClick(post);
        }
    };

    // Функція для отримання першого речення
    const getFirstSentence = (text) => {
        if (!text) return '';

        // Спрощений алгоритм для знаходження першого речення
        // Шукаємо першу крапку, знак оклику або знак питання
        const sentenceEnders = /[.!?]/;
        const match = text.match(sentenceEnders);

        if (match) {
            const endIndex = match.index + 1;
            return text.substring(0, endIndex).trim();
        }

        // Якщо немає закінчення речення, беремо перші 120 символів
        return text.length > 120 ? text.substring(0, 120) + '...' : text;
    };

    // Функція для відображення preview тексту
    const renderPreviewText = (text) => {
        if (!text) return '';

        const firstSentence = getFirstSentence(text);
        const hasMoreContent = text.length > firstSentence.length;

        return (
            <>
                {firstSentence}
                {hasMoreContent && <span className="read-more">Read more</span>}
            </>
        );
    };

    return (
        <div
            className={`post-card ${onPostClick ? 'clickable' : ''}`}
            onClick={handlePostClick}
        >
            <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-actions">
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