import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import Favourites from './pages/Favourites';
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
          image: null,
          isFavourite: false,
          createdAt: new Date('2024-01-01').getTime() // Додаємо timestamp для старих постів
        },
        {
          id: 2,
          title: 'Learning Components',
          body: 'Components make UI modular and reusable. They are the building blocks of React applications. With components, you can create complex UIs from small, isolated pieces of code.',
          image: null,
          isFavourite: false,
          createdAt: new Date('2024-01-02').getTime()
        },
      ];
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // ВИПРАВЛЕНА функція додавання поста з timestamp
  const addPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now(),
      isFavourite: false,
      createdAt: Date.now() // Додаємо поточний timestamp
    };
    setPosts([...posts, postWithId]);
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

  // Функція для додавання/видалення з улюблених
  const toggleFavourite = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isFavourite: !post.isFavourite }
        : post
    ));
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
    setSelectedPost(post);
    setEditingPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const cancelEditing = () => {
    setEditingPost(null);
  };

  // СОРТУВАННЯ ПОСТІВ - останні додані першими
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      // Сортуємо за createdAt (якщо є) або за id (для старих постів)
      const dateA = a.createdAt || a.id;
      const dateB = b.createdAt || b.id;
      return dateB - dateA; // Спадаючий порядок - новіші першими
    });
  }, [posts]);

  // Отримуємо улюблені пости (також відсортовані)
  const favouritePosts = useMemo(() => {
    return sortedPosts.filter(post => post.isFavourite);
  }, [sortedPosts]);

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
                posts={sortedPosts} // Передаємо відсортовані пости
                onDelete={deletePost}
                onClear={clearPosts}
                onPostClick={openModal}
                onEdit={startEditing}
                onToggleFavourite={toggleFavourite}
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddPost onAdd={addPost} />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                posts={favouritePosts}
                onDelete={deletePost}
                onPostClick={openModal}
                onEdit={startEditing}
                onToggleFavourite={toggleFavourite}
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
          onToggleFavourite={toggleFavourite}
        />
      )}
    </Router>
  );
}