import { Auth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth} from './firebase'

export const loginUser = async(email: string, psswd: string) => {
    return await signInWithEmailAndPassword(auth, email, psswd)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            return user
            // ...
        })
        .catch((error) => {
            return undefined
        });
}

export const updateUser = async(auth: Auth, displayName: string, imgUrl: string | undefined) => {
    if(auth.currentUser){
        return updateProfile(auth.currentUser, {
            photoURL: imgUrl,
            displayName
        }).then(() => {
            return true
        }).catch(() => {
            return false
        })
    } else {
        return undefined
    }
}