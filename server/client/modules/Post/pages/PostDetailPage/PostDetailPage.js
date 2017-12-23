import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {Doughnut,Pie,Bar} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import renderGraph from '../../components/PostListItem/graphs';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';
// Import Actions
import { fetchPost } from '../../PostActions';
// Import Selectors
import { getPost } from '../../PostReducer';


function Spacer(props){
  console.log("start of Spacer function");
  console.log("text above me");
  var content = props.content;
  const graph = renderGraph(content.graphData);

  return (
    <div>
      {content.text.split("\n").map(i => {
        return <div>{i}</div>;
      })}
      <div className={styles['graph']}>{graph}</div>
    </div>
  )
}

export function PostDetailPage(props) {

  const legendOpts = {
    display: true,
    position: 'right',
    fullWidth: true,
    reverse: false,
  };
  console.log("here is content");
  return (
    <div>
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <div>
        {props.post.content.map((item,index) => {
            return <Spacer content={item}></Spacer>
        })}
        </div>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
