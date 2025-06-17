import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import ListaChars from "../islands/ListaChars.tsx";

export type Chars = {
    id: string,
    name: string,
    gender: string,
    house: string,
    image: string
}

type data = {
    chars: Chars[]
    cookieHouse: string
}
export const handler:Handlers<data> = {
    GET :async (req: Request, ctx:FreshContext<unknown, data>) => {   
        const cookie = req.headers.get("Cookie")
        let cookieHouse = ''
        if (cookie && cookie.includes('house=')) {cookieHouse = cookie?.split('house=')[1].split(';')[0]}
        
        const response = await fetch('https://hp-api.onrender.com/api/characters')
        const chars: Chars[] = await response.json()

        return ctx.render({chars, cookieHouse})
    }
}

export default function Chars(props: PageProps<data>){
    return(
        <ListaChars charsOriginal={props.data.chars} cookieHouse={props.data.cookieHouse} />
    )
}