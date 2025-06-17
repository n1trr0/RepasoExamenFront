import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharsFavs from "../../islands/CharFavs.tsx";
import { Chars } from "../chars.tsx";

type data = {
    chars: Chars[]
}

type State = {
    favs: string
}

export const handler:Handlers<data, State> = {
    GET: async (_req: Request, ctx: FreshContext<State, data>) => {
        const _favs = ctx.state.favs
        const response = await fetch('https://hp-api.onrender.com/api/characters')
        const chars: Chars[] = await response.json()
        return ctx.render({chars})
    }
}

export default function Favs(props: PageProps<data>) {
    return(
        <CharsFavs favorites={props.data.chars} />
    )
}