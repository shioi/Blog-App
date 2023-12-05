import { useEffect, useState } from "react"

//components
import BlogDetails from "../components/BlogDetails"


const Home = ({ func}) => {
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            const results = await fetch('/api/blogs')
            console.log(results)
            const json = await results.json()
            if (results.ok) {
                setBlogs(json)
            }
        }
        fetchBlogs()
    }, [])
    
    return (
        <main className="my-5">
            <div className="container">
                <section class="text-center">
                    <div className="row">
                            <div id="intro" class="p-5 text-center bg-light">
                    <h1 class="mb-3 h2">Share your Programing Experience</h1>
                    <p class="mb-3">Programming is new magic!!</p>
                        </div>
                {blogs && blogs.map((blog) => (
                    <BlogDetails key={blog._id} blog={blog} func={func} />
                ))}
                    </div>
                    </section>
            </div>
        </main>
    )
}

export default Home