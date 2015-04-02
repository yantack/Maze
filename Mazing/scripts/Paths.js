/**
 * Created by Andrey on 29.03.2015.
 */

Maze.Path = function(maze,paths){

    var data = paths;
    Object.freeze(data);
    this.mazeP = maze;

}



Maze.prototype.getPaths = function(start, finish,maze){

    var paths = [];

    paths[0] = findEnterStartFinish(finish,maze);
    paths[1] = findEnterStartFinish(start,maze);
	paths[2] = findEnterInPath(start,maze);
	paths[3] = findEnterInPath(finish,maze);
    //return new Maze.Path(maze,paths);
    return new Maze.Path(maze, paths);
}

function findEnterStartFinish(finish,maze){

    var maze = maze.data;
    var height = maze.length;
    var width = maze[0].length;
    var end =[];

    var finish = finish;
    end[0] = finish[0];
    end[1] = finish[1];
    var curVal = maze[end[0]][end[1]].val;
    var pathS = [];

    var cases =['up','left','right','down'];
    while (curVal > 1) {
        var x = end[1];
        var y = end[0];
        curVal = maze[end[0]][end[1]].val;
    console.log(end);
    console.log(curVal);
    console.log(pathS);

    cases.sort(function () {
        return Math.random() - Math.random()
    });
    console.log(cases);

    switch (cases[0]) {

        case 'left':
        {
            if (x - 1 < 0)break;

            if (maze[y][x - 1].val == curVal - 1 && maze[y][x].left == true) {
                end = [y, x - 1];
                maze[y][x].Set = 'pathEF';
                maze[y][x - 1].Set = 'pathEF';
                maze[y][x - 1].visited = true;
                pathS.push({y:y, x:x-1});
            }
            break;
        }

        case 'up':
        {
            if (y - 1 < 0)break;

            if (maze[y - 1][x].val == curVal - 1 && maze[y][x].top == true) {
                end = [y - 1, x];
                maze[y][x].Set = 'pathEF';
                maze[y - 1][x].Set == 'pathEF';
                maze[y - 1][x].visited = true;
                pathS.push({y:y-1, x:x});

            }
            break;
        }

        case 'right':
        {
            if (x + 1 > width - 1)break;

            if (maze[y][x + 1].val == curVal - 1 && maze[y][x].right == true) {
                end = [y, x + 1];
                maze[y][x].Set = 'pathEF';
                maze[y][x + 1].Set = 'pathEF';
                maze[y][x + 1].visited = true;
                pathS.push({y:y, x:x+1});

            }
            break;
        }

        case 'down':
        {
            if (y + 1 > height - 1)break;

            if (maze[y + 1][x].val == curVal - 1 && maze[y][x].bottom == true) {
                end = [y + 1, x];
                maze[y][x].Set = 'pathEF';
                maze[y + 1][x].Set = 'pathEF';
                maze[y + 1][x].visited = true;
                pathS.push({y:y+1, x:x});
            }
            break;
        }

        default :
            break;


    }


}
    return pathS;
}

function findEnterInPath(finish,maze){

    var maze = maze.data;
    var height = maze.length;
    var width = maze[0].length;
    var end =[];
	var exit = 0;

    var finish = finish;
    end[0] = finish[0];
    end[1] = finish[1];
    var curVal = maze[end[0]][end[1]].val;
    var pathS = [];

    var cases =['up','left','right','down'];
    while (curVal > 1) {
        var x = end[1];
        var y = end[0];
        curVal = maze[end[0]][end[1]].val;
    console.log(end);
    console.log(curVal);
    console.log(pathS);

    cases.sort(function () {
        return Math.random() - Math.random()
    });
    console.log(cases);

    switch (cases[0]) {

        case 'left':
        {
            if (x - 1 < 0)break;
			if (maze[y][x - 1].Set == 'path'){
				maze[y][x].Set = 'pathEF';
				exit = 1; break;}	
            if (maze[y][x - 1].val == curVal - 1 && maze[y][x].left == true) {
                end = [y, x - 1];
                maze[y][x].Set = 'pathEF';
                maze[y][x - 1].Set = 'pathEF';
                maze[y][x - 1].visited = true;
                pathS.push({y:y, x:x-1});
            }
            break;
        }

        case 'up':
        {
            if (y - 1 < 0)break;
			if (maze[y - 1][x].Set == 'path'){
				maze[y][x].Set = 'pathEF';
				exit = 1; break;}
            if (maze[y - 1][x].val == curVal - 1 && maze[y][x].top == true) {
                end = [y - 1, x];
                maze[y][x].Set = 'pathEF';
                maze[y - 1][x].Set == 'pathEF';
                maze[y - 1][x].visited = true;
                pathS.push({y:y-1, x:x});

            }
            break;
        }

        case 'right':
        {
            if (x + 1 > width - 1)break;
			if (maze[y][x + 1].Set == 'path'){
				maze[y][x].Set = 'pathEF';
				exit = 1; break;}
            if (maze[y][x + 1].val == curVal - 1 && maze[y][x].right == true) {
                end = [y, x + 1];
                maze[y][x].Set = 'pathEF';
                maze[y][x + 1].Set = 'pathEF';
                maze[y][x + 1].visited = true;
                pathS.push({y:y, x:x+1});

            }
            break;
        }

        case 'down':
        {
            if (y + 1 > height - 1)break;
			if (maze[y + 1][x].Set == 'path'){
				maze[y][x].Set = 'pathEF';
				exit = 1; break;}
            if (maze[y + 1][x].val == curVal - 1 && maze[y][x].bottom == true) {
                end = [y + 1, x];
                maze[y][x].Set = 'pathEF';
                maze[y + 1][x].Set = 'pathEF';
                maze[y + 1][x].visited = true;
                pathS.push({y:y+1, x:x});
            }
            break;
        }

        default :
            break;


    }
	if(exit == 1) break;

}
    return pathS;
}

