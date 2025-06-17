import { useEffect, useState } from "preact/hooks";
import { Chars } from "../routes/chars.tsx";
import MostrarChars from "../components/MostrarChars.tsx";

type data = {
    charsOriginal: Chars[]
    cookieHouse: string
}

export default function ListaChars({charsOriginal, cookieHouse}:data) {
    const [chars, setChars] = useState<Chars[]>(charsOriginal)
    const [name, setName] = useState<string>("")
    const [house, setHouse] = useState<string>(cookieHouse || '')

    const filterName = (filtered: Chars[]): Chars[] => {
        if (!name) return filtered
        return  filtered.filter(char =>char.name.toLowerCase().includes(name))
    }
    const filterHouse = (filtered: Chars[]): Chars[] => {
        const date = new Date()
        if(!house){
            const expires = new Date(date.getTime()- 365 * 24 * 3600 * 1000).toUTCString()
            document.cookie = `house=${house};path=/;expires=${expires}`
            return filtered
        }        
        const expires = new Date(date.getTime()+ 365 * 24 * 3600 * 1000).toUTCString()
        document.cookie = `house=${house};path=/;expires=${expires}`
        return filtered = filtered.filter(char =>char.house === house)
    }

    useEffect(() => {
    let filtered = charsOriginal;
    filtered = filterName(filtered)
    filtered = filterHouse(filtered)

    setChars(filtered);
    }, [name, house]);

    return(
        <>
            <input type='text' placeholder='Search' value={name} onInput={(e)=>{setName(e.currentTarget.value.toLocaleLowerCase())}} />
            <select value={house} onChange={(e)=>{setHouse(e.currentTarget.value)}}>
                <option value="">All</option>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Slytherin">Slytherin</option>
                <option value="Ravenclaw">Ravenclaw</option>
                <option value="Hufflepuff">Hufflepuff</option>
            </select>
            {chars.map((e)=> (<li key={e.id}><MostrarChars char={e} /></li>))}
        </>
    )
}