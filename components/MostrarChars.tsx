import { Chars } from "../routes/chars.tsx";

type data = {
    char: Chars
}

export default function MostrarChars ({char}:data) {
    return(
        <div class='charCard'>
            <a href={`${char.id}`}>
                <img src={char.image} alt={char.name} width={200} height={200}/>
                <h4>{char.name}</h4>
                <p>{char.house}</p>
            </a>
        </div>
    )
}