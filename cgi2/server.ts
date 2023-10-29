import * as express from "express";

import { IncomingMessage, ServerResponse } from "http";

const app: express.Application = express();

// @ts-ignore
const filename: string = "index";
const port: number = 8091;

import * as img from "./img";
import * as select from "./select";
import * as serve from "./serve";
import * as src from "./src";

type PossibleRoute = "/img" | "/serve" | "/select" | "/src" | "/";

type RouteFunction = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
) => ServerResponse<IncomingMessage>;

type Route = {
    route: RouteFunction;
};

type APIRoute = {
    img: Route;
    serve: Route;
    select: Route;
    src: Route;
};

const routes: APIRoute = {
    img: img,
    serve: serve,
    select: select,
    src: src,
};

app.get("/" satisfies PossibleRoute, routes["serve"].route);
app.get("/serve" satisfies PossibleRoute, routes["serve"].route);
app.get("/img" satisfies PossibleRoute, routes["img"].route);
app.get("/select" satisfies PossibleRoute, routes["select"].route);
app.get("/src" satisfies PossibleRoute, routes["select"].route);

app.listen(port, (): void => {
    console.log(`Application is being hosted on port :${port}`);
});
