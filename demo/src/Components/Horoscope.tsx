
import React, { useState } from 'react';
import axios from 'axios';

// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import TextBox from './TextBox';
type Horoscope = {
    horoscope: string[]
} | null
function Horoscope() {
    const [sun, setSun] =  useState<string>("")
    const [moon, setMoon] = useState<string>("")
    const [rising, setRising] = useState<string>("")
    const [horoscope, setHoroscope] = useState<Horoscope>(null)
    async function requestHoroscope(sun: string, moon: string, rising: string): Promise<void> {
        type HoroscopeRequestBody = {
            sun: string,
            moon: string,
            rising: string
        }

        const body : HoroscopeRequestBody = { sun, moon, rising }

        try {
            const res = await axios.post("http://localhost:4567/horoscope", body)
            setHoroscope(res.data)
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div>
            <header>
                Horoscope
            </header>
            <div id="selection">
                <TextBox label={"Sun Sign"} name={"sun"} change={setSun} />
                <TextBox label={"Moon Sign"} name={"moon"} change={setMoon}/>
                <TextBox label={"Rising Sign"} name={"rising"} change={setRising} />
            </div>
            <AwesomeButton
                type="primary"
                onPress={ () => requestHoroscope(sun, moon, rising) }>
                Get Horoscope
            </AwesomeButton>
            <div id="horoscope">
                { horoscope == null ?
                    "":
                    horoscope.horoscope.map((attr: string) => <p>{attr}</p>)}
            </div>
        </div>
    );
}

export default Horoscope;
