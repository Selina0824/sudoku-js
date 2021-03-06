//生成数独游戏


//1.生成完成的解决方案：generator

//2.随机去除部分数据：按比例

const Generator = require('./generator');

module.exports = class Sudoku {

    constructor(){
        //生成完整的解决方案
        const gen = new Generator()
        gen.generate();
        this.solutionMatrix = gen.matrix;
    }

    make(level=5){
        //生成谜盘
        this.puzzleMatrix = this.solutionMatrix.map(row =>{
            return row.map(cell => Math.random()*9 < level? 0:cell);
        })
    }
}
