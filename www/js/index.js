/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * 矩阵和数组工具
 */
var matrixToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix: function makeMatrix() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        function makeRow() {
            var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var array = new Array(9);
            array.fill(v);
            return array;
        }

        return Array.from({
            length: 9
        }, function () {
            return makeRow(v);
        }); //Array.from的第二个参数是一个map（）函数
        // .map(() => makeRow(v));
    },


    /*
     *随机位置，采用Fisher-Yates洗牌算法
     */
    shuffle: function shuffle(array) {
        var endIndex = array.length - 2;
        for (var i = 0; i < endIndex; i++) {
            var j = i + Math.floor(Math.random() * (array.length - i));
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },


    /** 
     * 检查指定位置是否可以填数字n
     */

    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        var row = matrix[rowIndex];
        var col = this.makeRow().map(function (value, index) {
            return matrix[index][colIndex];
        });
        //得到宫的Index
        /** 
         * 要点：
         * 1.宫序号和宫坐标（3x3）之间的转换
         * 2.宫内第0个方格的行列坐标
         * 3.指定方格在宫内的行列坐标（偏移）
         */
        // const boxIndex = boxToolkit.convertToBoxIndex(rowIndex,colIndex).boxIndex;
        //解构语法

        var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$convertTo.boxIndex;

        var box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || col[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
};

/**  
 * 检查算法： 按行、按列、按宫
 */
/** 
 * 宫坐标系工具
 */
var boxToolkit = {
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var box = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            box.push(matrix[rowIndex][colIndex]);
        }

        return box;
    },
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};

//工具类

module.exports = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        /** 
         * 矩阵和数组相关工具类
         */
        get: function get() {
            return matrixToolkit;
        }

        /** 
         * 宫坐标系相关工具类
         */

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案

var Toolkit = __webpack_require__(0);

module.exports = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: 'generate',
        value: function generate() {
            while (!this.internalGenerate()) {
                console.log('Try Again');
            }
        }
    }, {
        key: 'internalGenerate',
        value: function internalGenerate() {
            this.matrix = Toolkit.matrix.makeMatrix();
            this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
                return row.map(function (value, index) {
                    return index;
                });
            }).map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });
            // 入口方法
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'fillNumber',
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }

        /** 
         * fillRow() 函数通过递归调用，把数字n在所有row的所有位置都尝试一遍，最终找到合适的解决方案；
        */

    }, {
        key: 'fillRow',
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }

            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex];
            for (var i = 0; i < 9; i++) {
                //找随机列
                var colIndex = orders[i];
                //如果当前位置有值，跳过
                if (row[colIndex]) {
                    continue;
                }

                //检查当前位置是否可以填n
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n;

                //当前行填写n成功，递归调用 fillRow() 来在下一行中填写 n，如果填写失败，继续寻找当前行的下一个合适位置
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }

                return true;
            }

            //如果整个for循环都没有return true
            return false;
        }
    }]);

    return Generator;
}();

// const generator = new Generator();
// generator.generate();
// console.log(generator.matrix)

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(3);
var PopupNumbers = __webpack_require__(6);

var grid = new Grid($('#container'));
grid.build();
grid.layout();

var popupNumbers = new PopupNumbers($('#popupNumbers'));
grid.bindPopup(popupNumbers);

$("#check").on('click', function (e) {
    if (grid.check()) {
        alert('成功~O(∩_∩)O哈哈~ I Love you.');
    };
});

$("#set").on('click', function (e) {
    grid.reset();
});

$("#clear").on('click', function (e) {
    grid.clear();
});

