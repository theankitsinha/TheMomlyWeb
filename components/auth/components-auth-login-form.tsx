'use client';
import React, {ChangeEvent, useState} from 'react';
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {CiLock, CiMail} from "react-icons/ci";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {FcGoogle} from "react-icons/fc";
import {FaApple} from "react-icons/fa6";
import {PiSpinnerThin} from "react-icons/pi";

export default function ComponentsAuthLoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const callbackUrl = searchParams!.get("callbackUrl") || "/";
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({email: "", password: ""});

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });
            if (res?.error) {
                const errorJson = JSON.parse(res!.error);
                setError(errorJson.errors);
            }
            setLoading(false);
            if (!res?.error) {
                router.push(callbackUrl);
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    };

    return (
        <>
            <div className={cn("grid gap-6")}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative text-white-dark pt-2">
                                <Input id="Email" type="email" placeholder="Enter Email"
                                       name="email"
                                       value={formValues.email}
                                       onChange={handleChange}
                                       className=" ps-10"/>
                                <span className="absolute start-4 top-2/3  -translate-y-1/2">
                                    <CiMail/>
                                </span>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="Password">Password</Label>
                            <div className="relative text-white-dark pt-2">
                                <Input id="Password" type="password" placeholder="Enter Password"
                                       name="password"
                                       value={formValues.password}
                                       onChange={handleChange}
                                       className=" ps-10"/>
                                <span className="absolute start-4 top-2/3 -translate-y-1/2">
                        <CiLock/>
                    </span>
                            </div>
                        </div>
                        {error && (
                            <>
                                <div
                                    className="flex items-center p-3.5 rounded text-red-600">
                                    {error}
                                </div>
                            </>
                        )}
                        <Button disabled={loading}>
                            {loading && (
                                <PiSpinnerThin className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                    <Button className="w-full" variant="outline" type="button" disabled={loading}>
                        {loading ? (
                            <PiSpinnerThin className="mr-2 h-4 w-4 animate-spin"/>
                        ) : (
                            <FcGoogle className="mr-2 h-4 w-4"/>
                        )}
                        Google
                    </Button>
                    <Button className="w-full" variant="outline" type="button" disabled={loading}>
                        {loading ? (
                            <PiSpinnerThin className="mr-2 h-4 w-4 animate-spin"/>
                        ) : (
                            <FaApple className="mr-2 h-4 w-4"/>
                        )}
                        Apple
                    </Button>
                </div>
                <div className="w-full flex justify-center">
                    <p className="w-[80%] md:w-[60%] text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="https://themomly.com/terms-and-conditions"
                            target="_blank"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="https://themomly.com/privacy-policy"
                            target="_blank"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>

                </div>
            </div>

        </>
    );
};
