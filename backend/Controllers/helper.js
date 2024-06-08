function helper(inputDateStr) {
    // Input string
    

    // Get the current year
    let currentYear = new Date().getFullYear();

    // Convert the month abbreviation to a numerical representation
    let monthAbbreviation = inputDateStr.substring(0, 3);
    let monthNumber = new Date(`${monthAbbreviation} 01 ${currentYear}`).getMonth() + 1; // Adding 1 because months are zero-indexed

    // Extract the day
    let day = inputDateStr.substring(4);

    // Create the formatted date string
    let formattedDate = `${currentYear}-${monthNumber.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;

    console.log(formattedDate);
    return formattedDate;

}

function dateobjtostr(currentDate) {
    // Create a new Date object
    

    // Get the year, month, and day
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    let day = currentDate.getDate().toString().padStart(2, '0');

    // Create the formatted date string
    let formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);
    return formattedDate;

}


module.exports={helper,dateobjtostr}