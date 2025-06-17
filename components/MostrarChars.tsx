import { Chars } from "../routes/chars.tsx";

type data = {
    char: Chars
}

export default function MostrarChars ({char}:data) {
    return(
        <div>
            <a href={`${char.id}`}>
                <div>{char.name}</div>
                <div>{char.house}</div>                
                <img src={char.image} width={100}/>
                <br/><br/>
            </a>
        </div>
    )
}