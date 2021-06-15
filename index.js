var isNum1 = false;
var isNum2 = false;
var isOper1 = false;
var hist = "";
var result = "";
var last = "";
var isRoot = false;
var isDeci = false;
var divi = 10;

var num1 = 0;
var num2 = 0;
var oper1;

$(".equal-box").click(function () {
  calculate(String(this.innerHTML));
});
$(".number").click(function () {
  if (this.innerHTML == "C") clearAll();
  else calculate(String(this.innerHTML));
});
$(document).keydown(function (evt) {
  if (evt.key == "Enter") evt.key = "=";
  if (evt.key == "C") clearAll();
  else calculate(String(evt.key));
});

function clearAll() {
  isNum1 = false;
  isNum2 = false;
  isOper1 = false;
  hist = "";
  result = "";
  last = "";

  num1 = 0;
  num2 = 0;
  oper1;

  isRoot = false;

  $(".result").text("result");
  $(".history").text("history");
}

function is_operation(oper) {
  switch (oper) {
    case "x<sup>y</sup>":
      return true;
    case "%":
      return true;
    case "/":
      return true;
    case "*":
      return true;
    case "-":
      return true;
    case "+":
      return true;
    case ".":
      return true;
    case "=":
      return true;
    case "√":
      isRoot = true;
      console.log(num1, num2, isNum1, isNum2, result);
      return true;

    default:
      break;
  }
  return false;
}
function is_number(num) {
  if (!isNaN(num)) return true;
  return false;
}
function change_res(result) {
  if (result.length > 13) $(".result").addClass("small-text");
  else $(".result").removeClass("small-text");
  $(".result").text(result);
}
function change_hist(hist) {
  $(".history").text(hist);
}

function show_calculation(a, b, op) {
  switch (op) {
    case "x<sup>y</sup>":
      hist = result;
      result = String(Math.pow(a, b));
      break;
    case "%":
      hist = result;
      result = String(a % b);
      break;
    case "/":
      hist = result;
      result = String(a / b);
      break;
    case "*":
      hist = result;
      result = String(a * b);
      break;
    case "-":
      hist = result;
      result = String(a - b);
      break;
    case "+":
      hist = result;
      result = String(a + b);
      break;
    case "√":
      hist = result;
      result = String(a * Math.sqrt(b));
      break;
    default:
      return;
  }
  change_res(result);
  change_hist(hist);
}

function calculate(a) {
  console.log(num1, num2);
  if (is_number(Number(a))) {
    last = "num";
    if (!isOper1) {
      result += String(a);
      num1 *= 10;
      num1 += Number(a);
      isNum1 = true;
      change_res(result);
    } else {
      result += String(a);
      change_res(result);
      if (isDeci) {
        num2 += Number(a) / divi;
        divi *= 10;
      } else {
        num2 *= 10;
        num2 += Number(a);
      }
      isNum2 = true;
    }
  } else if (is_operation(a)) {
    if (isRoot && !isNum1) {
      result = "√";
      change_res(result);
      last = "oper";
    } else if (result[0] == "√") {
      result = String(Math.sqrt(num1)) + a;
      num1 = Math.sqrt(num1);
      change_res(result);
      isRoot = false;
      oper1 = a;
      isOper1 = true;
    } else if (last == "oper") {
      result = result.slice(0, result.length - 1);
      oper1 = a;
      if (a == "x<sup>y</sup>") result += "^";
      else result += String(a);
      change_res(result);
    } else if (isNum1 && !isNum2) {
      oper1 = a;
      isOper1 = true;
      if (a == "x<sup>y</sup>") result += "^";
      else result += String(a);
      change_res(result);
      last = "oper";
    } else if (isNum1 && isNum2) {
      if (a == ".") {
        result += ".";
        change_res(result);
        isDeci = true;
      } else {
        show_calculation(num1, num2, oper1);
        num1 = Number(result);
        num2 = 0;
        divi = 10;
        isDeci = false;
        isNum2 = false;
        if (a != "=") {
          oper1 = a;
          result += String(a);
          change_res(result);
          last = "oper";
        } else {
          isNum2 = false;
          isOper1 = false;
          last = "num";
          num1 = Number(result);
          num2 = 0;
        }
      }
    }
  }
}
