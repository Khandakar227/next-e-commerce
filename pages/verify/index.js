import { useRouter } from "next/router";
import SvgArt from '@/public/mail_re_duel.svg';
import Image from "next/image";
import styles from "./verify.module.css";
import { useAuth } from "@/firebase/context";
import Skeleton from "react-loading-skeleton";

export default function Verify() {
    const { user, loading } = useAuth()

    const resend = () => {

    }
    if ((!user && loading) || user) {
        return (
            <>
                <div className={styles.container}>
                    <h2><Skeleton width={300} /></h2>
                    <Skeleton height="1px" />

                    <div className={styles.main}>
                        <div>
                            <Skeleton height={300} width={320} />
                            <h3 className={styles.h3}><Skeleton /></h3>
                            <p><Skeleton height="5rem" width="100%" /></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className={styles.container}>
            <h2>Almost done!</h2>
            <hr />
            <div className={styles.main}>
                <div>
                    <Image src={SvgArt} alt="Email verification" height={300} width={320} />
                    <h3 className={styles.h3}>Verify your email address</h3>
                    <p>
                        A verification link was sent to your email account. Please check your
                        inbox to verify.
                    </p>
                    <div>
                        <p>
                            Didn't receive an email? &nbsp; <button
                                className={styles.button}
                                onClick={resend}
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}