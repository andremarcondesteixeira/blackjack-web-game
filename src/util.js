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

export function name_of(x) {
  return Object.keys({ x })[0];
}
