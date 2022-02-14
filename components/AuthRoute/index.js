import { useAuth } from "@/firebase/context";
import Loading from "@/icons/Loading";
import { useRouter } from "next/router";

const noGuestEntry = ['/account', '/verify'];
const noUserEntry = ['/login', '/forgot-password', '/verify'];
const nVU = ['/verify'];

export default function AuthRoute({ children }) {
    const router = useRouter();
    const authData = useAuth()

    const path = router.asPath.split('?')[0];
    function isInRoute(arrayOfRoute = []) {
        return arrayOfRoute.some((route) => path.includes(route))
    }
    // Check if current user data loaded
    if (!authData.loading) {
        // If no current user and going to account page
        if (!authData.user && isInRoute(noGuestEntry)) {
            //then redirect them to login page
            router.push('/login');
        }
        // If current user exist and going to no user entry routes
        else if (authData.user && isInRoute(noUserEntry)) {
            //then redirect them to main page
            router.push('/');
        }
        // If current user has verified his/her email and going to '/verify' routes
        else if ( authData.user?.emailVerified && isInRoute(nVU)) {
            //then redirect them to main page
            router.push('/');
        }
    }

    return (
        <>
            {
                isInRoute([...noGuestEntry, ...noUserEntry, ...nVU]) && authData.loading ?

                    <div style={{ textAlign: "center", margin: "0 auto" }}>
                        <Loading size="50px" />
                    </div>
                    :
                    children
            }
        </>)

}
