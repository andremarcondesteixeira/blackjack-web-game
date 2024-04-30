import Koa from "koa";

const app = new Koa();

app.use(async context => {
  context.body = "It works!";
});

app.listen(3000);
