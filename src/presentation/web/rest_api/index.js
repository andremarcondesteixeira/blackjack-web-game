import Router from "@koa/router";
import Koa from "koa";
import { koaBody } from "koa-body";
import { create_new_player } from "../../../core/domain/use_cases/create_new_player.js";
import { start_new_round } from "../../../core/domain/use_cases/start_new_round.js";

const app = new Koa();
const router = new Router();

router.get("/", context => {
  context.body = {
    links: {
      start_new_round: {
        method: "post",
        url: "/api/v1/game",
      },
      create_new_player: {
        method: "post",
        url: "/api/v1/player"
      }
    }
  }
});

router.post("/api/v1/game", context => {
  context.body = start_new_round();
});

router.post("/api/v1/player", context => {
  context.body = JSON.stringify(context.request.body, null, 4);
  //context.body = create_new_player();
});

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
