import React from 'react';
import { Link } from 'react-router';

const PostListItem = ({ post }) => (
  <div>
    <h3><Link to={`/post/${post.slug}`}> {post.title} </Link></h3>
  </div>
);

export default PostListItem;
