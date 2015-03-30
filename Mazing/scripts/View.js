/**
 * Created by Andrey on 29.03.2015.
 */
Maze.View = function (domElem) {

   var init = function(domElem) {
        var container = domElem;
        if (container.hasChildNodes()) {
            container.removeChild(container.childNodes[0]);
        }
        container.innerHTML = '';
        return container;
    };

    this.render = function(maze,path){
        if(maze instanceof Maze){
        var m = maze.data;
        var map = init(domElem);
        var rows = document.createDocumentFragment();
        var items = [];
        var line = [];

        var height = m.length;
        var width = m[0].length;
        var classStyle;
        var div;

            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    if (m [i][j].bottom) {
                        if (m [i][j].right) {
                            div = document.createElement('div');
                            div.setAttribute('class', 'empty');
                            div.innerHTML = m[i][j].val;
                            items.push(div);
                        }
                        else {
                            div = document.createElement('div');
                            div.setAttribute('class', 'rightBorder');
                            div.innerHTML = m[i][j].val;
                            items.push(div);
                        }

                    } else if (m[i][j].right) {
                        div = document.createElement('div');
                        div.setAttribute('class', 'bottomBorder');
                        div.innerHTML = m[i][j].val;
                        items.push(div);
                    }
                    else {
                        div = document.createElement('div');
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


    }/*else{
            var m = maze.mazeP.data;
            var map = init(domElem);
            var rows = document.createDocumentFragment();
            var items = [];
            var line = [];

            var height = m.length;
            var width = m[0].length;
            var classStyle;
            var div;
            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    if (m [i][j].bottom) {
                        if (m [i][j].right) {
                            div = document.createElement('div');
                            div.setAttribute('class', 'empty');
                            classStyle = (m[i][j].Set == 'path') ? div.innerHTML = '<img src="\images/octopus.png"\width="25" height="25">'
                                : div.innerHTML = '';
                            items.push(div);
                        }
                        else {
                            div = document.createElement('div');
                            div.setAttribute('class', 'rightBorder');
                            classStyle = (m[i][j].Set == 'path') ? div.innerHTML = '<img src="\images/octopus.png"\width="25" height="25">'
                                : div.innerHTML = '';
                            items.push(div);
                        }

                    } else if (m[i][j].right) {
                        div = document.createElement('div');
                        div.setAttribute('class', 'bottomBorder');
                        classStyle = (m[i][j].Set == 'path') ? div.innerHTML = '<img src="\images/octopus.png"\width="25" height="25">'
                            : div.innerHTML = '';
                        items.push(div);
                    }
                    else {
                        div = document.createElement('div');
                        div.setAttribute('class', 'rbBorder');
                        classStyle = (m[i][j].Set == 'path') ? div.innerHTML = '<img src="\images/octopus.png"\width="25" height="25">'
                            : div.innerHTML = '';
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
                for (t; t < m.height * width; t++) {

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
        }*/


    }
};


