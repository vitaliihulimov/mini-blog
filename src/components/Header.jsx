import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo-link">
                <h1>Mini Blog</h1>
            </Link>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/add">Add Post</Link>
                <Link to="/favourites">Favourites</Link>
            </nav>
        </header>
    );
}