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

type APIRoute = {
    img: RouteFunction;
    serve: RouteFunction;
    select: RouteFunction;
    src: RouteFunction;
};

const routes: APIRoute = {
    img: img.route,
    serve: serve.route,
    select: select.route,
    src: src.route,
};

app.get("/" satisfies PossibleRoute, routes["serve"]);
app.get("/serve" satisfies PossibleRoute, routes["serve"]);
app.get("/img" satisfies PossibleRoute, routes["img"]);
app.get("/select" satisfies PossibleRoute, routes["select"]);
app.get("/src" satisfies PossibleRoute, routes["select"]);

app.listen(port, (): void => {
    console.log(`Application is being hosted on port :${port}`);
});
