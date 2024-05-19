"use client"

import AuctionCardList from "@/components/AuctionCardList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from 'react-modal';
import React, {useContext} from 'react';
import "../popup.css";
import { SupabaseContext } from "@/components/containerContext";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { groth16 } from "snarkjs";

export default function Page() {

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [auctionDuration, setAuctionDuration] = React.useState('');
    const [sellerAddress, setSellerAddress] = React.useState('');
    const supa = useContext(SupabaseContext);

    const snarkjs = window.snarkjs;

    const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eGJuZmlveXFsdXR5enB1d3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNDY2NDksImV4cCI6MjAzMTYyMjY0OX0.t9az5hyvrVY73oCA3aPtdHQsbzc4qZqzPtgWuz6GJbg"

    const [supabase, setSupabase] = useState();

    useEffect(() => {
        const supaba = createClient('https://yuxbnfioyqlutyzpuwqt.supabase.co', apikey)
        setSupabase(supaba);
    }, []);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setName('');
        setImageUrl('');
        setEndDate('');
        setAuctionDuration('');

        setIsPopupOpen(false);
    };

    const confirm = async () => {

        //make call to smart contract
        
        const { error } = await supabase
        .from('Auction')
        .insert({ id:1, created_at: Date.now() , name: name, imageUrl: imageUrl, endDate: Date.now()}).then(() => {
            closePopup();
        })

        console.log(error);
    };

    const prove = async () => { 
        const {proof, publicSignals} = await groth16.fullProve({ a: 10, b: 21 }, "highestbidder.wasm", "highestbidder_final.zkey")
        console.log({ proof, publicSignals });
    };


    return (
      <div>
        <Button onClick={openPopup}>Add Auction</Button>
        <Button onClick={prove}>Prove</Button>
        <AuctionCardList></AuctionCardList>
        <Modal isOpen={isPopupOpen} onRequestClose={closePopup} className={"popup"}>
                <h1>Add Auction</h1>
                <div>
                <Label htmlFor="Name">AuctionName:</Label>
                    <Input onChangeCapture={e => setName(e.currentTarget.value)} type="name" id="name" placeholder={"Name"} value={name} />

                    <br />

                    <Label htmlFor="ImageUrl">ImageUrl:</Label>
                    <Input onChangeCapture={e => setImageUrl(e.currentTarget.value)} type="imageUrl" id="imageUrl" placeholder={"ImageUrl"} value={imageUrl} />

                    <br />

                    <Label htmlFor="Duration">Duration:</Label>
                    <Input onChangeCapture={e => setAuctionDuration(e.currentTarget.value)} type="duration" id="duration" placeholder={"Duration in seconds"} value={auctionDuration} />
                    <br />

                    <Label htmlFor="SellerAddress">Seller Address:</Label>
                    <Input onChangeCapture={e => setSellerAddress(e.currentTarget.value)} type="SellerAddress" id="SellerAddress" placeholder={"Seller Address"} value={sellerAddress} />
                
                <Button onClick={closePopup}>Close</Button>
                <Button onClick={confirm}>Create Auction</Button>
                </div>
         </Modal>
      </div>
    );
  }
  