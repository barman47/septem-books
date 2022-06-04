import { Document, Schema, model } from 'mongoose';

export interface Favourite extends Document {
    _id?: string;
    user: string;
    item: string;
    createdAt?: Date;
}

const FavouriteSchema = new Schema<Favourite>({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book is required!']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Favourite owner is required!']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

FavouriteSchema.index({'$**': 'text'});
export default model<Favourite>('Favourite', FavouriteSchema);