$(function () {
  $("#navbar").load("./navbar.html");
  $("#footer").load("./footer.html");
});
$(document).ready(function () {
  $("#keywords").select2({
    theme: "bootstrap-5",
    maximumSelectionLength: 2,
    placeholder: "Select...",
    closeOnSelect: true,
    tags: true,
    allowClear: true,
    width: $(this).data("width")
      ? $(this).data("width")
      : $(this).hasClass("w-100")
      ? "100%"
      : "style",
  });
});

$(document).ready(function () {
  $("#positionType").select2({
    theme: "bootstrap-5",
    placeholder: "Position Type...",
    closeOnSelect: true,
    allowClear: true,
    width: $(this).data("width")
      ? $(this).data("width")
      : $(this).hasClass("w-100")
      ? "100%"
      : "style",
  });
});

$(document).ready(function () {
  $("#primaryTag").select2({
    theme: "bootstrap-5",
    placeholder: "Select...",
    closeOnSelect: true,
    allowClear: true,
    width: $(this).data("width")
      ? $(this).data("width")
      : $(this).hasClass("w-100")
      ? "100%"
      : "style",
  });
});

function checkCheckboxStatus(chk) {
  var chkName = document.getElementsByName(chk.name);
  var chkID = document.getElementById(chk.id);
  if (chkID.checked) {
    for (var i = 0; i < chkName.length; i++) {
      if (!chkName[i].checked) {
        chkName[i].disabled = true;
      } else {
        chkName[i].disabled = false;
      }
    }
  } else {
    for (var i = 0; i < chkName.length; i++) {
      chkName[i].disabled = false;
    }
  }
  updateTotal(chk);
}

function updateTotal(chk) {
  var chkID = document.getElementById(chk.id);
  if (chkID.checked) {
    var newTotal =
      parseFloat(total.getAttribute("value")) +
      parseFloat(chkID.getAttribute("value"));
    document.getElementById("total").setAttribute("value", newTotal);
  } else {
    var newTotal =
      parseFloat(total.getAttribute("value")) -
      parseFloat(chkID.getAttribute("value"));
    document.getElementById("total").setAttribute("value", newTotal);
  }
  document.getElementById("total").textContent =
    "Checkout Job Posting $" + newTotal;
  document.getElementById("totalCost").setAttribute("value", newTotal);
}

function checkEmailOrURL() {
  if (
    document.forms["jobForm"]["appURL"].value != null &&
    document.forms["jobForm"]["appURL"].value != ""
  ) {
    appEmail.disabled = true;
    document
      .getElementById("EmailURLRequiredMessage")
      .setAttribute("hidden", "");
  } else if (
    document.forms["jobForm"]["appEmail"].value != null &&
    document.forms["jobForm"]["appEmail"].value != ""
  ) {
    appURL.disabled = true;
    document
      .getElementById("EmailURLRequiredMessage")
      .setAttribute("hidden", "");
    if (
      RegExp(
        /^\w+([\.-]?(?=(\w+))\1)*@\w+([\.-]?(?=(\w+))\1)*(\.\w{2,3})+$/
      ).test(document.forms["jobForm"]["appEmail"].value)
    ) {
      document.getElementById("EmailFormatMessage").setAttribute("hidden", "");
    } else {
      document.getElementById("EmailFormatMessage").removeAttribute("hidden");
    }
  } else {
    appEmail.disabled = false;
    appURL.disabled = false;
    document
      .getElementById("EmailURLRequiredMessage")
      .removeAttribute("hidden");
    document.getElementById("EmailFormatMessage").setAttribute("hidden", "");
  }
  checkEnableCheckoutButton();
}

function checkInputField(currentField) {
  var currentFieldMessage = currentField.id + "RequiredMessage";
  if (
    document.forms["jobForm"][currentField.id].value != null &&
    document.forms["jobForm"][currentField.id].value != ""
  ) {
    document.getElementById(currentFieldMessage).setAttribute("hidden", "");
  } else {
    document.getElementById(currentFieldMessage).removeAttribute("hidden");
  }
  checkEnableCheckoutButton();
}

function checkEnableCheckoutButton() {
  if (
    companyName.checkValidity() &&
    positionName.checkValidity() &&
    positionType.checkValidity() &&
    primaryTag.checkValidity() &&
    keywords.checkValidity() &&
    jobDesc.checkValidity() &&
    (appEmail.checkValidity() || appURL.checkValidity())
  ) {
    if (
      appURL.disabled == true &&
      RegExp(
        /^\w+([\.-]?(?=(\w+))\1)*@\w+([\.-]?(?=(\w+))\1)*(\.\w{2,3})+$/
      ).test(document.forms["jobForm"]["appEmail"].value)
    ) {
      checkoutButton.disabled = false;
    } else if (appEmail.disabled == true) {
      checkoutButton.disabled = false;
    } else {
      checkoutButton.disabled = true;
    }
  } else {
    checkoutButton.disabled = true;
  }
}