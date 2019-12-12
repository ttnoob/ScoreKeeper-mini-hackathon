$(document).ready(function () {
    $('#addRoundBtn').on("click", function () {
        console.log("addRoundBtn clicked");
        let isEmptyName = false;
        let i = 0;
        players = [];
        $('.playername').each(function () {
            if ($(this).val()) {
                console.log('player name [' + i + ']: ' + $(this).val());
                players.push($(this).val());
            }
            else {
                console.log('player name [' + i + ']: empty!!!');
                isEmptyName = true;
                return false;
            }
            i++;
        })
        if (isEmptyName) {
            alert('Missing players\' name');
        }
        // send to the backend
        console.log("Prepare send to server: " + JSON.stringify({ players }));
        $.post("/game/create", { players },function (data) {
                console.log("Add new game response: " + JSON.stringify(data));
                if (data.success == true) {
                    console.log("Add new game response OK, gameId: ", data.gameId);
                    window.location.href='game.html?gameId='+data.gameId;
                    // location.reload(true);
                }
            }, "json");
    })
});