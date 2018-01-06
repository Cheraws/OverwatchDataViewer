import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const graphSchema = new Schema ({
  dataType: { type:'String', required: true},
  graphType: { type:'String', required: true},
  labels:{ type:['String'], required: false},
  numbers:{ type:['String'], required: false},
  title:{ type:'String', required: false},
  tabTitle:{ type:'String', required: false}
});


export default mongoose.model('graph', graphSchema);
export {graphSchema};
