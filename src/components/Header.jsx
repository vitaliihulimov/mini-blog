import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <h1>Mini Blog</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/add">Add Post</Link>
            </nav>
        </header>
    );
}
