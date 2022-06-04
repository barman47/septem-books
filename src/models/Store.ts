import { Document, Schema, model } from 'mongoose';

export interface Store extends Document {
    _id?: string;
    name: string;
    address: string;
    active?: boolean;
    description: string;
    image?: string;
    imageKey?: string;
    createdAt?: Date;
    updatedAt?: Date;
    owner?: string;
}

const StoreSchema = new Schema<Store>({
    name: {
        type: String,
        uppercase: true,
        required: [true, 'Store name is required!'],
        trim: true
    },

    active: {
        type: Boolean,
        default: false,
    },

    description: {
        type: String,
        trim: true
    },

    image: {
        type: String
    },

    imageKey: {
        type: String
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Store owner is required!']
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date
    }
});

StoreSchema.index({'$**': 'text'});
export default model<Store>('Store', StoreSchema);