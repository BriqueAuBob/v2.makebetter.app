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
};
