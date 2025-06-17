import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharsDetallado from "../islands/CharsDetallado.tsx";
import { Chars } from "./chars.tsx";

type data = {
    char: Chars
}

export const handler:Handlers<data> = {
    GET : async (_req: Request, ctx: FreshContext<unknown, data>) => {
        const {id} = ctx.params
        const response = await fetch(`https://hp-api.onrender.com/api/character/${id}`)
        const data:Chars[] = await response.json()
        return ctx.render({char:data[0]})
    }
}

export default function id(props: PageProps<data>) {
    return(
        <CharsDetallado char={props.data.char} />
    )
}