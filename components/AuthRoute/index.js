import { useAuth } from "@/firebase/context";
import { useRouter } from "next/router";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const loggedInUserPreventedPaths = ['/login'];
const preventVerifiedUser = ['/verify'];

export default function AuthRoute({ children }) {
    const router = useRouter();
    const { user, loading } = useAuth();

    if (!user && !loading) router.push("/login");
    if (user) auhCheck(router, { emailVerified: user?.emailVerified })

    return (
        <>{children}</>
    )
}

/**
 * @param {import("next/router").NextRouter} router 
 */
function auhCheck(router, { emailVerified = false }) {

    const path = router.asPath.split('?')[0];
    const isThisPath = ifExist(path, loggedInUserPreventedPaths);
    const isVerifyPath = ifExist(path, preventVerifiedUser);

    if (isThisPath) {
        router.push('/')
    }
    if (!emailVerified && isVerifyPath) {
        router.push('/')
    }
}

/**
 * @param {string} path 
 * @param {Array} array 
 * @returns 
 */
function ifExist(path = "", array = []) {
    return array.some((element) => path.includes(element))
}