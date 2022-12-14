const meetingsRadioButtons = document.querySelectorAll('input[name="meeting"]');
const workdaysRadioButtons = document.querySelectorAll(
  'input[name="workdays"]'
);

const submitFormButton = document.getElementById("submitForm");
let liveMeetings = document.getElementById("liveMeetings");
let suggestions = document.getElementById("suggestions");

submitFormButton.addEventListener("click", () => {
  if (validateInputs()) {
    // variables for modifying form data for local storage & sending to server
    let amountOfWeeklyMeetings = "";
    let numberOfDaysFromOffice = "";
    if (meetingsRadioButtons[0].checked) {
      amountOfWeeklyMeetings = "twice_a_week";
    } else if (meetingsRadioButtons[1].checked) {
      amountOfWeeklyMeetings = "once_a_week";
    } else if (meetingsRadioButtons[2].checked) {
      amountOfWeeklyMeetings = "once_in_a_two_weeks";
    } else {
      amountOfWeeklyMeetings = "once_in_a_month";
    }

    if (workdaysRadioButtons[0].checked) numberOfDaysFromOffice = 0;
    else if (workdaysRadioButtons[1].checked) numberOfDaysFromOffice = 1;
    else if (workdaysRadioButtons[2].checked) numberOfDaysFromOffice = 2;
    else if (workdaysRadioButtons[3].checked) numberOfDaysFromOffice = 3;
    else if (workdaysRadioButtons[4].checked) numberOfDaysFromOffice = 4;
    else numberOfDaysFromOffice = 5;

    setTimeout(() => {
      window.localStorage.setItem(
        "policy-info",
        JSON.stringify({
          non_formal_meetings: amountOfWeeklyMeetings,
          number_of_days_from_office: numberOfDaysFromOffice,
          what_about_meetings_in_live: liveMeetings.value,
          tell_us_your_opinion_about_us: suggestions.value,
        })
      );
      window.location.href = "./thanks.html";
    }, 1000);
  } else {
    return;
  }
});

function validateInputs() {
  let formIsValid = true;
  if (
    !meetingsRadioButtons[0].checked &&
    !meetingsRadioButtons[1].checked &&
    !meetingsRadioButtons[2].checked &&
    !meetingsRadioButtons[3].checked
  ) {
    formIsValid = false;
    document.getElementById("meeting-question-label").style.color = "#ff3860";
  } else {
    document.getElementById("meeting-question-label").style.color =
      "currentColor";
  }

  if (
    !workdaysRadioButtons[0].checked &&
    !workdaysRadioButtons[1].checked &&
    !workdaysRadioButtons[2].checked &&
    !workdaysRadioButtons[3].checked &&
    !workdaysRadioButtons[4].checked &&
    !workdaysRadioButtons[5].checked
  ) {
    formIsValid = false;
    document.getElementById("workDays-question-label").style.color = "#ff3860";
  } else {
    document.getElementById("workDays-question-label").style.color =
      "currentColor";
  }

  return formIsValid;
}

function displayDataFromLocalStorage() {
  let policyInfo = JSON.parse(localStorage.getItem("policy-info"));

  if (localStorage.getItem("policy-info")) {
    if (policyInfo.non_formal_meetings === "twice_a_week") {
      meetingsRadioButtons[0].checked = true;
    } else if (policyInfo.non_formal_meetings === "once_a_week") {
      meetingsRadioButtons[1].checked = true;
    } else if (policyInfo.non_formal_meetings === "once_in_a_two_weeks") {
      meetingsRadioButtons[2].checked = true;
    } else {
      meetingsRadioButtons[3].checked = true;
    }

    if (policyInfo.number_of_days_from_office === 0)
      workdaysRadioButtons[0].checked = true;
    else if (policyInfo.number_of_days_from_office === 1)
      workdaysRadioButtons[1].checked = true;
    else if (policyInfo.number_of_days_from_office === 2)
      workdaysRadioButtons[2].checked = true;
    else if (policyInfo.number_of_days_from_office === 3)
      workdaysRadioButtons[3].checked = true;
    else if (policyInfo.number_of_days_from_office === 4)
      workdaysRadioButtons[4].checked = true;
    else workdaysRadioButtons[5].checked = true;
  }

  if (policyInfo.tell_us_your_opinion_about_us) {
    suggestions.value = policyInfo.tell_us_your_opinion_about_us;
  }
  if (policyInfo.what_about_meetings_in_live) {
    liveMeetings.value = policyInfo.what_about_meetings_in_live;
  }
}
