import { useState } from 'react';

export default function PostForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && body) {
            onAdd({
                title,
                body: body, // Не нормалізуємо тут, будемо обробляти при відображенні
                image: imagePreview
            });
            setTitle('');
            setBody('');
            setImage(null);
            setImagePreview(null);
            const fileInput = document.getElementById('image-upload');
            if (fileInput) fileInput.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Post content (press Enter twice for new paragraphs)"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows="8"
                className="post-body-textarea"
            ></textarea>

            <div className="textarea-tips">
                <small>💡 Tip: Press Enter twice to create new paragraphs</small>
            </div>

            <div className="image-upload-section">
                <label htmlFor="image-upload" className="image-upload-label">
                    📷 Add Image (Optional)
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                />

                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="remove-image-btn"
                        >
                            Remove Image
                        </button>
                    </div>
                )}
            </div>

            <button type="submit">Add Post</button>
        </form>
    );
}