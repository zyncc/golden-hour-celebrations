"use client"

import React, {useRef} from 'react';
import { IoClose } from "react-icons/io5";

const Marquee = () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div ref={ref} className={'fixed z-[100] flex bottom-0 left-0 right-0 w-full p-0.5 items-center text-black font-medium bg-yellow-500 text-center'}>
            <h1 className={'flex-grow'}>Website under Progress</h1>
            <IoClose size={20} onClick={() => {
                if (ref.current) {
                ref.current.style.display = 'none';
                }
            }}/>
        </div>
    );
};

export default Marquee;