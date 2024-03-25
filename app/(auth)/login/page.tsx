import {Metadata} from 'next';
import React from 'react';
import ComponentsAuthLoginForm from "@/components/auth/components-auth-login-form";

export const metadata: Metadata = {
    title: 'Login',
};

const CoverLogin = () => {
    return (
        <>
            <ComponentsAuthLoginForm/>
        </>
    );
};

export default CoverLogin;
