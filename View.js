var viewTest = false;

function ViewSetup()
{
    var inHTML = "";
    var width = getModel().boardWidth;
    var height = getModel().boardHeight;

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

function ViewDraw(xPos, yPos, nbPos, color)
{
    for(var i = 0; i < nbPos; i++)
    {
        var tile = document.getElementById('tile' + (xPos[i] + yPos[i] * getModel().boardWidth));
        tile.className = color;
    }
}

// Just an image
function ViewStartScreen()
{
    ViewResetScreen();

    var lastWin = getModel().lastWinner;
    lastWin = 0;


    if(lastWin == 0)
    {
        var xPos = [1,2,3,5,7,8,9,10, 2,5,7, 2,5,7, 2,5,7,8,9, 2,5,7, 2,5,7, 2,5,7,8,9,10];
        var yPos = [1,1,1,1,1,1,1,1,  2,2,2, 3,3,3, 4,4,4,4,4, 5,5,5, 6,6,6, 7,7,7,7,7,7];
        var nbPos = 4*3+8+5+6;
        ViewDraw(xPos, yPos, nbPos, "tileBonus");
    }
    else if(lastWin == 1 || lastWin == 2)
    {
        //
        // X X X X X  X
        // X X X X XX X
        // X X X X XX X
        // X X X X X XX
        // X X X X X XX
        //  X X  X X  X
        //  X X  X X  X
        //
    }
    else
    {
        var xPos = [1,2,3,4,5,6,7,8,9, 1,5,10, 1,2,3,5,10, 3,5,10, 1,2,3,5,10, 1,6,7,8,9,10, 1];
        var yPos = [1,1,1,1,1,1,1,1,1, 2,2,2,  3,3,3,3,3,  4,4,4,  5,5,5,5,5,  6,6,6,6,6,6,  7];
        var nbPos = 9+3+5+3+5+6+1;
        var xPos2 = [7,9,6,7,8,9];
        var yPos2 = [3,3,4,5,5,5];
        var nbPos2 = 2+1+3;

        ViewDraw(xPos, yPos, nbPos, "tileSnakeA");
        ViewDraw(xPos2, yPos2, nbPos2, "tileHeadB");
    }
}

function ViewGame()
{
    var width = getModel().boardWidth;
    var height = getModel().boardHeight;

    // Tiles reset
    ViewResetScreen();

    // Test Refresh
    viewTest = (viewTest == false);
    var ccbb = "tileHeadA";
    if(viewTest)
        ccbb = "tileHeadB";
    var tile = document.getElementById('tile10');
    tile.className = ccbb;

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
    if(getModel().isRunning == 1)
        ViewGame();
    else
        ViewStartScreen();
}

ViewSetup();
ViewRefresh();
