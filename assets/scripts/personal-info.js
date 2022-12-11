const nameInputElement = document.getElementById("nameInput");
const lastnameInputElement = document.getElementById("lastnameInput");
const emailInputElement = document.getElementById("emailInput");
const nextPage = document.getElementById("toCovidInfo");

nextPage.addEventListener("click", () => {
  if (validateInputs()) {
    setTimeout(() => {
      window.localStorage.setItem(
        "personal-info",
        JSON.stringify({
          first_name: nameInputElement.value,
          last_name: lastnameInputElement.value,
          email: emailInputElement.value,
        })
      );
      window.location.href = "./covid-info.html";
    }, 1000);
  } else {
    return;
  }
});

function validateInputs() {
  let formIsValid = true;
  let nameInputElementValue = nameInputElement.value.trim();
  let lastnameInputElementValue = lastnameInputElement.value.trim();
  let emailInputElementValue = emailInputElement.value.trim();

  if (
    !isFilled(nameInputElementValue) ||
    !lengthIsLonger(nameInputElementValue, 2)
  ) {
    formIsValid = false;
    setError(
      nameInputElement,
      "სახელის ველი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან"
    );
  } else if (lengthIsLonger(nameInputElementValue, 255)) {
    formIsValid = false;
    setError(
      nameInputElement,
      "სახელის ველი უნდა შედგებოდეს მაქსიმუმ 255 სიმბოლოსგან"
    );
  } else if (!REGEX.engLetters.test(nameInputElementValue)) {
    formIsValid = false;
    setError(
      nameInputElement,
      "სახელის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს"
    );
  } else {
    setSuccess(nameInputElement);
  }

  if (
    !isFilled(lastnameInputElementValue) ||
    !lengthIsLonger(lastnameInputElementValue, 2)
  ) {
    formIsValid = false;
    setError(
      lastnameInputElement,
      "გვარის ველი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან"
    );
  } else if (lengthIsLonger(nameInputElementValue, 255)) {
    formIsValid = false;
    setError(
      lastnameInputElement,
      "გვარის ველი უნდა შედგებოდეს მაქსიმუმ 255 სიმბოლოსგან"
    );
  } else if (!REGEX.engLetters.test(lastnameInputElementValue)) {
    formIsValid = false;
    setError(
      lastnameInputElement,
      "გვარის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს"
    );
  } else {
    setSuccess(lastnameInputElement);
  }

  if (!REGEX.EMAIL.test(emailInputElementValue)) {
    formIsValid = false;
    setError(emailInputElement, "თქვენს მიერ შეყვანილი მეილი არასწორია");
  } else if (!REGEX.redberryEmail.test(emailInputElementValue)) {
    formIsValid = false;
    setError(
      emailInputElement,
      "გთხოვთ დარეგისტრირდეთ Redberry-ს მეილით (youremail@redberry.ge)"
    );
  } else {
    setSuccess(emailInputElement);
  }

  return formIsValid;
}

// returning to the page displays data from local storage

function displayDataFromLocalStorage() {
  let personalInfo = JSON.parse(localStorage.getItem("personal-info"));
  if (localStorage.getItem("personal-info")) {
    nameInputElement.value = personalInfo.first_name;
    lastnameInputElement.value = personalInfo.last_name;
    emailInputElement.value = personalInfo.email;
  } else {
    return;
  }
}
