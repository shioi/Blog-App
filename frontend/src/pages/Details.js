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
            {blog && (
  <div id="intro" className="blog-container p-3">

    <div className="blog-header" style={{ backgroundImage: `url(${blog.Image})` }}>
      <div className="overlay"></div>
      <div className="header-content">
        <h3 className="mb-3">{blog.title}</h3>
      </div>
    </div>

    <div className="blog-body">
      <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.body }}></p>
    </div>
  </div>
)}

        </>
    )
}
export default Details;