import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

export default function AddPost({ onAdd }) {
    const navigate = useNavigate();

    const handleAddPost = (newPost) => {
        onAdd(newPost);
        // Перекидаємо на сторінку постів після успішного додавання
        navigate('/posts');
    };

    return (
        <div>
            <h2>Add New Post</h2>
            <PostForm onAdd={handleAddPost} />
        </div>
    );
}