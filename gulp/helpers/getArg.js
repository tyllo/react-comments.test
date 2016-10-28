export default function getArg(key) {
  const index = process.argv.indexOf(key);
  const next = process.argv[index + 1];

  let result;
  if (index < 0) {
    result = null;
  } else {
    result = (!next || next[0] === '-') ? true : next;
  }
  return result;
}

export const isProduction = getArg('--prod') || getArg('--production') || getArg('build') || false;
export const isDevelopment = !isProduction;
export const isDebug = getArg('--debug') || isDevelopment || false;
