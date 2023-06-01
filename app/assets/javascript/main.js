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
});
