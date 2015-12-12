function verso(game) {
    var gameName = $('<div>').addClass('game-name').text(game.title);
    var cardVerso = $('<div>').addClass('card-verso');
    cardVerso.append(gameName);
    cardVerso.append($('<span class="helper"></span>'));
    cardVerso.append($('<img src="' + game.cover + '">'));
    return cardVerso;
}

function header(character) {
    var header = $('<div>').addClass('header');
    var characterPicture = $('<div>').addClass('character-picture').append($('<img>').attr('src', character.face));
    header.append(characterPicture);

    var characterName = $('<div>').addClass('character-name');
    characterName.append($('<span>').text(character.firstname));
    characterName.append('<br/>');
    characterName.append($('<span>').text(character.lastname.toUpperCase()));

    header.append(characterName);
    return header;
}

function name(game) {
    return $('<div>').
        addClass('game-name').
        text(game.title);
}

function moveName(move) {
    return $('<div>').
        addClass('move-name').
        text(move.name);
}

function createCommand(command) {
    var commandPart;
    switch (command) {
        case 'A':
        case 'B':
        case 'C':
        case 'D':
            commandPart = $('<span>').addClass('but' + command);
            break;
        case 'b':
        case 'd':
        case 'db':
        case 'df':
        case 'dp':
        case 'f':
        case 'hcb':
        case 'hcf':
        case 'qcb':
        case 'qcf':
        case 'rdp':
        case 'u':
        case 'ub':
        case 'uf':
        case 'qfd':
        case 'uhcf':
        case 'troissix':
            commandPart = $('<i>').addClass(command);
            break;
        case '+':
            commandPart = $('<span>').addClass('plus').text('+');
            break;
        default:
            commandPart = $('<span>').addClass('text').text(command);
    }
    return commandPart;
}

function commands(commands) {
    var commandsPart = $('<div>').addClass('moves');
    commands.forEach(function (command) {
        commandsPart.append(createCommand(command));
    });
    return commandsPart;
}

function drawMove(move) {
    var movePart = $('<div>').addClass('move');
    movePart.append(moveName(move));
    movePart.append(commands(move.commands));
    return movePart;
}

function moves(moves) {
    var moveListPart = $('<div>').addClass('move-list');
    moves.forEach(function (move) {
        moveListPart.append(drawMove(move));
    });
    return moveListPart;
}

function recto(character, game) {
    var cardRecto = $('<div>').addClass('card-recto');
    cardRecto.append(name(game));
    cardRecto.append(header(character));
    cardRecto.append(moves(character.moves));
    return cardRecto;
}

function topLeft() {
    return $('<div>').addClass('top-left');
}
function topCenter() {
    return $('<div>').addClass('top-center');
}
function topRight() {
    return $('<div>').addClass('top-right');
}
function leftSide() {
    return $('<div>').addClass('left-side');
}
function rightSide() {
    return $('<div>').addClass('right-side');
}
function bottomLeft() {
    return $('<div>').addClass('bottom-left');
}
function bottomCenter() {
    return $('<div>').addClass('bottom-center');
}
function bottomRight() {
    return $('<div>').addClass('bottom-right');
}


function insertIntoMargins(body, card) {
    var sheet = $('<div>').addClass('sheet');
    body.append(sheet);
    sheet.append(topLeft());
    sheet.append(topCenter());
    sheet.append(topRight());
    sheet.append(leftSide());
    sheet.append(card);
    sheet.append(rightSide());
    sheet.append(bottomLeft());
    sheet.append(bottomCenter());
    sheet.append(bottomRight());
    return sheet;
}
function drawMoveList(el, character, game) {
    var body = el ? el : $('body');

    var printMode = document.location.search.indexOf("print") != -1;
    var rectoCard = recto(character, game);
    var versoCard = verso(game);
    if (printMode) {
        insertIntoMargins(body, rectoCard);
        insertIntoMargins(body, versoCard);
    } else {
        body.append(rectoCard);
    }

}

function draw(game) {
    game.characters.forEach(function (character) {
        drawMoveList(undefined, character, game);
    });
}