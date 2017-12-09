import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contentSchema = new Schema ({
  text: { type: 'String', required: true},
  graphData: {
    labels:{ type:['String'], required: false},
    numbers:{ type:['String'], required: false},
    colors:{ type:['String'], required: false},
    title:{ type:['String'], required: false}
  },
});

export default mongoose.model('Content', contentSchema);
export {contentSchema};
