// ==UserScript==
// @name         redfin customized
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @match      https://www.redfin.com/*/*/*/home/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/sugar/1.3/sugar.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/sugar/1.3/sugar.min.js
// @author       You
// @grant        none
// ==/UserScript==

//window.onload = setTimeout(loadFrame, 8000);

var i = 0, howManyTimes = 8;
function f() {
    var data = loadFrame();
    var rentalMin = data.rentalMin;
    console.log(rentalMin);
    if(rentalMin) {
        showFrame(data.price, data.rentalMin, data.emi, data.monthlyPrice);
    } else {
        console.log("attempt + " + i);
        i++;
        if( i < howManyTimes) {
            setTimeout( f, 1000 );
        }
    }
}

f();
console.log("after function");

function showFrame(price, rentalMin, emi, monthlyPrice){
    $(".HomeInfo .top-stats").append("<div>Monthly Total Cost: $"+monthlyPrice+"</div>");
    $(".HomeInfo .top-stats").append("<div>Price: $"+price+"</div>");
    $(".HomeInfo .top-stats").append('<div>Rental: $'+rentalMin+'</div>');
    $(".HomeInfo .top-stats").append('<div>Emi: $'+emi+'</div>');

}

function getValueFromCurrency(valueInDollar) {
    return valueInDollar.replace(/[$,]+/g,"");
}

function loadFrame() {
    var price =  $( ".info-block .statsValue" ).first().text();
    var rentalMinString = $(".rentalEstimateStats .value-block").first().text().split(" -")[0];
    var rentalMin = getValueFromCurrency(rentalMinString);
    var emiString = $(".CalculatorSummary .sectionText .title").text().split(" ")[0];;
    var emi = getValueFromCurrency(emiString);
    console.log(emi);
    console.log(rentalMin);
    var monthlyPrice = emi - rentalMin;
    return {
        price: price,
        rentalMin: rentalMin,
        monthlyPrice: monthlyPrice,
        emi: emi
    }
}
