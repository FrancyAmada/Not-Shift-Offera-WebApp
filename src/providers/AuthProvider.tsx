import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    User,
} from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

enum AuthStatus {
    idle = 'idle',
    resolved = 'resolved',
    rejected = 'rejected',
}

type AuthResponse = {
    name?: string;
    email?: string;
    password?: string;
    success?: boolean;
    msg?: string;
    status?: AuthStatus;
};

type AuthData = {
    user: User | null;
    isAuthenticated: boolean | undefined;
    logIn: (data: { email: string; password: string }) => Promise<AuthResponse>;
    signUp: (data: {
        name: string;
        email: string;
        password: string;
    }) => Promise<AuthResponse>;
    logOut: () => Promise<AuthResponse>;
};

const AuthContext = createContext<AuthData>({
    user: null,
    isAuthenticated: undefined,
    logIn: async (data: {
        email: string;
        password: string;
    }): Promise<AuthResponse> => ({ status: AuthStatus.idle }),
    signUp: async (data: {
        name: string;
        email: string;
        password: string;
    }): Promise<AuthResponse> => ({ status: AuthStatus.idle }),
    logOut: async (): Promise<AuthResponse> => ({ status: AuthStatus.idle }),
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
        undefined,
    );

    useEffect(() => {
        const unsub = onAuthStateChanged(FIREBASE_AUTH, user => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, []);

    const updateUserData = async (userId: string) => {
        const docRef = doc(FIRESTORE_DB, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({
                ...user,
                name: data?.name,
                email: data?.email,
                userId: data?.userId,
            });
        }
    };

    const logOut = async () => {
        console.log('Logging out');
        try {
            await FIREBASE_AUTH.signOut();
        } catch (error: any) {
            return {
                success: false,
                msg: error.message,
                status: AuthStatus.rejected,
            };
        } finally {
            return { status: AuthStatus.resolved };
        }
    };

    const logIn = async (data: { email: string; password: string }) => {
        try {
            const response = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                data.email,
                data.password,
            );
            return { success: true, data: response?.user };
        } catch (error: any) {
            let msg = error.message;
            if (error.code === 'auth/invalid-credential') {
                msg = 'The email address or password is incorrect';
            }
            if (error.code === 'auth/too-many-requests') {
                msg = 'Too many requests. Try again later';
            }
            return {
                success: false,
                msg,
                status: AuthStatus.rejected,
            };
        }
    };

    const signUp = async (data: {
        name: string;
        email: string;
        password: string;
    }) => {
        try {
            const response = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                data.email,
                data.password,
            );

            await setDoc(doc(FIRESTORE_DB, 'users', response?.user?.uid), {
                name: data.name,
                email: data.email,
                userId: response?.user?.uid,
            });
            return { success: true, data: response?.user };
        } catch (error: any) {
            let msg = error.message;
            if (error.code === 'auth/email-already-in-use') {
                msg = 'Email already in use';
            }
            if (error.code === 'auth/weak-password') {
                msg = 'Password is too weak';
            }
            if (error.code === 'auth/invalid-email') {
                msg = 'Invalid email';
            }
            return {
                success: false,
                msg,
                status: AuthStatus.rejected,
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, logIn, signUp, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (value === undefined) {
        console.log('useAuth must be used within an AuthProvider');
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return value;
};
