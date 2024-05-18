import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import React, { useState} from 'react';
import { toast } from "sonner";

export default function AuctionCard({ title, url, address, yourAddress, contract}) {

    const [bidAmount, setBidAmount] = useState(0);

    const bid = () => {
        // Add zkSnark circuit here

        toast("Bid completed successfully", {
            type: "success",
            duration: 5000,
          })
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <img loading="lazy" src={url} alt={title}  />
            </CardContent>

            <CardContent>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Input onChangeCapture={e => setBidAmount(e.currentTarget.value)} type="bidAmount" id="bidAmount" placeholder={"Bid Amount"} value={bidAmount} />
                    <Button onClick={() => bid()}>Bid</Button>
                </div>
                
            </CardContent>

        </Card>
    )
}
