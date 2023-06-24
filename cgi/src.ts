import * as url from "url";
import * as fs from "fs";
import * as http from "http";

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";
import { findPath } from "./modules/findPath";
import { getDynLink } from "./modules/dynamicLinkGetter";
import { getPort } from "./modules/portServer";
import { getExt } from "./modules/getExtSelect";

const filename = "src";
const port = getPort(filename);

const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(
  (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown): ServerResponse<IncomingMessage> => {
      res.write(data);
      return res.end();
    };
    try {
      if (req.url) {
        const url_info: ParsedUrlQuery = url.parse(req.url, true).query;
        const reqsModule = 'type' in url_info && (url_info.type == 'jQuery' || url_info.type == 'Bootstrap');
        const fpath: fs.PathLike = findPath(reqsModule ? ["public", "lib"] : ["public"], (reqsModule ? url_info.type + "." : "app.") + getExt(url_info));
        const data: string = fs.existsSync(fpath)
          ? String(
            fs
              .readFileSync(fpath, "utf-8")
              .replace(/@dynamiclink/g, getDynLink(filename))
          )
          : "";
        return w(data);
      }
    } catch (e) {
      console.log(e);
      res.write("");
      return res.end();
    }
  }
);

server.listen(port, () => {
  console.log("Server is running on http://localhost:" + port + "/");
});