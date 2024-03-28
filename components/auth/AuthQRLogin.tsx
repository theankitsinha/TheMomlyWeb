'use client';
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useSocket} from "@/components/SocketProvider";
import {getQrDataHash} from "@/lib/encryption";
import QRCode from "qrcode";
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {v4 as uuidv4} from "uuid";
import {cn} from "@/lib/utils";

export default function AuthQRLogin() {

    const [isLoading, setLoading] = useState(false);
    const [qrCode, setQRCode] = useState<string>();
    const {isConnected, socket} = useSocket();
    const router = useRouter();

    const searchParams = useSearchParams();
    const callbackUrl = searchParams!.get("callbackUrl") || "/";
    const getQRCode = async () => {
        try {
            const channelDataHash = getQrDataHash();
            const url = QRCode.toDataURL(channelDataHash, {
                margin: 1,
                type: 'image/webp',
                width: 600,
                errorCorrectionLevel: 'H',
                color: {dark: "#0e1726", light: "#fff"}
            });
            setQRCode(await url);
            return channelDataHash
        } catch (e) {
            console.log(e)
        }
        return null
    }
    const handleLogin = async (userId: String) => {
        const res = await signIn("credentials", {
            redirect: false,
            token: '0c6b5ca98-ca9' + userId + 'wfO-0' + uuidv4(),
            email: 'HeyThere?NoPointLookingAtThese@dfd36b142877a5cd82d407869a28963d.com',
            password: '',
            callbackUrl,
        });
        if (res?.error) {
            const errorJson = JSON.parse(res!.error);
            console.log(errorJson.errors);
        }
        setLoading(false);
        if (!res?.error) {
            router.push(callbackUrl);
        }
        return null;
    }
    const showQrCode = () => {
        getQRCode().then((res) => {
            if (res && isConnected) {
                socket.on(res, (msg: any) => {
                    setLoading(true);
                    handleLogin(msg.userId);
                });
            }
        })
    }
    useEffect(() => {
        setLoading(true);
        showQrCode();
        setInterval(() => {
            setLoading(true);
            showQrCode();
            setLoading(false)
        }, 30000);
        setLoading(false)
    }, [isConnected])
    return (
        <>
            <div className=
                     {cn("rounded-2xl bg-white border border-dashed p-3 mb-2",
                         isConnected ? 'border-green-700' : 'border-red-700'
                     )}>
                <Image src={(qrCode && !isLoading) ? qrCode : "/assets/onlyLogo.svg"} width={100} height={100}
                       alt={qrCode ?? 'momly-'}
                       priority
                       className="h-30 w-30 md:h-52 md:w-52"/>

            </div>
            <span className="font-semibold">Log in with QR Code
                <span className={cn(isConnected ? 'text-green-600' : 'text-red-600')}> ●</span>
            </span>
            <div className="text-base text-center"
            >Scan this with the <strong className="text-primary">Momly Mobile
                app</strong> to log in instantly.
            </div>

        </>
    );
};
