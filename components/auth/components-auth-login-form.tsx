'use client';
import React, {ChangeEvent, useState} from 'react';
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {CiLock, CiMail} from "react-icons/ci";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

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
        <form className="space-y-5 dark:text-white" onSubmit={onSubmit}>
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
            <Button variant="default" size="lg" className="w-full">
                Sign in
            </Button>
        </form>
    );
};
