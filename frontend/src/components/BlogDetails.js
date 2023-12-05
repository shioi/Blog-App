import React from 'react';
import { useNavigate } from "react-router-dom";

const BlogDetails = ({ blog, func }) => {
  const navigate = useNavigate();
  const handleClick = (blog) => {
    func(blog)
    navigate("/details")
  }

  return (
    <div className="col-lg-4 col-md-12 mb-4">
      <div className="card rounded-3">
        <div className="bg-image hover-overlay ripple " data-mdb-ripple-color="light">
          <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" className="img-fluid rounded-3" />
          <a href="#">
            <div className="mask" style={{ 'background-color': 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          {/* Rendering HTML content using dangerouslySetInnerHTML */}
          <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.body }}></p>
          <p onClick={() => handleClick(blog)} className="btn btn-primary">Read</p>
        </div>
        <div className="class-body">
          <p class="blockquote-footer">{blog.username}</p>
        </div>
        <div className="card-footer text-body-secondary">
  <p>Date posted</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

