import { Player } from "../player.js";

const default_garbage_config = Object.freeze({
  do_not_include_null: false,
  do_not_include_undefined: false,
  do_not_include_positive_numbers_except_zero: false,
  do_not_include_negative_numbers: false,
  do_not_include_zero: false,
  do_not_include_NaN: false,
  do_not_include_Infinity: false,
  do_not_include_true: false,
  do_not_include_false: false,
  do_not_include_empty_array: false,
  do_not_include_empty_object: false,
  do_not_include_empty_string: false,
  do_not_include_only_spaces_string: false,
  do_not_include_arrow_function: false,
  do_not_include_anonymous_function: false,
  do_not_include_named_function: false,
  do_not_include_anonymous_class: false,
  do_not_include_named_class: false,
  do_not_include_Date: false,
  do_not_include_BigInt: false,
});

// only meant to use when testing parameter validation, otherwise it would cost a significant overhead during test runs
export function create_garbage(params = { ...default_garbage_config }) {
  const config = {
    ...default_garbage_config,
    ...params,
  };
  const values = [];

  !config.do_not_include_null && values.push(null);
  !config.do_not_include_undefined && values.push(undefined);
  !config.do_not_include_positive_numbers_except_zero && values.push(1, 1.01, 1000, 1000.01, 100000000, 100000000.01, Number.MAX_VALUE, Number.MIN_VALUE, Number.MAX_SAFE_INTEGER, Number.EPSILON);
  !config.do_not_include_zero && values.push(+0, +0.0, -0, -0.0, 0, 0.0);
  !config.do_not_include_negative_numbers && values.push(-1, -1.01, -100, -100.01, -100000000, -100000000.01, Number.MIN_SAFE_INTEGER);
  !config.do_not_include_NaN && values.push(NaN, Number.NaN);
  !config.do_not_include_Infinity && values.push(Infinity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
  !config.do_not_include_true && values.push(true);
  !config.do_not_include_false && values.push(false);
  !config.do_not_include_empty_array && values.push([]);
  !config.do_not_include_empty_object && values.push({});
  !config.do_not_include_empty_string && values.push("");
  !config.do_not_include_only_spaces_string && values.push("   ");
  !config.do_not_include_arrow_function && values.push(() => { });
  !config.do_not_include_anonymous_function && values.push(function () { });
  !config.do_not_include_named_function && values.push(function foo() { });
  !config.do_not_include_anonymous_class && values.push(class { });
  !config.do_not_include_named_class && values.push(class Bar { });
  !config.do_not_include_Date && values.push(new Date());
  !config.do_not_include_BigInt && values.push(BigInt("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"));

  return values;
}

export function make_player(override_properties) {
  return new Player({
    name: "Player",
    balance: 0,
    ...override_properties
  });
}
