import Post from '../components/Post';

export default function Posts({ posts, onDelete, onClear, onPostClick, onEdit }) {
    return (
        <div>
            <div className="posts-header">
                <h2>All Posts ({posts.length})</h2>

                {posts.length > 0 && (
                    <button onClick={onClear} className="clear-btn">
                        Clear All Posts
                    </button>
                )}
            </div>

            {posts.length === 0 ? (
                <p className="no-posts">No posts yet. Add your first post!</p>
            ) : (
                <div className="posts-grid">
                    {posts.map((p) => (
                        <Post
                            key={p.id}
                            post={p}
                            onDelete={onDelete}
                            onPostClick={onPostClick}
                            onEdit={onEdit} // Передаємо onEdit проп
                            showDeleteButton={true}
                            showEditButton={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}