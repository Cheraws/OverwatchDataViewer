import mongoose from 'mongoose';
import Graph from './graph';
import {graphSchema} from './graph';

const Schema = mongoose.Schema;

const contentSchema = new Schema ({
  text: { type: 'String', required: false},
  type: { type: 'String', required: true},
  title: {type: 'String', required: false},
  graphData: {
    type: { type:'String', required: false},
    labels:{ type:['String'], required: false},
    numbers:{ type:['String'], required: false},
    title:{ type:['String'], required: false}
  },
  graphTitle: {type: 'String', required: false},
  graphs: {type:[graphSchema], required:false},
});

export default mongoose.model('Content', contentSchema);
export {contentSchema};
