import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {Doughnut,Pie} from 'react-chartjs-2';


// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';


function Spacer(props){
  console.log("start of Spacer function");
  console.log("text above me");
  var content = props.text;
  const data = {
    labels: content.graphData.labels,
    datasets: [{
      data: content.graphData.numbers,
      backgroundColor:content.graphData.colors
    }]
  };
  const legendOpts = {
    display: true,
    position: 'right',
    fullWidth: true,
    reverse: false,
  };
  return (
    <div>
    {content.text.split("\n").map(i => {
      return <div>{i}</div>;
    })}
    <Doughnut data={data} legend={legendOpts}/>
    </div>
  )
}

export function PostDetailPage(props) {
  const data = {
    labels: props.post.text[0].graphData.labels,
    datasets: [{
      data: props.post.text[0].graphData.numbers,
      backgroundColor:props.post.text[0].graphData.colors
    }]
  };

  const legendOpts = {
    display: true,
    position: 'right',
    fullWidth: true,
    reverse: false,
  };
  console.log("here is content");
  console.log(props.post.text);
  return (
    <div>
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p>
        {props.post.text.map((item,index) => {
            return <Spacer text={item}></Spacer>
        })}
        </p>
        <p>
          <h2 className={styles['image-title']}> One Trick Players </h2>
          <Doughnut data={data} legend={legendOpts}/>
        </p>
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
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
