"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import React, {useContext, useEffect, useState} from 'react';
import { AccountContext } from "./containerContext"
import { SupabaseContext } from '@/components/containerContext';
import AuctionCard from "./AuctionCard";

export default function AuctionCardList() { 

    const supabase = useContext(SupabaseContext);
    const [data, setData] = useState([]);
    const [contract, setContract] = useState();

    useEffect(() => {
        //Load data from supabase
        
        }, [])

    return (
        <div>
            <ScrollArea className="h-screen w-full rounded-md border">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {data.map((item, index) => (
                        <div style={{ width: "25%" }}>
                            <AuctionCard
                                key={index}
                                title={index.toString()}
                                url={item.url}
                                address={item.owner.toLowerCase()}
                                yourAddress={useContext(AccountContext)}
                                contract={contract}
                            />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}