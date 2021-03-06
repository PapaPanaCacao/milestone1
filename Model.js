var modelSingleton;
var modelSingletonInstance = false;
//ASSUMING EXCLUSIVE BOUNDS WHILE ITS 0 - (BOUND - 1)

function Model(boardWidth,boardHeight, snakeID)
{
	this.snakeID		 = snakeID;// idea it gets ID from server and associates that snake
								   // with local model
	this.bonuses 	 	 = [];
	this.snakes 	 	 = [];
	this.boardWidth  	 = boardWidth;
	this.boardHeight 	 = boardHeight;
	this.isRunning   	 = 0;
	this.addSnake 		 = genAddSnake(this);
	this.getNumberSnakes = ()=>{return this.snakes.length};
	this.getSnake		 = genGetSnake(this);
	this.getSnakes		 = ()=>{return this.snakes};
	this.growSnake		 = genGrowSnake(this);

	this.changeDirection = genGetChangeDirection(this);//this does not bound check

	this.getBonuses  	 = ()=>{return this.bonuses};
	this.makeBonus 		 = genMakeBonus(this);

	this.getBoardWidth   = ()=>{return this.boardWidth};
	this.getBoardHeight  = ()=>{return this.boardHeight};

	this.newGame = ()=>{
		snakes = [new Snake(2,2, new Vector(0,1), 0), new Snake(4,4, new Vector(0,1), 1)];
		//snakes[0] = new Snake(2,2, new Vector(0,1), 0);
		//snakes[1] = new Snake(4,4, new Vector(0,1), 1);
	}
	this.lastWinner = -1;

	this.getClock
	this.incClock
	this.getModel 	     = ()=>{return this};
	this.getIsRunning    = ()=>{return this.isRunning};
};

function getModel()
{
	if(!modelSingletonInstance) {
		modelSingleton = new Model(12, 9, 0);
		modelSingletonInstance = true;
	}
	return modelSingleton;
}

function genAddSnake(model) // snake adder
{
	function func(snake)
	{
		this.snakes = this.snakes.concat([snake]);
	}
	return func;
}

function genGetSnake(model) // finds snake that is associated with model
{
	function func(ID)
	{
		var i = 0;
		for(; i < model.snakes.length; i++)
		{
			if(ID == model.snakes[i].getID())
			{
				break;
			}
		}
		return model.snakes[i];
	}
	return func;
}

function genGrowSnake(model) // adds new body part
{
	function func(ID)
	{
		var objList = [];
		var snakes  = model.snakes;
		//constructs objList to check if where to put new body part
		for(var i = 0; i < snakes.length; i++)
		{
			objList = objList.concat(snakes[i].getBody());
		}
		//model.getSnake(ID).addBody(objList);
	}
	return func;
}

function genGetChangeDirection(model) //changes direction of snake associated with model
{
	function func(ID,direction)
	{
		snake = model.getSnake(ID);
		snake.changeDirection(direction);
	}
	return func;
}

//generates makeBonus ///////////perhaps we can have a wrapper that checks if bonuses is
							   //under thresh and then call so that every tick you can call
							   //this no issue
function genMakeBonus(model)
{
	//helper function
	//checks an x y to see if there already is object there
	function objectInTheWay(x,y)
	{
		var ret = false;
		var objList = [];
		//constructs objList to compare x y
		model.snakes.map((x)=>{objList.concat(x.body)});
		objList.concat(model.bonuses);
		for(var i = 0; i < objList.length; i++)
		{
			var xy = convertVectorToArray(objList[i]);
			ret = (x == xy[0] && y == xy[1]);
			if(ret)
			{
				break;
			}
		}
		return ret;
	}
	//generated function
	// keeps generating random x and y in bounds
	//until there is no object in the way and returns that x y
	function func()
	{
		x = Math.round(Math.random() % model.boardWidth);
		y = Math.round(Math.random() % model.boardHeight);
		while(objectInTheWay(x,y))
		{
			x = Math.round(Math.random() % model.boardWidth);
			y = Math.round(Math.random() % model.boardHeight);
		}
		model.bonuses = model.bonuses.concat([[x,y]]);
	}
	return func;

	/* //wrapper
	function wrapper()
	{
		if (model.bonuses.length < model.bonusNumber)
		{
			func();
		}
	}

	return wrapper;*/
}

getModel();
