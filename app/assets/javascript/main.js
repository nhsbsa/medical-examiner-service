// ES6 or Vanilla JavaScript
$(document).ready(function() {

    const months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    };

    $(".convert-month").text(function () {
        const month = $(this).text();
        console.log("month:", month);
        console.log("months[month]:", months[month]);
        return months[month];
    });

    // Get the select element and the target elements
    const select = document.getElementById('reports');
    const noReport = document.getElementById('no-report');
    const generateReport = document.getElementById('generate-report');

    // Add an event listener to the select element
    select.addEventListener('change', function() {
    // Check the selected value
    if (select.value === '2') {
        // Add the 'hidden' class to the div and remove it from the paragraph
        noReport.classList.add('hidden');
        generateReport.classList.remove('hidden');
    } else {
        // Remove the 'hidden' class from the div and add it to the paragraph
        noReport.classList.remove('hidden');
        generateReport.classList.add('hidden');
    }
    });

});


// Character count


var textarea = document.querySelector(".minchar"),
    output = document.querySelector(".rechar");
var maxLength = +textarea.getAttribute("maxlength");

function outputRemainingCharacters(){
    let used = textarea.value.length;
    output.innerText = `${maxLength - +used} characters remaining`;
}

textarea.addEventListener('keydown', function(event) {

    outputRemainingCharacters();
    let used = textarea.value.length;
    if (maxLength - used == 0) {
        output.style.color = "#4c6272";
    } else if (maxLength - used <= 100) {
        output.style.color = "#4c6272";
    } else {
        output.style.color = "#4c6272"; //Default color
    }

});

window.onload = outputRemainingCharacters

