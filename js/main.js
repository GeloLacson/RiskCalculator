$(document).ready(function() {
  $("input").change(adjustParams);
  // $("#tp").change(adjustParams);
  // $("#cutloss").change(adjustParams);
  adjustParams();

  function adjustParams() {
    //variables to be used
    var entryPrice = parseFloat($("#entry").val());
    var cutlossPrice = parseFloat($("#cutloss").val());
    var targetPrice = parseFloat($("#tp").val());
    var capital = parseFloat($("#capital").val());
    var pctRisk = capital * 0.01;
    var riskNumerator = (targetPrice - entryPrice).toFixed(4);
    var riskDenominator = (entryPrice - cutlossPrice).toFixed(4);
    var riskRatio = (riskNumerator / riskDenominator).toFixed(2);
    var valueOfShares = entryPrice * numberofShares;
    var averageRiskPrice =
      entryPrice +
      entryPrice * 0.00295 -
      (cutlossPrice - cutlossPrice * 0.00895);
    var numberofShares =
      entryPrice > 0
        ? excelRoundDown(
            pctRisk / averageRiskPrice,
            checkminBoardlot(entryPrice)
          )
        : 0.0;

    //clear field values
    $(".risk").empty();
    $(".pctrisk").empty();
    $(".sharesnum").empty();
    $(".value").empty();

    //populate fields
    if (!isNaN(riskRatio)) {
      $(".risk").append(riskRatio);
    } else {
      $(".risk").append(0);
    }
    $(".pctrisk").append(pctRisk);

    if (numberofShares == 0) {
      $(".sharesnum").append(
        "Minimum board lot will incur more than 1% possible cut loss"
      );
    } else {
      $(".sharesnum").append(numberofShares);
    }
    $(".value").append(entryPrice * numberofShares);
  }

  //functions for computation
  function excelRoundDown(val, num) {
    var coef = Math.pow(10, num);
    return Math.floor(val * coef) / coef;
  }

  function checkminBoardlot(num) {
    switch (true) {
      case num >= 0.0001 && num <= 0.0099:
        return -6;
        break;
      case num >= 0.01 && num <= 0.049:
        return -5;
        break;
      case num >= 0.05 && num <= 0.249:
        return -4;
        break;
      case num >= 0.25 && num <= 0.495:
        return -4;
        break;
      case num >= 0.5 && num <= 4.99:
        return -3;
        break;
      case num >= 5 && num <= 9.99:
        return -2;
        break;
      case num >= 10 && num <= 19.98:
        return -2;
        break;
      case num >= 20 && num <= 49.95:
        return -2;
        break;
      case num >= 50 && num <= 99.95:
        return -1;
        break;
      case num >= 100 && num <= 199.9:
        return -1;
        break;
      case num >= 200 && num <= 499.8:
        return -1;
        break;
      case num >= 500 && num <= 999.5:
        return -1;
        break;
      case num >= 1000 && num <= 1999:
        return 0;
        break;
      case num >= 2000 && num <= 4998:
        return 0;
        break;
      default:
        return 0;
    }
  }
});
