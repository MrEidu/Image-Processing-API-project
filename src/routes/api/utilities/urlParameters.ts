//Checks if the input is undefined to ignore later, or a valid number
//if fails, sends an error
function paramToInt(size: string | null, param: string) {
  if (size === null) {
    return undefined;
  } else {
    const value = parseInt(size);
    if (isNaN(value)) {
      throw new Error(
        `${param} is not a number! To set it to automatic or original size delete "${param}=${size}" of the URL, otherwise change the value to a real positive number.`
      );
    }
    if ((value as number) <= 0) {
      throw new Error(`${param} cannot be zero or a negative number.`);
    }
    return value;
  }
}
//this function may be self explanatory
function hasValidFormat(name: string) {
  // JPEG, PNG, WebP, GIF and AVIF

  const format = name.toLowerCase();
  if (format.endsWith(".jpg")) return true;
  if (format.endsWith(".png")) return true;
  if (format.endsWith(".gif")) return true;
  if (format.endsWith(".jpeg")) return true;
  if (format.endsWith(".webp")) return true;
  if (format.endsWith(".avif")) return true;
  throw new Error(
    `${name} has no valid format. Supported formats are JPG, JPEG, PNG, GIF, WebP and AVIF.`
  );
}
function hasNoSpecialCharacters(name: string) {
  const err = new Error(`${name} cannot contain: / : * ? " < > |`);
  if (name.search("/") != -1) throw err;
  if (name.search(":") != -1) throw err;
  //if (name.search("*") != -1) throw err;
  //if (name.search("?") != -1) throw err;
  if (name.search("<") != -1) throw err;
  if (name.search(">") != -1) throw err;
  //if (name.search("|") != -1) throw err;
  if (name.search(`"`) != -1) throw err;

  return true;
}
//This is the function to get all data from url to pass as array to sharp
export function getValues(current_url: URL) {
  //Array that will contain [filename, width, height] in that order
  // eslint-disable-next-line prefer-const
  let data: [string, number | undefined, number | undefined] = [
    "",
    undefined,
    undefined,
  ];
  const search_params = current_url.searchParams;
  //Verifies if the name of file is valid
  const nameFile = search_params.get("file");
  if (nameFile !== null) {
    //vibes check. if failed it will throw errors everywhere!!!!
    hasNoSpecialCharacters(nameFile);
    hasValidFormat(nameFile);
    data[0] = nameFile;
  } else {
    throw new Error(
      `A file parameter is missing or does not exist. Try adding "file=nameFile.extention to the url parameters. fileName is the name of the file, extention being the format such jpeg or other image formats.`
    );
  }
  //get values of width and height. See paramToInt() above to see how it works
  data[1] = paramToInt(search_params.get("width"), "width");
  data[2] = paramToInt(search_params.get("height"), "height");
  return data;
}

/**
 * EndsWith:
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
 *
 * Nervous yoshi
  ████████████████████████████████████████████████
██████████████████████████      ██      ████████████
████████████████████████  ██████  ██████  ██████████
██████████████████████  ██████████████████  ████████
████████████████████    ██████████████████  ████████
██████████████████  ██  ████  ████  ██████  ████████
████████████████  ▒▒▓▓  ████████████        ████████
████████████████      ▒▒  ██████░░░░▒▒▒▒▒▒▒▒  ██████
██████████████████  ▒▒▒▒▒▒  ░░░░▒▒▒▒▒▒▒▒▒▒████  ████
████████████████    ▒▒▒▒██████▒▒▒▒▒▒▒▒  ▒▒▒▒    ████
██████████████  ██  ░░██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ██
██████████████  ▓▓  ░░██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ██
██████████████  ▒▒  ░░▓▓████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ██
████████████████      ▓▓▓▓▓▓░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ██
██████████████████  ▓▓  ▓▓▓▓▓▓░░░░░░░░▒▒▒▒▒▒▒▒  ████
██████████████████      ░░▒▒▓▓      ░░░░░░    ██████
████████████      ▓▓  ░░▒▒▒▒▓▓▓▓▓▓        ██████████
██████████  ▓▓██      ░░▒▒██████  ██████████████████
██████    ▓▓▓▓    ▒▒▒▒▒▒▒▒██████  ██████████████████
██      ██    ▒▒▒▒▒▒▒▒  ████████  ██████████████████
██  ▒▒▒▒    ▒▒▒▒▒▒▒▒  ██████████  ██████████████████
██  ██░░  ▒▒▒▒▒▒████▒▒  ████████  ██████████████████
██  ████  ▒▒▒▒▒▒████    ██████    ██████████████████
████  ▓▓  ░░▒▒▒▒▒▒▒▒▒▒  ██████  ████████████████████
████  ▓▓▓▓  ░░▒▒▒▒▒▒  ████▓▓  ██████████████████████
██████              ▓▓▓▓▓▓▓▓  ██████████████████████
██████  ░░▒▒▓▓▓▓  ▓▓▓▓      ████████████████████████
██████  ░░▒▒▓▓▓▓      ▒▒      ██████████████████████
████  ░░░░░░▒▒██▓▓  ░░▒▒▓▓▓▓██  ████████████████████
████  ░░░░▒▒▓▓▓▓▓▓  ░░░░▒▒▒▒▓▓  ████████████████████
████                            ████████████████████
  ████████████████████████████████████████████████
 */
