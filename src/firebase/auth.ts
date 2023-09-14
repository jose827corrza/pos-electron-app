import { signInWithEmailAndPassword } from 'firebase/auth';
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
            // console.log(error.message);
            return undefined
        });
}