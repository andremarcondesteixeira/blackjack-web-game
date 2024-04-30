import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

router.get("/", context => {
  context.body = "It works!";
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
