"use client"

import Header from '@/components/header'
import React, {useState, useEffect} from 'react';
import { AccountContext, SupabaseContext } from "./containerContext"
import { createClient } from '@supabase/supabase-js'

export default function Container({ children}) {
    const [account, setAccount] = useState("");
    const [supabase, setSupabase] = useState();

    useEffect(() => {
        const supa = createClient('https://yuxbnfioyqlutyzpuwqt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eGJuZmlveXFsdXR5enB1d3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNDY2NDksImV4cCI6MjAzMTYyMjY0OX0.t9az5hyvrVY73oCA3aPtdHQsbzc4qZqzPtgWuz6GJbg')
        setSupabase(supa);
    }, []);


    return (
        <div>
            <AccountContext.Provider value={account}>
            <SupabaseContext.Provider value={supabase}>
            <Header setAddressCallback={() => setAccount}></Header>
            {children}
            </SupabaseContext.Provider>
            </AccountContext.Provider>
        </div>
    )
}
