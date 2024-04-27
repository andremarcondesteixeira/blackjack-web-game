import { Player } from "./domain/player.js";

const default_garbage_config = Object.freeze({
  use_null: true,
  use_undefined: true,
  use_positive_numbers_except_zero: true,
  use_negative_numbers: true,
  use_zero: true,
  use_NaN: true,
  use_Infinity: true,
  use_true: true,
  use_false: true,
  use_empty_array: true,
  use_empty_object: true,
  use_empty_string: true,
  use_only_spaces_string: true,
  use_random_string: true,
  use_arrow_function: true,
  use_anonymous_function: true,
  use_named_function: true,
  use_anonymous_class: true,
  use_named_class: true,
  use_Date: true,
  use_BigInt: true,
});

// only meant to use when testing parameter validation, otherwise it would cost a significant overhead during test runs
export function make_garbage(params = { ...default_garbage_config }) {
  const config = {
    ...default_garbage_config,
    ...params,
  };
  const values = [];

  config.use_null && values.push(null);
  config.use_undefined && values.push(undefined);
  config.use_positive_numbers_except_zero && values.push(...(
    typeof config.use_positive_numbers_except_zero === 'array' ?
      config.use_positive_numbers_except_zero :
      [1, 1.01, 1000, 1000.01, 100000000, 100000000.01, Number.MAX_VALUE, Number.MIN_VALUE, Number.MAX_SAFE_INTEGER, Number.EPSILON]
  ));
  config.use_zero && values.push(+0, +0.0, -0, -0.0, 0, 0.0);
  config.use_negative_numbers && values.push(-1, -1.01, -100, -100.01, -100000000, -100000000.01, Number.MIN_SAFE_INTEGER);
  config.use_NaN && values.push(NaN, Number.NaN);
  config.use_Infinity && values.push(Infinity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
  config.use_true && values.push(true);
  config.use_false && values.push(false);
  config.use_empty_array && values.push([]);
  config.use_empty_object && values.push({});
  config.use_empty_string && values.push("");
  config.use_only_spaces_string && values.push("   ");
  config.use_random_string && values.push("---------------------------------------------------------------------------------------------------------------------------"),
  config.use_arrow_function && values.push(() => { });
  config.use_anonymous_function && values.push(function () { });
  config.use_named_function && values.push(function foo() { });
  config.use_anonymous_class && values.push(class { });
  config.use_named_class && values.push(class Bar { });
  config.use_Date && values.push(new Date());
  config.use_BigInt && values.push(BigInt("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"));

  return values;
}

export function make_player(override_properties) {
  return new Player({
    name: "Player",
    balance: 0,
    ...override_properties
  });
}
