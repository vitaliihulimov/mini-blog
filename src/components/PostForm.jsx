import { useState } from 'react';

export default function PostForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && body) {
            onAdd({ title, body });
            setTitle('');
            setBody('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Post content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type="submit">Add</button>
        </form>
    );
}
