import { Document, Schema, model } from 'mongoose';

export interface Book extends Document {
    _id?: string;
    title: string;
    author?: string;
    isbn?: string;
    quantity: number;
    price: number;
    description: string;
    image?: string;
    imageKey?: string;
    createdAt?: Date;
    updatedAt?: Date;
    inStock?: boolean;
    owner?: string;
}

const BookSchema = new Schema<Book>({
    title: {
        type: String,
        uppercase: true,
        required: [true, 'Book title is required!'],
        trim: true
    },

    author: {
        type: String,
        trim: true
    },

    isbn: {
        type: String,
        trim: true
    },

    quantity: {
        type: Number,
        required: [true, 'Book quantity is required!'],
    },

    price: {
        type: Number,
        required: [true, 'Book price is required!'],
    },

    description: {
        type: String,
        trim: true
    },

    inStock: {
        type: Boolean,
        default: true
    },

    image: {
        type: String
    },

    imageKey: {
        type: String
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: [true, 'Book owner is required!']
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date
    }
});

BookSchema.index({'$**': 'text'});
export default model<Book>('Book', BookSchema);