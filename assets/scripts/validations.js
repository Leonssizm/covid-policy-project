const REGEX = {
    EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    redberryEmail:/^[a-zA-Z0-9+_.-]+@redberry.ge$/,
    engLetters: /^[a-zA-Z]+$/,
    geoLetters: /^[ა-ჰ]+$/
  };
  
  function isValidEmail(email) {
    return REGEX.EMAIL.test(String(email).toLowerCase());
  }
  
  
  function isFilled(element) {
    return element !== null && element !== "";
  }
  
  function lengthIsLonger(element, length) {
    return element.length > length;
  }
  
  function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
  
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  }
  
  function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
  
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  }