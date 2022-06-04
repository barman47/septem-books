import { Document, Schema, model } from 'mongoose';

interface CartItem {
    _id: string;
    quantity: number;
}

export interface Cart extends Document {
    _id?: string;
    user: string;
    items: CartItem[];
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const CartSchema = new Schema<Cart>({
    items: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: [true, 'Book id is required!']
        },

        quantity: {
            type: Number,
            required: [true, 'Book quantity is required!'],
        },

        amount: {
            type: Number,
            required: [true, 'Book price is required!'],
        },
    }],

    price: {
        type: Number,
        required: [true, 'Cart price is required!'],
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Cart owner is required!']
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date
    }
});

CartSchema.index({'$**': 'text'});
export default model<Cart>('Cart', CartSchema);