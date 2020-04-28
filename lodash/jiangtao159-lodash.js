var jiangtao159 = {
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
    },
    /**
     * 
     * @param {Array} nums 
     * @returns{Array}
     */
    compact : function (nums){
        var res = [];
        var len = nums.length;
        for(var i = 0 ; i < len;i++){
            if(nums[i] == false && nums[i] == 0){
                continue
            }else{
              res.push(nums[i])
            }
        }
        return res
    },

}