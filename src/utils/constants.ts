export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SELLER = 'SELLER'
}

export type UserRole = `${Role}`;

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
};

export type Status = `${UserStatus}`;

export enum Genders {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export type Gender = `${Genders}`;

export enum OrderStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED'
}

export type OrderStatusType = `${OrderStatus}`;

export interface ErrorObject<T> {
    errors: T;
    isValid: boolean;
};