import { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails";

const Home = ({ func }) => {
    const [blogs, setBlogs] = useState(null);
    const [filteredBlogs, setFilteredBlogs] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const results = await fetch('https://fp-blog.onrender.com/api/blogs');
                const json = await results.json();
                if (results.ok) {
                    setBlogs(json);
                    setFilteredBlogs(json);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            setFilteredBlogs(blogs);
            return;
        }
        const filterBlogs = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(filterBlogs);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const [sortBy, setSortBy] = useState(''); // State to track sorting criteria

    const handleSort = (e) => {
        setSortBy(e.target.value);
        sortBlogs(e.target.value);
    };

    const sortBlogs = (criteria) => {
        let sorted = [...filteredBlogs];

        if (criteria === 'title') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria === 'date') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredBlogs(sorted);
    };

return (
        <main className="my-5">
            <div className="container">
                <section className="text-center">
                    <div className="row">
                        <div id="intro" className="p-1 text-center">
                        <h1 className="mb-1 h2 fw-bold text-body-primary font-monospace" style={{ color: 'darkpink' }}>Welcome to Functional Programming Blogs</h1>        
                            <div className="d-flex justify-content-between align-items-center">
                                <form className="d-flex" onSubmit={handleSearch}>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search by title or username"
                                        aria-label="Search"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                    />
                                    <button className="btn btn-outline-success" type="submit">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </form>
                                <div className="d-flex align-items-center p-3">
                                <i className="bi bi-sort-down-alt me-2"></i>
                                <div className="mt-3">
                                    <select
                                        id="sort"
                                        className="form-select"
                                        value={sortBy}
                                        onChange={handleSort}
                                    >
                                        <option value="">Select</option>
                                        <option value="title">Title</option>
                                        <option value="date">Date</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filteredBlogs && filteredBlogs.map((blog) => (
                            <BlogDetails key={blog._id} blog={blog} func={func} />
                        ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
