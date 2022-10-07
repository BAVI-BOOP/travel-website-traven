import Translate from "./translate.js";

//This function will be called when user click changing language
function translate(lng, tagAttr) {
  var translate = new Translate();
  translate.init(tagAttr, lng);
  translate.process();
  if (lng == "en") {
    $("#enTranslator").css("color", "#f4623a");
    $("#khTranslator").css("color", "#212529");
  }
  if (lng == "kh") {
    $("#khTranslator").css("color", "#f4623a");
    $("#enTranslator").css("color", "#212529");
  }
}
$(document).ready(function () {
  //This is id of HTML element (English) with attribute lng-tag
  $("#enTranslator").click(function () {
    translate("en", "lng-tag");
  });
  //This is id of HTML element (Khmer) with attribute lng-tag
  $("#esTranslator").click(function () {
    translate("es", "lng-tag");
  });
  //This is id of HTML element (Khmer) with attribute lng-tag
  $("#trTranslator").click(function () {
    translate("tr", "lng-tag");
  });
  //This is id of HTML element (Khmer) with attribute lng-tag
  $("#deTranslator").click(function () {
    translate("de", "lng-tag");
  });
});


// let deTranslate = document.getElementById("deTranslate");
// let esTranslate = document.getElementById("esTranslate");
// let trTranslate = document.getElementById("trTranslate");

// esTranslate.addEventListener("load", translate("es", "lng-tag"));
// trTranslate.addEventListener("load", translate("tr", "lng-tag"));
// deTranslate.addEventListener("load", translate("de", "lng-tag"));
// enTranslate.addEventListener("load", translate("en", "lng-tag"));


let languages = document.querySelector("#languages");

languages.addEventListener("change", (event) => {
  console.log(event.target.value)
  if (event.target.value === "de") {
    translate("de", "lng-tag");
  }
  if (event.target.value === "es") {
    translate("es", "lng-tag");
    console.log('askdjal')
  }
  if (event.target.value === "en") {
    translate("en", "lng-tag");
    console.log("anna");
  }
  if (event.target.value === "tr") {
    translate("tr", "lng-tag");
    console.log("aaan");
  }
});


let body = document.querySelector("body");

body.addEventListener("load", translate("en", "lng-tag"));
