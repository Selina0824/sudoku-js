//生成数独解决方案

const Toolkit = require('./toolkit');

module.exports=class Generator {
    
    generate(){
        while(!this.internalGenerate()){
            console.log('Try Again');
        }
    }

    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row =>row.map( (value,index) =>index ))
            .map(row =>Toolkit.matrix.shuffle(row));
        // 入口方法
        for(let n=1; n<=9; n++ ){
           if(!this.fillNumber(n)){
               return false;
           }
        }
        return true;
    }

    fillNumber(n) {
       return this.fillRow(n,0);
    }

    /** 
     * fillRow() 函数通过递归调用，把数字n在所有row的所有位置都尝试一遍，最终找到合适的解决方案；
    */
    fillRow(n,rowIndex) {
        if(rowIndex>8){
            return true;
        }

        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for(let i=0; i<9; i++){
            //找随机列
            const colIndex = orders[i];
            //如果当前位置有值，跳过
            if(row[colIndex]){
                continue;
            }

            //检查当前位置是否可以填n
            if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)){
                continue;
            }
            row[colIndex] = n;

            //当前行填写n成功，递归调用 fillRow() 来在下一行中填写 n，如果填写失败，继续寻找当前行的下一个合适位置
           if(!this.fillRow(n, rowIndex + 1)){
               row[colIndex] = 0;
               continue;
           }
           
           return true;
        }
        
        //如果整个for循环都没有return true
        return false;
    }
}

// const generator = new Generator();
// generator.generate();
// console.log(generator.matrix)
