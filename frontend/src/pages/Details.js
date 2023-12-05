const { useEffect, useState } = require("react")

const Details = ({ current }) => {
    console.log('/api/blogs/' + current._id)
    const [blog, setBlog] = useState(null)
    useEffect(() => {
        const fetchBlog = async () => {
            const results = await fetch('/api/blogs/' + current._id)
            const json = await results.json()
            if (results.ok) {
                setBlog(json)
            }
        }
        fetchBlog()
    }, [current])

    return (
        <>
            {blog &&
                <div>
                <div id="intro" class="p-5 text-center bg-light">
                    <h3 class="mb-3">{blog.title}</h3>
                </div>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.body }}></p>
                    </div>
            }
        </>
    )
}

export default Details;