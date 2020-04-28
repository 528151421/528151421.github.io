var jingtao159 = {
    /**
     * 
     * @param {Array} ary 
     * @param {Number} size
     * @returns{Array[][]} 
     */
    chunk : function (ary,size = 1) {
        var count = 0;
        var newAry= [];
        var temp = [];
        for(var i = 0; i <ary.length;i++){
            count++
            temp.push(ary[i])
            if(count == size){
                newAry.push(temp)
                temp = []
                count = 0
            }
        }
        return newAry
    }
}