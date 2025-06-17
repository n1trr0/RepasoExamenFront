import { useEffect, useState } from "preact/hooks";
import { Chars } from "../routes/chars.tsx";


type data = {
    char: Chars
}

export default function CharsDetallado ({char}:data) {
    const [fav, setFav] = useState<boolean>(false)

    const getFavsCookie = (): string[] => {
        const cookie = document.cookie
        if(cookie && cookie.includes('favs=')){
            const favs = cookie.split('favs=')[1].split(';')[0]
            console.log(favs)
            return favs.split(',')
        }else return []
    }
    const expiresNextYear = (): string => {
        const date = new Date()
        return new Date(date.getTime()+ 365 * 24 * 3600 * 1000).toUTCString()
    }
    const deleteCookie = (): string => {
        const date = new Date()
        return new Date(date.getTime()- 365 * 24 * 3600 * 1000).toUTCString()
    }

    const handleAddFav = () => {
        setFav(true)
        const favs = getFavsCookie()
        favs.push(char.id)
        const expires = expiresNextYear()
        document.cookie = `favs=${favs.join(',')};path=/;expires=${expires}`
    };
    const handleRemoveFav = () => {
        setFav(false)
        const favs = getFavsCookie()
        const newFavs = favs.filter(id => id !== char.id.toString());
        if(newFavs.length === 0){
            document.cookie = `favs=${newFavs.join(',')};path=/;expires=${deleteCookie()}`
            return
        }
        document.cookie = `favs=${newFavs.join(',')};path=/;expires=${expiresNextYear()}`
    }
    useEffect(()=>{
        const favs = getFavsCookie();
        setFav(favs.includes(char.id));
    })


    return(
        <div>
            {!fav && <button type='button' onClick={handleAddFav}>Add to favs</button>}
            {fav && <button type='button' onClick={handleRemoveFav}>Remove from favs</button>}
            <div>{char.name}</div>
            <div>{char.house != '' && char.house}</div>            
            <img src={char.image} width={100}/>
            <br/>
        </div>
    )
}