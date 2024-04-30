import Router from "@koa/router";
import Koa from "koa";
import { koaBody } from "koa-body";
import { game_controller } from "./v1/game.js";
import { home_controller } from "./v1/home.js";
import { player_controller } from "./v1/player.js";

const app = new Koa();
const router = new Router({
  prefix: "/api/v1"
});

router.use(home_controller.routes(), home_controller.allowedMethods());
router.use(game_controller.routes(), game_controller.allowedMethods());
router.use(player_controller.routes(), player_controller.allowedMethods());

const port = 3000;

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
