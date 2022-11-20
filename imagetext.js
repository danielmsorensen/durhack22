Tesseract = require("tesseract.js");

function image2Text(file) {
    let text = Tesseract
        .recognize(
            file,
            'eng'
    ).then(({ data: { text } }) => text.replace(/\n/g, " ").replace(/\+/g, " plus ").replace(/\-/g, " minus ").replace(/x2/g, "x ** ").replace(/\—/g," minus ").replace(/\=/g, " equals "));
    return text
}
let result = image2Text("Example9.png");
result.then(text => console.log(text));