import Post from '../components/Post';

export default function Posts({ posts, onClear }) {
    return (
        <div>
            <h2>All Posts</h2>

            {posts.length > 0 && (
                <button onClick={onClear} className="clear-btn">
                    Clear All Posts
                </button>
            )}

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map((p) => <Post key={p.id} title={p.title} body={p.body} />)
            )}
        </div>
    );
}
