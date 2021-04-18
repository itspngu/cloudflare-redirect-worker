const redirectMap = new Map([
    ["/r/something", "https://github.com/itspngu/cloudflare-redirect-worker"],
    ["/r/copr", "https://copr.fedorainfracloud.org/coprs/itspngu/"],
]);

async function handleRequest(req: Request): Promise<Response> {
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
