import { useEffect, useState } from "preact/hooks";
import { Chars } from "../routes/chars.tsx";


type data = {
    favorites: Chars[]
}

export default function CharsFavs ({favorites}:data) {
    const [ids, setIds] = useState<string[]>([]);
    const [chars, setChars] = useState<Chars[]>([])

    const getFavsCookie = (): string[] => {
        const cookie = document.cookie
        if(cookie && cookie.includes('favs=')){
            const favs = cookie.split('favs=')[1].split(';')[0]
            console.log(favs.split(','))
            return favs.split(',')
        }else return []
    }

    const expiresNextYear = (): string => {
        const date = new Date();
        return new Date(date.getTime() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    };

    useEffect(() => {
        setIds(getFavsCookie());
    }, []);
    useEffect(() => {
        setChars(favorites.filter(char =>ids.includes(char.id)))
    }, [ids]);

    const handleRemoveFav = (charId: string) => {
        const favs = getFavsCookie();
        const newFavs = favs.filter((id) => id !== charId);
        document.cookie = `favs=${newFavs.join(",")};path=/;expires=${expiresNextYear()}`;
        setIds(newFavs);
    };

    return (
        <div>
        {favorites.length === 0 ? (
            <h2>No hay favoritos</h2>
        ) : (
            <ul>
            {chars.map((char) => (
                <li key={char.id}>
                <button type="button" onClick={() => handleRemoveFav(char.id)}>Remove from favs</button>
                <div>{char.name}</div>
                {char.house && <div>{char.house}</div>}
                <img src={char.image} width={100} alt={char.name} />
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}