import Router from "@koa/router";

export const home_controller = new Router();

home_controller.get("home", "/", context => {
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
