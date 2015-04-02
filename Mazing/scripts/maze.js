

function Maze(maze){
    var data = maze;
    var Path = [];
    Object.defineProperty(this, "data", {
        get : function(){ return data; },
        set : function(){  }
    });

}

Maze.Cell = function (val,right,bottom,left,top){
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.val = val;
    this.visited = false;
    this.Set = 'empty';

}

Maze.generate = function(options) {

    var height = (options.height) ? options.height : Math.floor(Math.random( ) * (10 - 5 + 1)) + 5;
    var width = (options.width) ? options.width : Math.floor(Math.random( ) * (10 - 5 + 1)) + 5;
    var end =[];
    var start = [];
    start[0] = (isNaN(options.start[0])) ? 0 : options.start[0];
    start[1] = (isNaN(options.start[1])) ? 1 : options.start[1];
    end[0] = (isNaN(options.end[0])) ? height-1 : options.end[0];
    end[1] = (isNaN(options.end[1])) ? width-1 : options.end[1];
	var curVal = 0;
    var paths = (options.paths) ? options.paths : 2;
    var genPaths = [];
    var cases =['up','left','right','down'];
    var endForGen = [];
    endForGen[0] = end[0];
    endForGen[1] = end[1];

    var maze = [];
    for (var i = 0; i < height; i++) {
        maze[i] = [];
        for (var j = 0; j < width; j++) {
            maze[i][j] = new Maze.Cell(0, false, false, false, false);
        }
    }

    maze[start[0]][start[1]].val = 1;
    maze[start[0]][start[1]].visited = true;
        var queue = start;

    while (queue.length) {

            var y = queue.shift();
            var x = queue.shift();
            curVal = maze[y][x].val;

            // check each of the neighbours
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (Math.abs(i) == Math.abs(j) || y + i < 0 || y + i >= height || x + j < 0 || x + j >= width)
                        continue;

                    if (maze[y + i][x + j].visited == false) {
                        maze[y + i][x + j].val = curVal + 1;
                        maze[y + i][x + j].visited = true;
                        queue.push(y + i);
                        queue.push(x + j);
                        if ((y + i) > y && (x + j) == x) {
                            maze[y + i][x + j].top = true;
                            maze[y][x].bottom = true;
                        } else if ((y + i) < y && (x+j) == x) {
                            maze[y + i][x + j].bottom = true;
                            maze[y][x].top = true;
                        }
                        else if ((y + i) == y && (x+j) > x) {
                            maze[y + i][x + j].left = true;
                            maze[y][x].right = true;
                        }
                        else if ((y + i) == y && (x+j) < x) {
                            maze[y + i][x + j].right = true;
                            maze[y][x].left = true;
                        }
                    }
                }
            }

        }
	
    while(paths) {
        while (curVal > 1) {
            var x = end[1];
            var y = end[0];
            curVal = maze[end[0]][end[1]].val;
            console.log(end);
            console.log(curVal);
            console.log(genPaths);

            cases.sort(function () {
                return Math.random() - Math.random()
            });
            console.log(cases);

            switch (cases[1]) {

                case 'left':
                {
                    if (x - 1 < 0)break;

                        if (maze[y][x - 1].val == curVal - 1) {
                            end = [y, x - 1];
                            maze[y][x].Set = 'path';
                            maze[y][x - 1].Set = 'path';
                            maze[y][x - 1].visited = true;
                            maze[y][x - 1].right = true;
                            maze[y][x].left = true;
                            genPaths.push(y);
                            genPaths.push(x - 1);

                        }
                        break;
                }

                case 'up':
                {
                    if (y - 1 < 0)break;

                        if (maze[y - 1][x].val == curVal - 1) {
                        end = [y - 1, x];
                            maze[y][x].Set = 'path';
                        maze[y - 1][x].Set == 'path';
                        maze[y - 1][x].visited = true;
                        maze[y - 1][x].bottom = true;
                        maze[y][x].top = true;
                        genPaths.push(y - 1);
                        genPaths.push(x);
                        }
                        break;
            }

                case 'right':
                {
                    if (x + 1 > width - 1)break;

                        if (maze[y][x + 1].val == curVal - 1) {
                            end = [y, x + 1];
                            maze[y][x].Set = 'path';
                            maze[y][x + 1].Set = 'path';
                            maze[y][x + 1].visited = true;
                            maze[y][x + 1].left = true;
                            maze[y][x].right = true;
                            genPaths.push(y);
                            genPaths.push(x + 1);
                        }
                        break;
                }

                case 'down':
                {
                    if (y + 1 > height - 1)break;

                        if (maze[y + 1][x].val == curVal - 1) {
                        end = [y + 1, x];
                            maze[y][x].Set = 'path';
                        maze[y + 1][x].Set = 'path';
                        maze[y + 1][x].visited = true;
                        maze[y + 1][x].top = true;
                        maze[y][x].bottom = true;
                        genPaths.push(y + 1);
                        genPaths.push(x);
                        }
                        break;
                }

            default :
                break;


        }

    }
        end[0] = endForGen[0];
        end[1] = endForGen[1];
        curVal = maze[end[0]][end[1]].val;
        paths --;
}
   return new Maze(maze);
}



function use(){
	
    var height = parseInt(document.getElementById("height").value);
    var width = parseInt(document.getElementById("width").value);
    var startPath = (document.getElementById("start").value);
    var finishPath = (document.getElementById("end").value);
    var start = [];
    var end = [];
    start.push(parseInt(startPath.charAt(0)));
    start[1]= (startPath.length == 5) ? parseInt(startPath.charAt(3)) :parseInt(startPath.charAt(2));
    end[0]= parseInt(finishPath.charAt(0));
    end[1]= (finishPath.length == 5) ? parseInt(finishPath.charAt(3)) :parseInt(finishPath.charAt(2));
    console.log(start);
    console.log(end);
    var paths = parseInt(document.getElementById("paths").value);
    var maze = Maze.generate({height:height, width:width, start:start, end:end, paths:paths});
    var view = new Maze.View(document.querySelector('.map'));
    var x;
    x = view.render(maze);
    var getPaths = maze.getPaths([3,3],[4,5],maze);
    console.log(getPaths);
    /*view.render(getPaths);*/

    setTimeout(function () {
        view.render(getPaths);
    }, 5000);


}
