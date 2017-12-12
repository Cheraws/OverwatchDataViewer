import mongoose from 'mongoose';
import Content from './content';
import {contentSchema} from './content';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  subtext: {type: 'String', required: true},
  content: {type:[contentSchema], required:true},
  dateAdded: { type: 'Date', default: Date.now, required: true },
});


export default mongoose.model('Post', postSchema);
