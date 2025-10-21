import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import PostModal from './components/PostModal';
import './styles.css';

export default function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: 1,
          title: 'Hello React',
          body: 'React is awesome! This is a longer description to show how the modal window works with more content. You can add images, format text, and create beautiful blog posts.',
          image: null
        },
        {
          id: 2,
          title: 'Learning Components',
          body: 'Components make UI modular and reusable. They are the building blocks of React applications. With components, you can create complex UIs from small, isolated pieces of code.',
          image: null
        },
      ];
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts([...posts, { id: Date.now(), ...newPost }]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    ));
    setEditingPost(null);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      closeModal();
    }
  };

  const clearPosts = () => {
    if (window.confirm('Are you sure you want to delete all posts?')) {
      setPosts([]);
      closeModal();
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
    setEditingPost(null);
    document.body.style.overflow = 'unset';
  };

  const startEditing = (post) => {
    setSelectedPost(post); // Встановлюємо вибраний пост
    setEditingPost(post);  // Встановлюємо пост для редагування
    setIsModalOpen(true);  // Відкриваємо модалку
    document.body.style.overflow = 'hidden';
  };

  const cancelEditing = () => {
    setEditingPost(null);
  };

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/posts"
            element={
              <Posts
                posts={posts}
                onDelete={deletePost}
                onClear={clearPosts}
                onPostClick={openModal}
                onEdit={startEditing} // Додаємо onEdit проп
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddPost
                posts={posts}
                onAdd={addPost}
                onDelete={deletePost}
                onPostClick={openModal}
                onEdit={startEditing} // Додаємо onEdit проп
              />
            }
          />
        </Routes>
      </div>

      {/* Модальне вікно для перегляду/редагування поста */}
      {isModalOpen && selectedPost && (
        <PostModal
          post={selectedPost}
          editingPost={editingPost}
          onClose={closeModal}
          onDelete={deletePost}
          onEdit={startEditing}
          onUpdate={updatePost}
          onCancelEdit={cancelEditing}
        />
      )}
    </Router>
  );
}