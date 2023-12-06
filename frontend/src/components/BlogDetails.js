import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, isYesterday, parseISO } from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext'

const BlogDetails = ({ blog, func }) => {
  const user = useAuthContext();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [totalLike, setTotalLike] = useState(blog.likes)

  const handleClick = (blog) => {
    func(blog);
    navigate('/details');
  };

  const handleLikeClick = async (current) => {
    if (!user.user) {
      navigate('/login')
    }
    const updatedLike = !liked;
    setLiked(updatedLike);
    const newTotalLike = updatedLike ? totalLike + 1 : totalLike - 1;

    try {
      const response = await fetch('https://fp-blog.onrender.com/api/blogs/' + current._id, {
        method: 'PATCH',
        body: JSON.stringify({ likes: newTotalLike }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.user.token}`
        }
      });

      if (!response.ok) {
        console.log("Error occurred while updating likes.");
        // Revert the like status if the update fails
        setLiked(!updatedLike);
      } else {
        // Update totalLike if the update is successful
        setTotalLike(newTotalLike);
        console.log("Liked");
      }
    } catch (error) {
      console.log('An error occurred. Please try again.');
    }
  };


  const formattedDate = (date) => {
    const parsedDate = parseISO(date);
    if (isYesterday(parsedDate)) {
      return 'Posted yesterday';
    } else {
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    }
  };

  const formatText = (text) => {
    const words = text.split(/\s+/);
    const first30Words = words.slice(0, 30).join(' ');
    return first30Words;
  };

 return (
    <div className="col">
      <a onClick={() => handleClick(blog)}>
        <div className="card rounded-3 text-bg-light h-100">
          <div className="hover-overlay ripple" data-mdb-ripple-color="light">
            <img src={`https://fp-blog.onrender.com/images/${blog.Image}`} className="card-img-top img-fluid rounded-3" alt="blog cover" style={{ maxHeight: '250px' }} />
            <a href="#">
              <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            </a>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: formatText(blog.body) }}></p>
              <p className="blockquote-footer">{blog.username}</p>
            </div>
        <div className="text-body-secondary d-flex align-items-center justify-content-between mt-auto" style={{ backgroundColor: 'white' }}>
  <p className='card-text'><small className="text-body-secondary">{formattedDate(blog.createdAt)}</small></p>
  <div className="d-flex align-items-center">
               <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`} onClick={(e) =>
               {
                e.stopPropagation(); // Stop the event from propagating 
                 handleLikeClick(blog)
                 
               }}
                 style={{ cursor: 'pointer' }}></i>
    <p className="mb-0 ms-1">{totalLike}</p>
  </div>
</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BlogDetails;