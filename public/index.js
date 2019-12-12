$(document).ready(function() {
    $('#addRoundBtn').on("click", function() {
        console.log("addRoundBtn clicked");
        let isEmptyName = false;
        let i = 0;
        $('.playername').each(function() {
            if ($(this).val())
                console.log('player name [' + i +']: '  + $(this).val());
            else {
                console.log('player name [' + i +']: empty!!!');
                isEmptyName = true;
                return false;
            }
            i++;
        })
        if (isEmptyName) {
            alert('Missing players\' name');
        }
        // send to the backend
    })
});