$("#rebuild").on('click', function (e) {
    grid.rebuild();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);
var Generator = __webpack_require__(1);
var Sudoku = __webpack_require__(4);
var Checker = __webpack_require__(5);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: 'build',
        value: function build() {
            // const matrix = Toolkit.matrix.makeMatrix();
            // const generator = new Generator();
            // generator.generate();
            // const matrix = generator.matrix;
            var sudoku = new Sudoku();
            sudoku.make();
            var matrix = sudoku.solutionMatrix;

            var rowGroupClass = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
            var colGroupClass = ['col_g_left', 'col_g_center', 'col_g_right'];

            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $('<span>').addClass(colGroupClass[colIndex % 3]).addClass(cellValue ? 'fixed' : 'empty click').text(cellValue);
                });
            });

            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $('<div>').addClass('row').addClass(rowGroupClass[rowIndex % 3]).append($spanArray);
            });

            this._$container.append($divArray);
        }
    }, {
        key: 'layout',
        value: function layout() {
            var width = $('span:first', this._$container).width();
            $('span', this._$container).height(width).css({
                "line-height": width + 'px',
                "font-size": width < 32 ? width / 2 + 'px' : ''
            });
        }
    }, {
        key: 'bindPopup',
        value: function bindPopup(popupNumbers) {
            //jquery事件代理
            this._$container.on('click', 'span.click', function (e) {
                var $cell = $(e.target);
                popupNumbers.popup($cell);
            });
        }

        //检查用户解谜的结果，成功：提示；失败：标记

    }, {
        key: 'check',
        value: function check() {

            //从界面获取需要检查的数据
            var $rows = this._$container.children();
            var data = $rows.map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }) //一行数据，此时为jQuery 对象
            .toArray().map(function ($data) {
                return $data.toArray();
            });

            console.log(data);
            var checker = new Checker(data);

            if (checker.check()) {
                return true;
            } else {
                //检查不成功，标价
                var marks = checker._markMatrix;
                this._$container.children().each(function (rowIndex, div) {
                    $(div).children().each(function (colIndex, span) {

                        var $span = $(span);
                        var spanValue = $span.text();
                        if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
                            $span.removeClass('error');
                        } else if (spanValue != 0) {
                            if (!marks[rowIndex][colIndex]) $span.addClass('error');
                        }
                    });
                });
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            //重置当前迷盘到初始状态
            this._$container.find('span:not(.fixed)').removeClass('error mark1 mark2').addClass('empty').text(0);
        }
    }, {
        key: 'clear',
        value: function clear() {
            //清除错误标记
            this._$container.find('span').removeClass('error mark1 mark2');
        }

        //开始新的一局

    }, {
        key: 'rebuild',
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏


//1.生成完成的解决方案：generator

//2.随机去除部分数据：按比例

var Generator = __webpack_require__(1);

module.exports = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        //生成完整的解决方案
        var gen = new Generator();
        gen.generate();
        this.solutionMatrix = gen.matrix;
    }

    _createClass(Sudoku, [{
        key: 'make',
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            //生成谜盘
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//检查数独解决方案
//1.sort()-->join()---->对比
//2.使用生成标记的方法

function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);

    for (var i = 0; i < length - 1; i++) {
        if (!marks[i]) {
            continue; //continue 跳出循环
        }
        var v = array[i];
        //是否有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        //是否有重复 从i+1~length
        for (var j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }

    return marks;
}

// console.log(checkArray([1,6,4,5,7,5,2,3,0,4]))


var Toolkit = __webpack_require__(0);
/** 
 * 输入：matrix
 * 处理：对matrix进行行、列、宫检查，并填写marks
 * 输出：是否检查成功、marks
*/
module.exports = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._markMatrix = Toolkit.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: 'check',
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();

            //检查每一个是否成功
            this._success = this._markMatrix.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._success;
        }
    }, {
        key: 'checkRows',
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var row = this._matrix[rowIndex];
                var marks = checkArray(row);

                //检查marks
                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._markMatrix[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'checkCols',
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }

                var marks = checkArray(cols);

                //检查marks
                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._markMatrix[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'checkBoxes',
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);

                //找到对应位置并标记
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _Toolkit$box$convertF.rowIndex,
                            colIndex = _Toolkit$box$convertF.colIndex;

                        this.markMatrix[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'isSuccess',
        get: function get() {
            return this._success;
        }
    }, {
        key: 'markMatrix',
        get: function get() {
            return this._markMatrix;
        }
    }]);

    return Checker;
}();

// const Generator = require('./generator')
// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
// console.log(matrix);

// const checker = new Checker(matrix);
// console.log('check results:',checker.check(matrix));
// console.log(checker.markMatrix);

// matrix[1][2] =0;
// const checker2 = new Checker(matrix);
// console.log('check results:',checker2.check(matrix));
// console.log(checker2.markMatrix);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//处理弹出的操作面板
//显示、隐藏、回填、mark

module.exports = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass('hidden');

        this._$panel.on('click', 'span', function (e) {
            var $span = $(e.target);
            var $cell = _this._$targetCell;
            if ($span.hasClass('mark1')) {
                //回填样式
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1');
                } else {
                    $cell.removeClass('mark2').addClass('mark1');
                }
            } else if ($span.hasClass('mark2')) {
                //回填样式
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2');
                } else {
                    $cell.removeClass('mark1').addClass('mark2');
                }
            } else if ($span.hasClass('empty')) {
                //清除数字和样式
                $cell.text(0).addClass('empty');
            } else {
                $cell.removeClass('empty').text($span.text());
            }

            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: 'popup',
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + 'px',
                top: top + 'px'
            }).show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map