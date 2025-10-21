import PostForm from '../components/PostForm';
import Post from '../components/Post';

export default function AddPost({ posts, onAdd, onDelete, onPostClick, onEdit }) {
    return (
        <div>
            <h2>Add New Post</h2>
            <PostForm onAdd={onAdd} />

            {posts.length > 0 && (
                <>
                    <h3>Recent Posts ({posts.length})</h3>
                    <div className="posts-grid">
                        {posts.slice(-3).map((p) => (
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
                </>
            )}
        </div>
    );
}