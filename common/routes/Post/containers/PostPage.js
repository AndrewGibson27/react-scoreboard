import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPost } from '../actions';
import Helmet from 'react-helmet';
import NotFound from '../../../components/NotFound';
import { selectCurrentPost } from '../reducer';

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadPost(slug))
};

const mapStateToProps = state => selectCurrentPost(state);

const PostPage = ({ title, content, isLoading, error }) => {
  if (!error) {
    return (
      <div>
        <Helmet title={title} />
        {isLoading &&
          <div>
            <h2>Loading....</h2>
          </div>}
        {!isLoading &&
          <div>
            <h2>{title}</h2>
            <p>{content}</p>
          </div>}
      </div>
    );
  } else {
    return <NotFound />;
  }
};

PostPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

export default provideHooks(redial)(connect(mapStateToProps)(PostPage));
