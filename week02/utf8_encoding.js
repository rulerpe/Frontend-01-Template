// 写一个 UTF-8 Encoding 的函数
function UTF8Encoding(s) {
  let encodeedArr = s.split("").map((char) => {
    // convert each charter to unicode in binary
    let charUnicode = char.charCodeAt(0).toString(2);
    // find number of bytes needed for UTF-8
    let bytesNeeded = 0;
    if (charUnicode.length <= 7) {
      bytesNeeded = 1;
    } else if (charUnicode.length <= 11) {
      bytesNeeded = 2;
    } else if (charUnicode.length <= 16) {
      bytesNeeded = 3;
    } else {
      bytesNeeded = 4;
    }
    let encodedChar = "";
    // return encoded charter if it's only one byte long
    if (bytesNeeded === 1) {
      return "%" + parseInt(`0${padString(charUnicode, 7, 0)}`, 2).toString(16);
    }

    for (let i = charUnicode.length - 6; i >= 0; i = i - 6) {
      // for ending bytes 10xxxxxx
      encodedChar =
        "%" +
        parseInt(`10${charUnicode.slice(i, i + 6)}`, 2).toString(16) +
        encodedChar;
      // for first byte
      if (i < 6) {
        let tail = `0${padString(
          charUnicode.slice(0, i),
          8 - (bytesNeeded + 1),
          0
        )}`;
        let firstByte = padString(tail, 8, 1);
        encodedChar =
          "%" + parseInt(firstByte + encodedChar, 2).toString(16) + encodedChar;
      }
    }
    return encodedChar;
  });
  return encodeedArr.join("");
}
function padString(s, width, x) {
  return s.length >= width ? s : new Array(width - s.length + 1).join(x) + s;
}

let testString = "写一个 UTF-8 Encoding 的函数";
let encodedString = UTF8Encoding(testString);
let decodedString = decodeURIComponent(encodedString);
console.log("testing string: ", testString);
console.log("encoded string: ", encodedString);
console.log("decoded string: ", decodedString);
