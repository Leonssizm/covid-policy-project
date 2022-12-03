const antibodiesModalElement = document.getElementById('antibodies-test-modal')
const testDateModalElement = document.getElementById('testDate-amountOfAntibodies')
const covidDateModalElement = document.getElementById('covidDate');

const antiBodiesTestYes = document.getElementById('antiBodiesTestYes');
const antiBodiesTestNo = document.getElementById("antiBodiesTestNo");

// show and hide modals
function showAntibodiesQuestion(answer) {
    antibodiesModalElement.style.display = answer === 'yes' ? 'block' : 'none' 
}

antiBodiesTestYes.addEventListener('click', function antibodiesModal() {
    testDateModalElement.style.display='block'
    covidDateModalElement.style.display='none'
})

antiBodiesTestNo.addEventListener('click', function covidDateInput() {
    testDateModalElement.style.display='none'
    covidDateModalElement.style.display='block'
})

