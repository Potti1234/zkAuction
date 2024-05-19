import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import React, { useState, useContext} from 'react';
import { toast } from "sonner";
import { AccountContext } from "./containerContext";

export default function AuctionCard({ title, url, endDate, sellerAddress}) {

    const [bidAmount, setBidAmount] = useState(0);
    const account = useContext(AccountContext);

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
                <Label>End Date: {endDate}</Label>
            </CardContent>
            <CardContent>
                <Label>Seller Address: {sellerAddress}</Label>
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
