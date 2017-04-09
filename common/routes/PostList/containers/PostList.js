import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { loadPosts } from '../actions';
import { connect } from 'react-redux';
import PostListItem from '../components/PostListItem';
import Helmet from 'react-helmet';
import { selectPosts } from '../reducer';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPosts())
};

const mapStateToProps = state => ({
  posts: selectPosts(state)
});

const PostListPage = ({ posts }) => (
  <div>
    <Helmet title='Posts' />
    {posts.isLoading &&
      <div>
        <h2>Loading...</h2>
      </div>}
    {!posts.isLoading &&
      posts.data.map((post, i) => <PostListItem key={post.id} post={post} />)}
  </div>
);

PostListPage.PropTypes = {
  posts: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(PostListPage));
