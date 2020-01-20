export function cached(fn: Function) {
  const cache = Object.create(null);
  return function(str: string) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }
}

const camelizeRE = /-(\w)/g;
export const camelize = cached((str: string):string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
});

export const capitalize = cached((str: string):string => {
  return str.charAt(0).toUpperCase() + str.substr(1);
});

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached((str: string):string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
