
const fs = require("fs");
const vowels = require("./vowels");
const inputFile = process.argv[2];
const outputFile = process.argv[3];

const translateToPigLatin = (text) => {
  //Split text into words
  let words = text.split(" ");
  words = words.map((word) =>
    //Checks if the first character is vowel
    vowels.includes(word[0])
      ? translateWordWithVowel(word)
      : translateWordWithoutVowel(word)
  );
  // Joins the words back together
  return words.join(" ");
};

const translateWordWithVowel = (word) => {
  //Randomly choses between ay and way
  const ending = Math.round(Math.random()) ? "ay" : "way";
  //Splits word if it contains .
  const wordParts = word.split(".");
  //Adds the random ending
  wordParts[0] += ending;

  // joins the word back together
  return wordParts.join(".");
};

const translateWordWithoutVowel = (word) => {
  const start = word[0];
  //Split word if it contains .
  wordParts = word.split(".");

  //Edits the first part of word
  // Removes first character and adds it to the end and adds ay as well
  wordParts[0] = wordParts[0].slice(1) + start + "ay";
  //Joins word back together
  return wordParts.join(".");
};

// Loads file content
fs.readFile(inputFile, { encoding: "utf-8" }, (err, data) => {
  if (err) console.error(err);
  else {
    //Translate file content
    const translatedText = translateToPigLatin(data);
    //Write translated content to output file
    fs.writeFile(outputFile, translatedText, (err) => {
      if (err) console.error(err);
    });
  }
});

//Console log the output
console.log(`${inputFile} was translated to pig latin!`);