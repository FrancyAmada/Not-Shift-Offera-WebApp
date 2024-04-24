import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from 'firebaseConfig';

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(FIREBASE_AUTH, user => {
            console.log('USER:', user);
            setUser(user);
        });
        return unsub;
    });
    return { user };
}
