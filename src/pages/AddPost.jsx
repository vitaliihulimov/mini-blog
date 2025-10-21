import PostForm from '../components/PostForm';
import Post from '../components/Post';

export default function AddPost({ posts, onAdd }) {
    return (
        <div>
            <h2>Add New Post</h2>
            <PostForm onAdd={onAdd} />
            <h3>Preview:</h3>
            {posts.map((p) => (
                <Post key={p.id} title={p.title} body={p.body} />
            ))}
        </div>
    );
}
