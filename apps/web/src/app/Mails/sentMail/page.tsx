import React from 'react'
import { useEffect } from 'react'
import cleanLocalDB from '../../../lib/Local_Indexed_DB/cleanLocal_DB'
export default function sentMail() {
    useEffect(() => {
        let isCleaning = false;

        const interval = setInterval(async () => {
            if (isCleaning) return;
            isCleaning = true;

            try {
                await cleanLocalDB();
            } finally {
                isCleaning = false;
            }
        }, 180000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex-1 flex flex-col w-full h-screen bg-white'>

        </div>
    )
}
