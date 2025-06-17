import { FreshContext } from "$fresh/server.ts";

type State = {
    favs: string
}

export async function handler(req: Request, ctx: FreshContext<State>,) {
    const cookie = req.headers.get("Cookie");
    if(cookie && cookie.includes('session=')){
        if(cookie.includes('favs=')){
            const favs = cookie.split('favs=')[1].split('; ')[0]
            ctx.state.favs = favs
            const resp = await ctx.next()
            return resp
        }
        return new Response("", {
        status: 303,
        headers: { Location: "/chars" }})        
    }
    return new Response("", {
    status: 303,
    headers: { Location: "/" }})
}