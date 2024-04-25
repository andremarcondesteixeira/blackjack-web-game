import { Player } from "../player.js";

// only meant to use when testing parameter validation, otherwise it would cost a significant overhead during test runs
export const garbage = [
  null,
  undefined,
  NaN,
  Infinity,
  true,
  false,
  () => { },
  function () { },
  function foo() { },
  class {},
  class Bar {},
  Date.now(),
  {},
  [],
  "",
  "    ",
  -998,
  -9998.009389
  +0,
  -0,
  0,
  0.000001,
  87288.9987,
  Number.MAX_VALUE,
  Number.MIN_VALUE,
  Number.NaN,
  Number.MAX_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER,
  Number.EPSILON,
  BigInt("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"),
];

export function serialize_garbage(garbage) {
  if (typeof garbage === "bigint") {
    return garbage.toString();
  }

  return JSON.stringify(garbage);
}

export function make_player({ name, balance }) {
  return new Player({ name, balance });
}
