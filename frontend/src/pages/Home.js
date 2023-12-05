import { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails";

const Home = ({ func }) => {
    const [blogs, setBlogs] = useState(null);
    const [filteredBlogs, setFilteredBlogs] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const results = await fetch('/api/blogs');
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

    return (
        <main className="my-5">
            <div className="container">
                <section className="text-center">
                    <div className="row">
                        <div id="intro" className="p-1 text-center bg-light">
                            <h1 className="mb-3 h2">Share your Programming Experience</h1>
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
                                    Search
                                </button>
                            </form>
                        </div>
                        {filteredBlogs && filteredBlogs.map((blog) => (
                            <BlogDetails key={blog._id} blog={blog} func={func} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
