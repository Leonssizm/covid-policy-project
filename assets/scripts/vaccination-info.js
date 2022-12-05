const vaccinationStageQuestion = document.getElementById("vaccination-stage");
const vaccinationRegInfo = document.getElementById("registration-info");
const registrationLink = document.getElementById("registration-info-link");
const registrationConditions = document.getElementById(
  "registration-info-condition"
);
const vaccinationRefusalModal = document.getElementById("vaccination-refusal");
const nextPageBtn = document.getElementById("toWorkPolicyInfo");

const vaccinationRadioButtons = document.querySelectorAll(
  'input[name="vaccination"]'
);
const vaccinationRefusalRadioButtons = document.querySelectorAll(
  'input[name="vaccination-refusal"]'
);
const vaccinationStageRadioButtons = document.querySelectorAll(
  'input[name="vaccination-stage"]'
);

// show and hide modals (conditional rendering)

function showVaccinationStage(answer) {
  vaccinationStageQuestion.style.display = answer === "yes" ? "block" : "none";

  if (answer === "no") {
    vaccinationStageRadioButtons[0].checked = false;
    vaccinationStageRadioButtons[1].checked = false;
    vaccinationStageRadioButtons[2].checked = false;
    vaccinationRegInfo.style.display = "none";
    registrationLink.style.display = "none";
    vaccinationRefusalModal.style.display = "block";
  }

  if (answer === "yes") {
    vaccinationRefusalModal.style.display = "none";
    registrationLink.style.display = "none";
    registrationConditions.style.display = "none";
    vaccinationRefusalRadioButtons[0].checked = false;
    vaccinationRefusalRadioButtons[1].checked = false;
    vaccinationRefusalRadioButtons[2].checked = false;
  }
}

function displayVaccinationInfo(answer) {
  if (answer === "link") {
    registrationLink.style.display = "block";
  } else {
    registrationLink.style.display = "none";
  }

  if (answer === "condition") {
    registrationConditions.style.display = "block";
  } else {
    registrationConditions.style.display = "none";
  }
}

function showVaccinationRegInfo(answer) {
  vaccinationRegInfo.style.display = answer === "yes" ? "block" : "none";
}

// validations

nextPageBtn.addEventListener("click", () => {
  // variables for modifying form data for local storage & sending to server
  let vaccinated = "";
  let vaccinationStage = "";
  let refusalReasoning = "";

  if (validateInputs()) {
    if (vaccinationRadioButtons[0].checked) vaccinated = true;
    else vaccinated = false;

    if (vaccinationStageRadioButtons[0].checked)
      vaccinationStage = "first_dosage_and_registered_on_the_second";
    else if (vaccinationStageRadioButtons[1].checked)
      vaccinationStage = "fully_vaccinated";
    else vaccinationStage = "first_dosage_and_not_registered_yet";

    if (vaccinationRefusalRadioButtons[0].checked)
      refusalReasoning = "registered_and_waiting";
    else if (vaccinationRefusalRadioButtons[1].checked)
      refusalReasoning = "not_planning";
    else refusalReasoning = "had_covid_and_planning_to_be_vaccinated";
    setTimeout(() => {
      window.localStorage.setItem(
        "vaccination-info",
        JSON.stringify({
          had_vaccine: vaccinated,
          vaccination_stage: vaccinationStage,
          refusalReasoning: refusalReasoning,
        })
      );
      window.location.href = "./work-info.html";
    }, 1000);
  }
});

function validateInputs() {
  let formIsValid = true;

  if (
    !vaccinationRadioButtons[0].checked &&
    !vaccinationRadioButtons[1].checked
  ) {
    formIsValid = false;
    document.getElementById("vaccination-question-label").style.color =
      "#ff3860";
  } else {
    document.getElementById("vaccination-question-label").style.color =
      "currentColor";
  }

  if (vaccinationRadioButtons[0].checked) {
    if (
      !vaccinationStageRadioButtons[0].checked &&
      !vaccinationStageRadioButtons[1].checked &&
      !vaccinationStageRadioButtons[2].checked
    ) {
      formIsValid = false;
      document.getElementById("covid-question-label").style.color = "#ff3860";
    } else {
      document.getElementById("covid-question-label").style.color =
        "currentColor";
    }
  }

  if (vaccinationRadioButtons[1].checked) {
    if (
      !vaccinationRefusalRadioButtons[0].checked &&
      !vaccinationRefusalRadioButtons[1].checked &&
      !vaccinationRefusalRadioButtons[2].checked
    ) {
      formIsValid = false;
      document.getElementById("refusal-question-label").style.color = "#ff3860";
    } else {
      document.getElementById("refusal-question-label").style.color =
        "currentColor";
    }
  }

  return formIsValid;
}
