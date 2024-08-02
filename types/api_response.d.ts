import { User } from 'user';

export type Testimonial = {
    author: User;
    message: string;
};

export type Testimonials = {
    testimonials: Testimonial[];
};

export type Statistics = {
    members: number;
    testimonials: number;
};

export type Tag = {
    id: number;
    name: string;
    color: string;
    locale: string;
    type: string;
    created_at: string;
    updated_at: string;
};
