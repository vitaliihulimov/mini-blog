import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import './styles.css';

export default function App() {
  // 1️⃣ Завантаження постів з localStorage або початкові
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved
      ? JSON.parse(saved)
      : [
        { id: 1, title: 'Hello React', body: 'React is awesome!' },
        { id: 2, title: 'Learning Components', body: 'Components make UI modular.' },
      ];
  });

  // 2️⃣ Зберігаємо пости в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // 3️⃣ Додавання нового поста
  const addPost = (newPost) => {
    setPosts([...posts, { id: Date.now(), ...newPost }]);
  };

  // 4️⃣ Очищення всіх постів
  const clearPosts = () => {
    if (window.confirm('Are you sure you want to delete all posts?')) {
      setPosts([]);
      localStorage.removeItem('posts');
    }
  };

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/posts"
            element={<Posts posts={posts} onClear={clearPosts} />}
          />
          <Route
            path="/add"
            element={<AddPost posts={posts} onAdd={addPost} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
