import { useEffect, useState } from 'react';

export default function PostModal({
    post,
    editingPost,
    onClose,
    onDelete,
    onEdit,
    onUpdate,
    onCancelEdit,
    onToggleFavourite
}) {
    const [editTitle, setEditTitle] = useState(post.title);
    const [editBody, setEditBody] = useState(post.body);
    const [editImage, setEditImage] = useState(post.image);
    const [imagePreview, setImagePreview] = useState(post.image);
    const [currentPost, setCurrentPost] = useState(post); // Додаємо локальний стан для поста

    const isEditing = editingPost && editingPost.id === post.id;

    // Оновлюємо локальний стан при зміні пропсу post
    useEffect(() => {
        setCurrentPost(post);
    }, [post]);

    useEffect(() => {
        if (isEditing) {
            setEditTitle(post.title);
            setEditBody(post.body);
            setEditImage(post.image);
            setImagePreview(post.image);
        }
    }, [post, isEditing]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.keyCode === 27) {
                if (isEditing) {
                    onCancelEdit();
                } else {
                    onClose();
                }
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose, onCancelEdit, isEditing]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            if (isEditing) {
                onCancelEdit();
            } else {
                onClose();
            }
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete(currentPost.id);
            onClose();
        }
    };

    const handleFavourite = () => {
        if (onToggleFavourite) {
            onToggleFavourite(currentPost.id);
            // Оновлюємо локальний стан негайно
            setCurrentPost(prev => ({
                ...prev,
                isFavourite: !prev.isFavourite
            }));
        }
    };

    const handleSave = () => {
        if (!editTitle.trim() || !editBody.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        onUpdate({
            ...currentPost,
            title: editTitle,
            body: editBody,
            image: editImage
        });
    };

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

            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImage(reader.result);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setEditImage(null);
        setImagePreview(null);
    };

    // Функція для відображення повного тексту з абзацами
    const renderFullTextWithParagraphs = (text) => {
        if (!text) return <p className="text-paragraph">No content</p>;

        const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim() !== '');

        if (paragraphs.length === 0) return <p className="text-paragraph">No content</p>;

        return paragraphs.map((paragraph, index) => (
            <p key={index} className="text-paragraph">
                {paragraph.split('\n').map((line, lineIndex, array) => (
                    <span key={lineIndex}>
                        {line}
                        {lineIndex < array.length - 1 && <br />}
                    </span>
                ))}
            </p>
        ));
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="modal-edit-title"
                            placeholder="Post title"
                        />
                    ) : (
                        <h2 className="modal-title">{currentPost.title}</h2>
                    )}
                    <div className="modal-header-actions">
                        {!isEditing && onToggleFavourite && (
                            <button
                                onClick={handleFavourite}
                                className={`modal-favourite-btn ${currentPost.isFavourite ? 'favourited' : ''}`}
                                aria-label={currentPost.isFavourite ? "Remove from favourites" : "Add to favourites"}
                                title={currentPost.isFavourite ? "Remove from favourites" : "Add to favourites"}
                            >
                                {currentPost.isFavourite ? '❤️' : '🤍'}
                            </button>
                        )}
                        <button className="modal-close-btn" onClick={isEditing ? onCancelEdit : onClose}>
                            ×
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-image-section">
                        {isEditing ? (
                            <>
                                {imagePreview && (
                                    <div className="modal-image">
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
                                <label htmlFor="modal-image-upload" className="image-upload-label">
                                    📷 {imagePreview ? 'Change Image' : 'Add Image'}
                                </label>
                                <input
                                    id="modal-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="image-input"
                                />
                            </>
                        ) : (
                            currentPost.image && (
                                <div className="modal-image">
                                    <img src={currentPost.image} alt={currentPost.title} />
                                </div>
                            )
                        )}
                    </div>

                    <div className="modal-text-section">
                        {isEditing ? (
                            <>
                                <textarea
                                    value={editBody}
                                    onChange={(e) => setEditBody(e.target.value)}
                                    className="modal-edit-body"
                                    placeholder="Post content (press Enter twice for new paragraphs)"
                                    rows="12"
                                />
                                <div className="textarea-tips">
                                    <small>💡 Tip: Press Enter twice to create new paragraphs</small>
                                </div>
                            </>
                        ) : (
                            <div className="modal-text">
                                {renderFullTextWithParagraphs(currentPost.body)}
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    {isEditing ? (
                        <>
                            <button
                                className="modal-cancel-btn"
                                onClick={onCancelEdit}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-save-btn"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="modal-delete-btn"
                                onClick={handleDelete}
                            >
                                Delete Post
                            </button>
                            <button
                                className="modal-edit-btn"
                                onClick={() => onEdit(currentPost)}
                            >
                                Edit Post
                            </button>
                            <button
                                className="modal-close-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}