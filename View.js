function ViewSetup()
{
    var inHTML = "";
    var width = 12;
    var height = 9;

    for(var y = 0; y < height; y++)
    {
        inHTML += '<tr>';
        for(var x = 0; x < width; x++)
        {
            inHTML += '<td class="tileEmpty" id="tile'+ (x + y*width) +'"></td>';
        }
        inHTML += '</tr>';
    }

    var table = document.getElementById("gameBoard");
    table.innerHTML = inHTML;
}

// Makes the board empty
function ViewResetScreen()
{
    var width = 12;
    var height = 9;

    for(var y = 0; y < height; y++)
    {
        for(var x = 0; x < width; x++)
        {
            var tile = document.getElementById('tile' + (x+y*width));
            tile.className = "tileEmpty";
        }
    }
}

function ViewStartScreen()
{
    var width = 12;
    var height = 9;

    ViewResetScreen();

    var xPos = [1,2,3,4,5,6,7,8,9, 1,5,10, 1,2,3,5,10, 3,5,10, 1,2,3,5,10, 1,6,7,8,9,10, 1];
    var yPos = [1,1,1,1,1,1,1,1,1, 2,2,2,  3,3,3,3,3,  4,4,4,  5,5,5,5,5,  6,6,6,6,6,6,  7];
    var nbPos = 9+3+5+3+5+6+1;
    var xPos2 = [7,9,6,7,8,9];
    var yPos2 = [3,3,4,5,5,5];
    var nbPos2 = 2+1+3;

    for(var i = 0; i < nbPos; i++)
    {
        var tile = document.getElementById('tile' + (xPos[i] + yPos[i] * width));
        tile.className = "tileSnakeA";
    }
    for(var i = 0; i < nbPos2; i++)
    {
        var tile = document.getElementById('tile' + (xPos2[i] + yPos2[i] * width));
        tile.className = "tileHeadB";
    }
}

function ViewGame()
{
    var width = 12;
    var height = 9;

    // Tiles reset
    ViewResetScreen();

    // look at the snakes, heads and bonus to put them where they belong
    // FOREACH element in snake
    //      var tile = document.getElementById('tile' + (x+y*width))
    //      tile.className = "tileSnakeX"

    // FOREACH head
    //      var tile = document.getElementById('tile' + (x+y*width))
    //      tile.className = "tileHeadX"

    // For bonus pos
    //      var tile = document.getElementById('tile' + (x+y*width))
    //      tile.className = "tileBonus"
}

function ViewRefresh()
{
    // If game is running
    ViewStartScreen();
    //ViewGame();
}

ViewSetup();
ViewRefresh();
