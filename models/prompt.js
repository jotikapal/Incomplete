 import { Schema, model, models } from "mongoose";
 
 const PromptSchema = new Schema({
    creator: {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type:String,
        required: [true,'Promt is required.'],
    },
    tag: {
        type:String,
        required:[true,'Tag ir required.']
    }
 });

 const Prompt = models.Prompt || model('prompt', PromptSchema);

 export default Prompt;
 