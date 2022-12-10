let vaccinationInfo = JSON.parse(localStorage.getItem("vaccination-info"));
let personalInfo = JSON.parse(localStorage.getItem("personal-info"));
let covidInfo = JSON.parse(localStorage.getItem("covid-info"));
let policyInfo = JSON.parse(localStorage.getItem("policy-info"));

const covidSicknessDateConverted = covidInfo.had_covid_at
  .split("-")
  .reverse()
  .join("/");

const antiobidesTestDateConverted = covidInfo.antibodies.test_date
  .split("-")
  .reverse()
  .join("-");

function sendData() {
  fetch("https://covid19.devtest.ge/api/create", {
    method: "POST",
    body: JSON.stringify({
      first_name: personalInfo.first_name,
      last_name: personalInfo.last_name,
      email: personalInfo.email,
      had_covid: covidInfo.had_covid,
      had_antibody_test: covidInfo.had_antibody_test,
      ...(covidInfo.had_antibody_test && {
        antibodies: {
          test_date: antiobidesTestDateConverted,
          number: covidInfo.antibodies.number,
        },
      }),
      ...(covidInfo.had_covid_at && {
        covid_sickness_date: covidSicknessDateConverted,
      }),
      had_vaccine: vaccinationInfo.had_vaccine,
      ...(vaccinationInfo.had_vaccine && {
        vaccination_stage: vaccinationInfo.vaccination_stage,
      }),
      ...(!vaccinationInfo.had_vaccine && {
        i_am_waiting: vaccinationInfo.refusalReasoning,
      }),
      non_formal_meetings: policyInfo.non_formal_meetings,
      number_of_days_from_office: policyInfo.number_of_days_from_office,
      ...(covidInfo.what_about_meetings_in_live && {
        what_about_meetings_in_live: covidInfo.what_about_meetings_in_live,
      }),
      ...(covidInfo.tell_us_your_opinion_about_us && {
        tell_us_your_opinion_about_us: covidInfo.tell_us_your_opinion_about_us,
      }),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    console.log(response);

    if (response.status === 201) {
      localStorage.clear();
      // display lil star animation
      let firstStar = document.getElementById("firstStar");
      let secondStar = document.getElementById("secondStar");
      firstStar.classList.add("firstStarAnimation");
      secondStar.classList.add("secondStarAnimation");
    }
  });
}
