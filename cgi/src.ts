import * as url from "url";
import * as fs from "fs";
import * as syntax from "./extensions/syntax";
import * as dynamicLinkGetter from "./modules/dynamicLinkGetter";
import * as portServer from "./modules/portServer";
import * as getExtSelect from "./modules/getExtSelect";
import * as http from "http";
import * as fp from "./modules/findPath";

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";
const { findPath } = fp;
const { stringify } = syntax;
const { getDynLink } = dynamicLinkGetter;
const { getPort } = portServer;
const { getExt } = getExtSelect;

const filename = "src";
const port = getPort(filename);

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    const w: Function = (data: unknown): ServerResponse<IncomingMessage> => {
      res.write(data);
      return res.end();
    };
    try {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
      if (req.url) {
        const url_info: ParsedUrlQuery = url.parse(req.url, true).query;
        const fpath: fs.PathLike = findPath(["public"], "app." + getExt(url_info));
        const data: string = fs.existsSync(fpath)
          ? stringify(
            fs
              .readFileSync(fpath, "utf-8")
              .replace(/@dynamic_link/g, getDynLink(filename))
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