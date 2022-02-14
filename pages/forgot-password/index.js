import { useState } from "react";
import style from "./fp.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@/components/Input";
import Button from "@/components/Button";

const schema = yup.object().shape({
    email: yup.string().email().required("* Email is required.")
});

export default function ForgotPassword() {
    const [fpError, setfpError] = useState();

    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        nProgress.start()
        emailLogin({ email: data.email })
            .catch((e) => {
                setfpError(e.message);
                nProgress.done();
            });
        nProgress.done();
    };

    return (
        <div className={style.container}>
            <div>
                <h1> Forgot your password? </h1>
                <p> Change your password in three easy steps. This will help you secure your password. </p>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <Input
                    name="email"
                    register={register}
                    placeholder="E-mail"
                    error={errors?.email}
                />
                {errors && errors?.email && (
                    <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                        {errors.email.message}
                    </span>
                )}
                <Button type="submit">SEND PASSWORD RESET LINK</Button>
                {fpError && (
                    <span
                        style={{
                            color: "red",
                            marginTop: -10,
                            fontSize: 14,
                            marginBottom: 10,
                        }}
                    >
                        {fpError}
                    </span>
                )}
            </form>
        </div>
    )
}
