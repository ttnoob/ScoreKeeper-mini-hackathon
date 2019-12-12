// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function loadGame(document, game) {
    for (i = 1; i<=4; i++) {
        $('#Player'+i).text(game.players[i-1]);
        console.log("Player " + i + ": " + game.players[i-1]);
    }
    if (game.rounds) {
        // Load first round and more
        // First rounds

        for (i = 1; i<=4; i++) {
            $('#row1 td .val' + i).val(game.rounds[0][i-1]);
            console.log('#row1 td .val' + i + ":" +game.rounds[0][i-1]);
        }
    } else {
        // TODO: add new one round
        for (i = 1; i<=4; i++) {
            $('#row1 td .val' + i).val(i);
            console.log('#row1 td .val' + i);
        }
    } 
}

function updateGame(document, game) {
}

$(document).ready(function() {
    let gameID = getUrlVars()["gameId"];
    console.log("game page loaded with gameId:" + gameID);
    $.get('/game/get', {gameId: gameID}, function (data, textStatus) {
        if (data.success == true) {
            console.log("Get game from server: " + JSON.stringify(data.game));
            // Update PlayerName
            loadGame($(document), data.game);
        }
    });
    if (gameID) {

        $('#addRoundBtn').on("click", function() {
            console.log("addRoundBtn clicked");
        })
    } else {
        console.log("Game Id doesnot exist!!!");
    }
});