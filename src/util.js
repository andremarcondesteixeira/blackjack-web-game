export function is_an_actual_number(x) {
  return typeof x === "number" && !Number.isNaN(x) && Number.isFinite(x);
}

/**
 * Usage: pass in a function, or object, like:
 *
 * name_of(my_function);
 * name_of({ my_variable }); // enclosed by curly brackets
 *
 * @param {Function | object} x
 * @returns the name of the variable, function, object or class
 */
export function name_of(x) {
  if (!['function', 'object'].includes(typeof x) || x instanceof Array) {
    throw new Error(`name_of expects to get a function or object. Got ${serialize(x)} instead.`);
  }

  return x.name ?? x.constructor.name ?? Object.keys(x)[0];
}

export function serialize(x) {
  if (typeof x === "bigint") {
    return x.toString();
  }

  if (Number.isNaN(x)) {
    return "NaN";
  }

  if (typeof x === 'number' && !Number.isFinite(x)) {
    if (x === Number.NEGATIVE_INFINITY) {
      return "Number.NEGATIVE_INFINITY";
    }

    return "Infinity or Number.POSITIVE_INFINITY";
  }

  if (x instanceof Date) {
    return x.toUTCString();
  }

  return JSON.stringify(x);
}
