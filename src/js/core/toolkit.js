/** 
 * 矩阵和数组工具
 */
const matrixToolkit = {

    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0) {
        function makeRow(v = 0) {
            const array = new Array(9);
            array.fill(v);
            return array;
        }

        return Array.from({
            length: 9
        }, () => makeRow(v)); //Array.from的第二个参数是一个map（）函数
        // .map(() => makeRow(v));
    },

    /*
     *随机位置，采用Fisher-Yates洗牌算法
     */
    shuffle(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i < endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    /** 
     * 检查指定位置是否可以填数字n
     */

    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const col = this.makeRow().map((value, index) => matrix[index][colIndex]);
        //得到宫的Index
        /** 
         * 要点：
         * 1.宫序号和宫坐标（3x3）之间的转换
         * 2.宫内第0个方格的行列坐标
         * 3.指定方格在宫内的行列坐标（偏移）
         */
        // const boxIndex = boxToolkit.convertToBoxIndex(rowIndex,colIndex).boxIndex;
        //解构语法
        const { boxIndex} = boxToolkit.convertToBoxIndex(rowIndex, colIndex);

        const box = boxToolkit.getBoxCells(matrix,boxIndex);
        for(let i=0; i<9; i++){
            if(row[i]===n
                ||col[i]===n
                ||box[i]===n){
                return false;
            }
        }
        return true;
    }
}


/**  
 * 检查算法： 按行、按列、按宫
 */
/** 
 * 宫坐标系工具
 */
const boxToolkit = {
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex/3)*3;
        const startColIndex = boxIndex % 3 * 3;
        const box = [];
        for(let cellIndex = 0; cellIndex<9; cellIndex++){
            const rowIndex = startRowIndex + Math.floor(cellIndex/3);
            const colIndex = startColIndex + cellIndex%3;
            box.push(matrix[rowIndex][colIndex]);
        }

        return box;
    },

    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },

    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
};

//工具类

module.exports = class Toolkit {
    /** 
     * 矩阵和数组相关工具类
     */
    static get matrix() {
        return matrixToolkit;
    }

    /** 
     * 宫坐标系相关工具类
     */
    static get box() {
        return boxToolkit;
    }
};