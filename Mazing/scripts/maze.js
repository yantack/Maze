

function Maze(maze){
    var data = maze;
    var Path = [];
    Object.defineProperty(this, "data", {
        get : function(){ return data; },
        set : function(){  }
    });
    Object.defineProperty(this, "setPath", {set : function(value) {Path.push(value);}});
    this.getPath = function() { return Path; };

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

/*Maze.prototype.GetPaths = function(){}*/

Maze.generate = function(options) {

    var height = options.height;
    var width = options.width;
    var end =[];
    var start = [];
    start[0] = options.start[0];
    start[1] = options.start[1];
    end[0] = options.end[0];
    end[1] = options.end[1];
    var paths = options.paths;
    var getPaths = [];
    var cases =['up','left','right','down'];

    if(height < options.end[1]+1 && width<options.end[0]+1)
        alert('width and height must be more or equal to 8, or use Maze generate to configure generation.');

    var n = height * width - 1;

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
            var curVal = maze[y][x].val;

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

    while (curVal > 1){
        var x = end[1];
        var y = end[0];
        console.log(end);
        console.log(curVal);
        console.log(getPaths);

        cases.sort(function() { return Math.random() - Math.random() } );
        console.log(cases);

        switch (cases[1]){

            case 'left':{
                if (x -1 < 0)break;

                if (maze[y][x-1].val == curVal-1){
                    end = [y,x-1];
                    curVal = maze[end[0]][end[1]].val;
                    maze[y][x-1].Set = 'path';
                    maze[y][x-1].visited = true;
                    maze[y][x-1].right = true;
                    maze[y][x].left = true;
                    getPaths.push(y );
                    getPaths.push(x - 1);
                }
                break;
            }

            case 'up':{
                if (y -1 < 0)break;

                if (maze[y-1][x].val == curVal-1){
                    end = [y-1,x];
                    curVal = maze[end[0]][end[1]].val;
                    maze[y-1][x].Set=='path';
                    maze[y-1][x].visited = true;
                    maze[y-1][x].bottom = true;
                    maze[y][x].top = true;
                    getPaths.push(y - 1);
                    getPaths.push(x);
                }
                break;
            }

            case 'right':{
                if (x +1 >width-1)break;

                if (maze[y][x + 1].val == curVal-1) {
                    end = [y, x + 1];
                    curVal = maze[end[0]][end[1]].val;
                    maze[y][x + 1].Set = 'path';
                    maze[y][x + 1].visited = true;
                    maze[y][x + 1].left = true;
                    maze[y][x].right = true;
                    getPaths.push(y);
                    getPaths.push(x + 1);
                }
                break;
            }

            case 'down':{
                if (y + 1 > height-1)break;

                if (maze[y+1][x].val == curVal-1) {
                    end = [y + 1, x];
                    curVal = maze[end[0]][end[1]].val;
                    maze[y + 1][x].Set = 'path';
                    maze[y + 1][x].visited = true;
                    maze[y + 1][x].top = true;
                    maze[y][x].bottom = true;
                    getPaths.push(y + 1);
                    getPaths.push(x);
                }
                break;
            }

            default : break;


        }

    }

   return new Maze(maze);
}

Maze.View = function (domElem) {

    function init(domElem){
        var container = domElem;
		if (container.hasChildNodes()) {
		container.removeChild(container.childNodes[0]);}
        container.innerHTML = '';
                return container;
    }

    this.render = function(maze){
    var m = maze.data;
    var map = init(domElem);
    var rows = document.createDocumentFragment();
    var items = [];
    var line = [];

    var height = m.length;
    var width = m[0].length;
        var className;
        var div;

        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                if (m [i][j].bottom) {
                    if (m [i][j].right) {
                        var div = document.createElement('div');
                        div.setAttribute('class', 'empty');
                        div.innerHTML = m[i][j].val;
                        items.push(div);
                    }
                    else {
                        var div = document.createElement('div');
                        div.setAttribute('class', 'rightBorder');
                        div.innerHTML = m[i][j].val;
                        items.push(div);
                    }

                } else if (m[i][j].right) {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'bottomBorder');
                    div.innerHTML = m[i][j].val;
                    items.push(div);
                }
                else {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'rbBorder');
                    div.innerHTML = m[i][j].val;
                    items.push(div);
                }
            }
        }


        for (var i = 0; i < height; i++) {

            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            line.push(div);
        }

    for (var k = 0; k < height; k++) {
        rows.appendChild(line[k]);
    }

    var t = 0;
    var k = 0;
    for (var i = 0; i < height; i++) {
        for (t; t < height * width; t++) {

            rows.children[i].appendChild(items[t]);
            k++;
            if (k == width) {
                k = 0;
                t++;
                break;
            }

        }
    }
    map.appendChild(rows);
}
}

function use(){
	
    var height = parseInt(document.getElementById("height").value);
    var width = parseInt(document.getElementById("width").value);

    var maze = Maze.generate({height:height, width:width, start:[1,0], end:[7,7], paths:4});
    var view = new Maze.View(document.querySelector('.map'));

    var x =  view.render(maze);

}
