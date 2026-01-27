import React from "react";
import "../../pages/static/Blog.css";

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <div 
        className="blog-card-image" 
        style={{ backgroundImage: `url(${post.image})` }}
      ></div>
      <div className="blog-card-body">
        <span className="category-badge">{post.category}</span>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        
        <div className="blog-meta">
          <div className="author-avatar" style={{ backgroundImage: `url(${post.authorImage})`, backgroundSize: 'cover' }}></div>
          <div className="meta-info">
            <div className="meta-author">{post.author}</div>
            <div>{post.date} · {post.readTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
