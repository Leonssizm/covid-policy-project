let vaccinationInfo = JSON.parse(localStorage.getItem("vaccination-info"));
let personalInfo = JSON.parse(localStorage.getItem("personal-info"));
let covidInfo = JSON.parse(localStorage.getItem("covid-info"));
let policyInfo = JSON.parse(localStorage.getItem("policy-info"));

function sendData() {
  fetch("https://covid19.devtest.ge/api/create", {
    method: "POST",
    body: JSON.stringify({
      first_name: personalInfo.first_name,
      last_name: personalInfo.last_name,
      email: personalInfo.email,
      had_covid: covidInfo.had_covid,
      had_antibodies_test: covidInfo.had_antibodies_test,
      ...(covidInfo.had_antibodies_test && {
        antibodies: {
          test_date: covidInfo.antibodies.test_date,
          number: parseInt(covidInfo.number),
        },
      }),
      ...(covidInfo.had_covid_at && {
        had_covid_at: covidInfo.had_covid_at,
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
  });
}
