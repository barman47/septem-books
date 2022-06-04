import { Document, Schema, model } from 'mongoose';
import { OrderStatus, OrderStatusType } from 'utils/constants';

export interface Store extends Document {
    _id?: string;
    status: OrderStatusType;
    createdAt?: Date;
    updatedAt?: Date;
    owner?: string;
}

const StoreSchema = new Schema<Store>({
    status: {
        type: String,
        enum: [OrderStatus.PENDING, OrderStatus.IN_PROGRESS, OrderStatus.CANCELED, OrderStatus.COMPLETED],
        default: OrderStatus.PENDING
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