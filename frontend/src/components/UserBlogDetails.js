import React from 'react';
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, isYesterday, parseISO } from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext'

const UserBlogDetails = ({ blog, func }) => {
  const user = useAuthContext()
  const navigate = useNavigate();
  const handleClick = (blog) => {
    func(blog);
    navigate("/details");
  };

  const formattedDate = (date) => {
    const parsedDate = parseISO(date);
    if (isYesterday(parsedDate)) {
      return 'Posted yesterday';
    } else {
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    }
  };

  const handleDelete = async () => {
    const response = await fetch('/api/blogs/' + blog._id, {
      method: 'DELETE',
       headers: {
        'Authorization': `Bearer ${user.user.token}`
        }
    })
    const json = await response.json()
    if (response.ok) {
      console.log("deleted", json)
      window.location.reload()
    }

  }

  return (
    <div className="col-lg-12 mb-4 p-3">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
              {/* Add max-height style to limit image height */}
              <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" className="img-fluid rounded-3" alt="blog cover" style={{ maxHeight: '200px' }} />
              <a href="#">
                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
              </a>
            </div>
          </div>
          <div className="col-md-8 position-relative">
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              {/* Rendering HTML content using dangerouslySetInnerHTML */}
              <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.body }}></p>
              <p onClick={() => handleClick(blog)} className="btn btn-primary">Read</p>
            </div>
            <div className="text-body-secondary position-absolute top-0 end-0 p-3">
              <i className="bi bi-trash-fill" onClick={handleDelete} style={{ cursor: 'pointer' }}></i>
            </div>
            <div className="text-body-secondary float-end p-3" style={{ marginTop: '2rem' }}>
              <p>{formattedDate(blog.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlogDetails;
