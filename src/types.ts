import { User } from 'firebase/auth';

export type Post = {
    author: UserProfile;
    type: 'task' | 'service';
    id: number;
    title: string;
    description: string;
    image: string;
    rate: number;
    createdAt: string;
};

export enum AuthStatus {
    idle = 'idle',
    resolved = 'resolved',
    rejected = 'rejected',
}

export type UserProfile = {
    fullName: string;
    profileImg: string;
    userId: string;
    email?: string;
} & Partial<User>;

export type AuthResponse = {
    fullName?: string;
    email?: string;
    password?: string;
    success?: boolean;
    msg?: string;
    status?: AuthStatus;
};

export type AuthData = {
    user: User | null;
    isAuthenticated: boolean | undefined;
    logIn: (data: { email: string; password: string }) => Promise<AuthResponse>;
    signUp: (data: {
        fullName: string;
        email: string;
        password: string;
    }) => Promise<AuthResponse>;
    logOut: () => Promise<AuthResponse>;
};
