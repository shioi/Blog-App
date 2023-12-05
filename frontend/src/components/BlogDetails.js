import React from 'react';
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, isYesterday, parseISO } from 'date-fns';

const BlogDetails = ({ blog, func }) => {
  const navigate = useNavigate();
  const handleClick = (blog) => {
    func(blog)
    navigate("/details")
  }

    const formattedDate = (date) => {
    const parsedDate = parseISO(date);
    if (isYesterday(parsedDate)) {
      return 'Posted yesterday';
    } else {
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    }
    };
  
  const formatText = (text) => {
    const words = text.split(/\s+/); // Split the string into words by whitespace
    const first30Words = words.slice(0, 15).join(' '); // Take the first 30 words and join them back into a string
    console.log(first30Words)
    return first30Words;
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
          <p className="card-text" dangerouslySetInnerHTML={{ __html: formatText(blog.body) }}></p>
          <p onClick={() => handleClick(blog)} className="btn btn-primary">Read</p>
        </div>
        <div className="class-body">
          <p class="blockquote-footer">{blog.username}</p>
        </div>
        <div className="card-footer text-body-secondary">
          <p>{formattedDate(blog.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

