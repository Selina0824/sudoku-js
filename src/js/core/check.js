//检查数独解决方案
//1.sort()-->join()---->对比
//2.使用生成标记的方法

function checkArray(array){
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);

    for(let i=0; i<length-1; i++){
        if(!marks[i]){
            continue;              //continue 跳出循环
        }
        const v= array[i];
        //是否有效
        if(!v){
            marks[i] = false;
            continue;
        }
        //是否有重复 从i+1~length
        for(let j = i+1 ; j<length; j++) {
            if(v === array[j]){
                marks[i]=marks[j] = false;
            }
        }
    }

    return marks;
}

// console.log(checkArray([1,6,4,5,7,5,2,3,0,4]))


const Toolkit = require('./toolkit');
/** 
 * 输入：matrix
 * 处理：对matrix进行行、列、宫检查，并填写marks
 * 输出：是否检查成功、marks
*/
module.exports = class Checker{

    constructor(matrix){
        this._matrix = matrix;
        this._markMatrix = Toolkit.matrix.makeMatrix(true);
    }

    get isSuccess(){
        return this._success;
    }

    get markMatrix(){
        return this._markMatrix
    }

    check(){
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        
        //检查每一个是否成功
        this._success = this._markMatrix.every(row=>row.every(mark=>mark));
        return this._success;
    }

    checkRows(){
        for(let rowIndex = 0; rowIndex<9; rowIndex++ ){
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);

            //检查marks
            for(let colIndex = 0;colIndex<marks.length; colIndex++){
                if(!marks[colIndex]){
                    this._markMatrix[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkCols(){
        for(let colIndex= 0; colIndex<9;colIndex++){
            const cols= [];
            for(let rowIndex = 0;rowIndex<9; rowIndex++){
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(cols);

            //检查marks
            for(let rowIndex = 0;rowIndex<marks.length; rowIndex++){
                if(!marks[rowIndex]){
                    this._markMatrix[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkBoxes(){
        for(let boxIndex= 0; boxIndex<9; boxIndex++){
            const boxes = Toolkit.box.getBoxCells(this._matrix,boxIndex);
            const marks = checkArray(boxes);

            //找到对应位置并标记
            for(let cellIndex=0;cellIndex<9;cellIndex++){
                if(!marks[cellIndex]){
                    const { rowIndex,colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex,cellIndex);
                    this.markMatrix[rowIndex][colIndex] = false;
                }
            }
        }
    }
}


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