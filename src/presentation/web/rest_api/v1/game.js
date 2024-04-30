import Router from "@koa/router";
import { start_new_round } from "../../../../core/domain/use_cases/start_new_round.js";

export const game_controller = new Router({
  prefix: "/game"
});

game_controller.post("start new round", "/", context => {
  context.body = start_new_round();
});
