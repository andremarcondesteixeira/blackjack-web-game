import Router from "@koa/router";
import { create_new_player } from "../../../../core/domain/use_cases/create_new_player.js";

export const player_controller = new Router({
  prefix: "/player"
});

player_controller.post("create new player", "/", context => {
  context.body = create_new_player();
});
