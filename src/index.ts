// @ts-expect-error
import { redirects, prefix } from "../redirects.yml";

const redirectPrefix: string = prefix || "/r/";
const redirectsTyped = redirects as Record<string, string>;

const redirectsPrefixed: [string, string][] = Object.entries(
    redirectsTyped,
).map(([route, redirect]) => [`${redirectPrefix}${route}`, redirect]);

const redirectMap: Map<string, string> = new Map(redirectsPrefixed);

async function handleRequest(req: Request): Promise<Response> {
    console.log(redirects);
    console.log(redirectMap);

    const path = new URL(req.url).pathname;
    const location = redirectMap.get(path);

    if (location) {
        return Response.redirect(location, 308);
    } else {
        return new Response("Not Found", {
            status: 404,
            statusText: "Not Found",
        });
    }
}

addEventListener("fetch", async (event) => {
    event.respondWith(handleRequest(event.request));
});
