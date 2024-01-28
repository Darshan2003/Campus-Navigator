import React, {useState} from 'react'
import Dropdown from './Dropdown'
import { FaDirections } from "react-icons/fa";
import './index.css'

export default function UI({ startDropdownParams, targetDropdownParams, findShortestPath }) {
    const [isPathChanged, setIsPathChanged] = useState(-1);
    return (
        <div className='absolute z-30 w-full flex justify-center'>
            <div className='w-0 h-0
                border-t-[7px] border-t-black
                border-r-[100px] border-r-black
                border-b-[50px] border-b-transparent
                border-l-[50px] border-l-transparent 
                opacity-60
                '>
            </div>
            <div className='w-fit flex justify-center h-14 bg-black items-center bg-opacity-60'>
                <Dropdown {...startDropdownParams} setIsPathChanged={setIsPathChanged} classes={'mx-2'} />
                <p className='text-white font-bold'>to</p>
                <Dropdown {...targetDropdownParams} setIsPathChanged={setIsPathChanged} classes={'mx-2'} />
                <button onClick={() =>{ 
                    findShortestPath();
                    setIsPathChanged(0);
                    }} className={'m-1'+((isPathChanged==1 && startDropdownParams.label!='Start' && targetDropdownParams.label!='Target')?' glow':'')}>
                    <FaDirections  color={(isPathChanged==1 && startDropdownParams.label!='Start' && targetDropdownParams.label!='Target') ? 'yellow' : 'white'} size={25}/>
                </button>
            </div>
            <div className='w-0 h-0 opacity-60
                border-t-[7px] border-t-black
                border-l-[100px] border-l-black
                border-b-[50px] border-b-transparent
                border-r-[50px] border-r-transparent
                '>
            </div>
        </div>
    )
}
