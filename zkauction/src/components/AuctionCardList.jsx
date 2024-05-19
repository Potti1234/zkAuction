"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import React, {useContext, useEffect, useState} from 'react';
import { SupabaseContext } from '@/components/containerContext';
import AuctionCard from "./AuctionCard";
import { createClient } from '@supabase/supabase-js'

export default function AuctionCardList() { 

    const supabase = useContext(SupabaseContext);
    const [data, setData] = useState([]);
    const [contract, setContract] = useState();

    useEffect(() => {
        const supa = createClient('https://yuxbnfioyqlutyzpuwqt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eGJuZmlveXFsdXR5enB1d3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNDY2NDksImV4cCI6MjAzMTYyMjY0OX0.t9az5hyvrVY73oCA3aPtdHQsbzc4qZqzPtgWuz6GJbg')

        const { d, err } = supa
        .from('Auction')
        .select().then((data => {       
            setData(data);
            console.log(data.data);

            setData([
                { title: "Example Title 1", url: "https://static.zara.net/photos///2024/V/0/2/p/4432/475/922/2/w/2048/4432475922_6_1_1.jpg?ts=1710489196217", endDate: "2022-01-01" },
                { title: "Example Title 2", url: "https://static.zara.net/photos///2024/V/0/2/p/0722/407/802/2/w/2048/0722407802_6_1_1.jpg?ts=1706778286656", endDate: "2022-02-01" },
                { title: "Example Title 3", url: "https://static.zara.net/photos///2024/V/0/2/p/9621/451/406/2/w/2048/9621451406_6_1_1.jpg?ts=1708614924346", endDate: "2022-03-01" }
            ]);
        }))
        
        }, [])

    return (
        <div>
            <ScrollArea className="h-screen w-full rounded-md border">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {data.map((item, index) => (
                        <div style={{ width: "25%" }}>
                            <AuctionCard
                                key={index}
                                title={item.title}
                                url={item.url}
                                endDate={item.end_date}
                            />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}