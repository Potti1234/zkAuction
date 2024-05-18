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

export default function Page() {

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
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
        setEndTime('');

        setIsPopupOpen(false);
    };

    const confirm = () => {
        const { error } = supabase
        .from('Auction?apikey='+apikey)
        .insert({ created_at: Date.now() , name: name, imageUrl: imageUrl, endDate: Date.now()}).then(() => {
            console.log(error);
            closePopup();
        })

    };

    const prove = async () => { 
        const {proof, publicSignals} = await snarkjs.groth16.fullProve({ a: 11, b: 3 }, "circuit.wasm", "circuit.zkey")
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

                    <Label htmlFor="EndDate">AuctionEndDate:</Label>
                    <Input onChangeCapture={e => setEndDate(e.currentTarget.value)} type="endDate" id="endDate" placeholder={"endDate"} value={endDate} />

                    <br />

                    <Label htmlFor="EndTime">AuctionEndTime:</Label>
                    <Input onChangeCapture={e => setEndTime(e.currentTarget.value)} type="endTime" id="endTime" placeholder={"EndTime in format HH:MM:SS"} value={endTime} />

                
                <Button onClick={closePopup}>Close</Button>
                <Button onClick={confirm}>Create Auction</Button>
                </div>
         </Modal>
      </div>
    );
  }
  