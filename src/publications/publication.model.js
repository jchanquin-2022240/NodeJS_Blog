
import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    author: {
        type: String,
        requered: [true, "Post author is required"]
    },
    title: {
        type: String,
        required: [true, "Post title is required"]
    },
    description: {
        type: String,
        required: [true, "Post description is required"]
    },
    tools: {
        type: String,
        required: [true, "Post tools is required"]
    },
    descriptionFuntion: {
        type: String,
        required: [true, "Post descriptionFuntion is required"]
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        // default: Date.now
    },
    comments: [{
        commentUser: {
            type: String
        },
        commentMain: {
            type: String
        }
    }],
    publicationStatus: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', PublicationSchema);
