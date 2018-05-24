const Toolkit = require('../core/toolkit');
const Generator = require('../core/generator');
const Sudoku = require('../core/sudoku');
const Checker = require('../core/check');

class Grid{
    constructor(container){
        this._$container = container;
    }

    build(){
        // const matrix = Toolkit.matrix.makeMatrix();
        // const generator = new Generator();
        // generator.generate();
        // const matrix = generator.matrix;
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.solutionMatrix;

        const rowGroupClass = ['row_g_top','row_g_middle','row_g_bottom'];
        const colGroupClass = ['col_g_left','col_g_center','col_g_right'];

        const $cells = matrix.map(rowValues => rowValues
            .map((cellValue,colIndex) =>{
                return $('<span>')
                    .addClass(colGroupClass[colIndex % 3])
                    .addClass(cellValue? 'fixed':'empty click')
                    .text(cellValue);
        }));

        const $divArray = $cells.map(($spanArray,rowIndex) =>{
            return $('<div>')
                .addClass('row')
                .addClass(rowGroupClass[rowIndex%3])
                .append($spanArray);
        });

        this._$container.append($divArray);
    }

    layout(){
        const width = $('span:first',this._$container).width();
        $('span',this._$container)
            .height(width)
            .css({
                "line-height":`${width}px`,
                "font-size": width<32?`${width/2}px`:''
            });
    }

    bindPopup(popupNumbers){
        //jquery事件代理
        this._$container.on('click','span.click', e =>{
            const $cell = $(e.target);
            popupNumbers.popup($cell);
        })
    }

    //检查用户解谜的结果，成功：提示；失败：标记
    check(){
        
        //从界面获取需要检查的数据
        const $rows = this._$container.children();
        const data = $rows
            .map((rowIndex, div) => {
                return $(div).children()
                    .map((colIndex, span) => parseInt($(span).text())|| 0);
            })               //一行数据，此时为jQuery 对象
            .toArray()
            .map($data => $data.toArray());

        console.log(data);
        const checker = new Checker(data);

        if(checker.check()){
            return true;
        } else {
            //检查不成功，标价
            const marks = checker._markMatrix;
            this._$container.children()
                .each((rowIndex, div) => {
                    $(div).children()
                        .each((colIndex, span) =>{

                            const $span = $(span);
                            var spanValue = $span.text();
                            if($span.is('.fixed') || marks[rowIndex][colIndex]) {
                                $span.removeClass('error');
                            }else if(spanValue != 0){
                                if(!marks[rowIndex][colIndex]) $span.addClass('error'); 
                            }
                        })
                })
        }
    }

    reset(){
        //重置当前迷盘到初始状态
        this._$container.find('span:not(.fixed)')
            .removeClass('error mark1 mark2')
            .addClass('empty')
            .text(0);

    }

    clear(){
        //清除错误标记
        this._$container.find('span')
            .removeClass('error mark1 mark2');

    }

    //开始新的一局
    rebuild(){
        this._$container.empty();
        this.build();
        this.layout();
    }
}

module.exports = Grid;