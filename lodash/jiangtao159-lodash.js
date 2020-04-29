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
        if(temp.length){
            newAry.push(temp)
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
            if(nums[i] == false || isNaN(nums[i])){
                continue
            }else{
              res.push(nums[i])
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} ary
     * @param {[value]} 
     */
    concat : function(ary){
        var res = ary.slice();
        for(var i = 1; i < arguments.length;i++){
            if(Array.isArray(arguments[i])){
                for(var j = 0;j < arguments[i].length;j++){
                    res.push(arguments[i][j])
                }
            }else{
                res.push(arguments[i])
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} ary 
     * @param {...Array}
     */
    difference : function(ary){
        var res = [];
        var args = Array.from(arguments)
        for(var i = 0; i < ary.length;i++){
            var bool = true
            for(var j = 1;j < args.length;j++){
                if(args[j].indexOf(ary[i]) !== -1){
                    bool = false
                    break
                }
            }
            if(bool){
                res.push(ary[i])
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} ary 
     * @param {Number} n 
     */
    drop : function (ary, n = 1){
        var res = [];
        for(var i = 0; i < ary.length;i++){
            if(i >= n){
                res.push(ary[i])
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} ary 
     * @param {Number} n 
     */
    dropRight : function(ary, n = 1){
        var len = ary.length;
        var res = []
        if(n >= len){
            return []
        }else{
            for(var i = 0; i < len - n;i++){
                res.push(ary[i])
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} array 
     * @param {*} value 
     * @param {Number} start 
     * @param {Number} end 
     */
    fill : function(array, value, start=0, end=array.length){
        var len = array.length;
        for(var i = 0;i < len;i++){
            if(i >= start && i < end){
                array[i] = value;
            }
        }
        return array
    },

    /** 
     * @param {Array} array
     * @returns{Array}
     */
    flatten : function(array){
        var res = [];
        var len = array.length;
        for(var i = 0; i < len;i++){
            if(Array.isArray(array[i])){
                for(var j = 0;j < array[i].length;j++){
                    res.push(array[i][j])
                }
            }else{
                res.push(array[i])
            }
        }
        return res
    },

    /** 
     * @param {Array} array
     */
    head : function(array){
        return array[0]
    },

    /**
     * @param {Array} array 
     * @param {*} value 
     * @param {Number} fromIndex
     * @returns{number}
     */
    indexOf : function(array, value, fromIndex=0){
        if(fromIndex < 0){
            fromIndex = 0
        }
        var len = array.length;
        if(isNaN(value)){
            for(var i = fromIndex;i < len;i++){
                if(isNaN(array[i])){
                    return i
                }
            }
        }else{
            for(var i = fromIndex;i < len;i++){
                if(array[i] == value){
                    return i
                }
            }
        }
        return -1
    },

    /**
     * @param {Array} ary
     * @returns {Array}
     */
    initial : function(ary){
        var res = [];
        var len = ary.length;
        for(var i = 0; i < len - 1;i++){
            res.push(ary[i])
        }
        return res
    },

    /**
     * @param {Array} ...Array
     * @returns {Array}
     */
    intersection : function(ary){
        var res = []
        var args = Array.from(arguments);
        for(var i = 0; i < args[0].length;i++){
            var bool = true
            for(var j = 1; j < args.length;j++){
                if(args[j].indexOf(args[0][i]) == -1){
                    bool = false
                    break
                }
            }
            if(bool){
                res.push(args[0][i])
            }
        }
        return res
    },

    /**
     * @param {Array} array
     * @param {value} separator
     * @returns {string}
     */
    join : function(array, separator=','){
        var res = ""
        for(var i = 0; i < array.length - 1;i++){
            res += "" + array[i] + separator
        }
        res += array[array.length - 1]
        return res
    },

    /**
     * @param {Array} array
     * @returns {value}
     */
    last : function(array){
        return array[array.length - 1]
    },

    /**
     * @param {Array} array
     * @param {value} value
     * @param {Number} fromIndex
     * @returns {Number}
     */
    lastIndexOf : function(array, value, fromIndex = array.length-1){
        if(fromIndex > array.length-1){
            fromIndex = array.length-1
        }
        if(isNaN(value)){
            for(var i = fromIndex; i >=0;i--){
                if(isNaN(array[i])){
                    return i
                }
            }
        }else{
            for(var i = fromIndex; i >=0;i--){
                if(array[i] == value){
                    return i
                }
            }
        }
        return -1
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} n
     * @returns {value} 
     */
    nth : function(array,n = 0){
        if(n < 0){
            return array[array.length + n]
        }else{
            return array[n]
        }
    },

    pull : function(array){
        var args = Array.from(arguments);
        args = args.slice(1)
        var j = 0;
        for(var i = 0; i < array.length;i++){
            if(args.indexOf(array[i]) == -1){
                array[j] = array[i]
                j++
            }
        }
        array.length = j
        return array
    },
    /**
     * 
     * @param {Array} array 
     * @param {Array} values
     * @return {Array} 
     */
    pullAll : function(array, values){
        var j = 0;
        for(var i = 0; i < array.length;i++){
            if(values.indexOf(array[i] ) == -1){
                array[j] = array[i]
                j++
            }
        }
        array.length = j
        return array
    },

    /**
     * 
     * @param {Array} array
     * @returns {Array}
     *  
     */
    reverse : function(array){
        let i = 0,j = array.length - 1
        while(i < j){
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp;
            i++
            j--
        }
        return array
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} start 
     * @param {Number} end
     * @returns {Array} 
     */
    slice : function(array, start=0, end=array.length){
        let res = [];
        for(var i = start;i < end;i++){
            res.push(array[i])
        }
        return res
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} value
     * @return {Number} 
     */
    sortedIndex : function(array, value){
        let h = array.length;
        let l = 0;
        if(value > array[h - 1]){
            return array.length
          }
          if(value <= array[l]){
            return 0
          }
        while(h > l){
            let mid = ((h - l) >> 1) + l;
            if(array[mid] >= value){
                h = mid;
            }else if(array[mid] < value && array[mid + 1] >= value){
                return mid + 1
            }else{
                l = mid;
            }
        }
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} value
     * @returns {Number} 
     */
    sortedLastIndexOf : function(array, value){
        if(value > array.length - 1 || value < array[0]){
            return -1
        }
        if(value == array[0]){
            return 0
        }
        let low = 0;
        let height = array.length - 1;
        while(low < height){
            let mid = Math.floor((height - low) / 2) + low;
            if(array[mid] == value && array[mid] > array[mid - 1]){
                return mid;
            }else if(array[mid] <= value){
                height = mid;
            }else{
                low = mid;
            }
        }
        return -1
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} value
     * @return {Number} 
     */
    sortedLastIndex : function(array, value){
        let low = 0;
        let height = array.length - 1;
        if(value >= array[height]){
            return array.length
        }
        if(value < array[0]){
            return 0
        }
        while(low < height){
            let mid = Math.floor((height - low) / 2) + low;
            if(array[mid] < array[mid + 1] && array[mid] >= value){
                return mid + 1
            }else if(array[mid] <= value){
                low = mid;
            }else{
                height = mid;
            }
        }
    },
}