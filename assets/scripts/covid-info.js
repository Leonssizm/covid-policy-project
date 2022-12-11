const antibodiesModalElement = document.getElementById("antibodies-test-modal");
const testDateModalElement = document.getElementById(
  "testDate-amountOfAntibodies"
);
const covidDateModalElement = document.getElementById("covidDate");
const nextPage = document.getElementById("toVaccinationInfo");

const hadCovidRadioButtons = document.querySelectorAll('input[name = "covid"]');
const antibodiesRadioButtons = document.querySelectorAll(
  'input[name = "antibodies"]'
);
const antibodiesModalRadioButtons = document.querySelectorAll(
  'input[name = "antibodies"]'
);

const antiBodiesTestYes = document.getElementById("antiBodiesTestYes");
const antiBodiesTestNo = document.getElementById("antiBodiesTestNo");
const covidTestDate = document.getElementById("covid-test-calendar");
const antibodiesAmount = document.getElementById("antibodies-amount");
const covidDateInput = document.getElementById("covidCalendar");

// show and hide modals (conditional rendering)
function showAntibodiesQuestion(answer) {
  antibodiesModalElement.style.display = answer === "yes" ? "block" : "none";
  if (answer === "no") {
    covidDateModalElement.style.display = "none";
    testDateModalElement.style.display = "none";
    antibodiesModalRadioButtons[0].checked = false;
    antibodiesModalRadioButtons[1].checked = false;
  }
}

antiBodiesTestYes.addEventListener("click", function antibodiesModal() {
  testDateModalElement.style.display = "block";
  covidDateModalElement.style.display = "none";
});

antiBodiesTestNo.addEventListener("click", function covidDateInput() {
  testDateModalElement.style.display = "none";
  covidDateModalElement.style.display = "block";
});

// validations.

nextPage.addEventListener("click", () => {
  // variables for modifying form data for local storage & sending to server
  let hadCovid = "";
  let hadAntiBodiesTest;
  if (validateInputs()) {
    if (hadCovidRadioButtons[0].checked) hadCovid = "yes";
    else if (hadCovidRadioButtons[1].checked) hadCovid = "no";
    else hadCovid = "have_right_now";

    if (antibodiesRadioButtons[0].checked) hadAntiBodiesTest = true;
    else hadAntiBodiesTest = false;

    setTimeout(() => {
      window.localStorage.setItem(
        "covid-info",
        JSON.stringify({
          had_covid: hadCovid,
          ...(hadCovid === "yes" && {
            had_antibody_test: hadAntiBodiesTest,
          }),
          antibodies: {
            test_date: covidTestDate.value,
            number: antibodiesAmount.value,
          },
          had_covid_at: covidDateInput.value,
        })
      );
      window.location.href = "./vaccination-info.html";
    }, 1000);
  } else {
    return;
  }
});

function validateInputs() {
  let formIsValid = true;

  if (
    !hadCovidRadioButtons[0].checked &&
    !hadCovidRadioButtons[1].checked &&
    !hadCovidRadioButtons[2].checked
  ) {
    formIsValid = false;
    document.getElementById("covid-question-label").style.color = "#ff3860";
  } else {
    document.getElementById("covid-question-label").style.color =
      "currentColor";
  }

  if (hadCovidRadioButtons[0].checked) {
    if (
      !antibodiesRadioButtons[0].checked &&
      !antibodiesModalRadioButtons[1].checked
    ) {
      formIsValid = false;
      document.getElementById("antibodies-question-label").style.color =
        "#ff3860";
    } else {
      document.getElementById("antibodies-question-label").style.color =
        "currentColor";
    }
  }

  if (antibodiesRadioButtons[0].checked) {
    if (covidTestDate.value === "") {
      formIsValid = false;
      covidTestDate.style.borderColor = "#ff3860";
    } else {
      covidTestDate.style.borderColor = "currentColor";
    }

    if (antibodiesAmount.value === "") {
      formIsValid = false;
      antibodiesAmount.style.borderColor = "#ff3860";
    } else {
      antibodiesAmount.style.borderColor = "currentColor";
    }
  }

  if (antibodiesRadioButtons[1].checked) {
    if (covidDateInput.value === "") {
      formIsValid = false;
      covidDateInput.style.borderColor = "#ff3860";
    } else {
      covidDateInput.style.borderColor = "currentColor";
    }
  }
  return formIsValid;
}

// display values when returning to this page

function displayDataFromLocalStorage() {
  let covidInfo = JSON.parse(localStorage.getItem("covid-info"));
  if (localStorage.getItem("covid-info")) {
    if (covidInfo.had_covid === "no") {
      hadCovidRadioButtons[1].checked = true;
    } else if (covidInfo.had_covid === "have_right_now") {
      hadCovidRadioButtons[2].checked = true;
    } else {
      hadCovidRadioButtons[0].checked = true;
      antibodiesModalElement.style.display = "block";

      if (covidInfo.antibodies.test_date && covidInfo.had_antibody_test) {
        antibodiesRadioButtons[0].checked = true;
        document.getElementById("testDate-amountOfAntibodies").style.display =
          "block";
        covidTestDate.value = covidInfo.antibodies.test_date;
        antibodiesAmount.value = covidInfo.antibodies.number;
      } else if (!covidInfo.had_antibody_test) {
        antibodiesRadioButtons[1].checked = true;
        document.getElementById("covidDate").style.display = "block";
        covidDateInput.value = covidInfo.had_covid_at;
      }
    }
  } else {
    return;
  }
}
