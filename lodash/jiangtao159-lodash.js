var jiangtao159 = {
    changeToFunction : function(iteratee){
        if(Object.prototype.toString.call(iteratee) === "[object Array]"){
            return function (value) {
                for(let i = 0; i < iteratee.length;i+=2){
                    if(value[iteratee[i]] !== iteratee[i+1]){
                        return false
                    }
                }
                return true;
            }
        }
        if(Object.prototype.toString.call(iteratee) === "[object Function]"){
            return iteratee
        }
        if(Object.prototype.toString.call(iteratee) === "[object String]"){
            return  function(obj) {
                return obj[iteratee]
            }
        }
        if(Object.prototype.toString.call(iteratee) === "[object Object]"){
            return function (obj) {
                let key = Object.keys(iteratee);
                for(let i = 0 ; i < key.length;i++){
                    if(iteratee[key[i]] !== obj[key[i]]){
                        return false
                    }
                }
                return true;
            }
        }
    },
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
     * @param {Array} array 需要检查的数组
     * @param  {...any} values  需要排除的值。 
     * @iteratee 迭代调用的方法
     * @returns {Array}
     */
    differenceBy : function(array, ...values){
        let temp = arguments[arguments.length - 1];
        let theType = Object.prototype.toString.call(temp);
        if(theType === "[object Array]"){
            return this.difference(...arguments)
        }else{
            let ary = Array.from(arguments);
            let f = ary.pop();
            let res = [];
            let ans = []
            ary.forEach(element => {
                res.push(element.map(it => this.changeToFunction(f)(it)))
            })
            res = this.difference(...res)
            let i = 0, 
                j = 0;
            while(i < ary[0].length && j < res.length){
                if(this.changeToFunction(f)(ary[0][i]) == res[j]){
                    ans.push(ary[0][i]);
                    i++;
                    j++;
                }else{
                    i++;
                }
            }
            return ans;
        }
    },
    
    /**
     * 
     * @param {Array} array 需要检查的元素 
     * @param  {...any} values  需要排查的值
     * @param [comparator] (Function) comparator 调用每个元素。
     */
    differenceWith : function(array,...values){
        let ary = Array.from(arguments);
        let c = ary.pop();
        let value = ary.slice(1)
        let res = [];
        ary[0].forEach(element => {
            value.forEach(it => {
                it.forEach(t => {
                    if(!c(element,t)){
                        res.push(element)
                    }
                });
            });
        });
        return res;
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
     * 创建一个切片数组，去除array中从结尾开始到 predicate 返回假值结束部分
     * @param {*} array 要查询的数组。
     * @param {*} predicate  迭代调用的方法
     */
    dropRightWhile : function (array,predicate) {
        let res = array.slice();
        let f = this.changeToFunction(predicate)
        if(Object.prototype.toString.call(predicate) == "[Object Function]"){
            while (res.length) {
                if(!predicate(res[res.length - 1],res.length - 1,res)){
                    return res;
                }else{
                    res.pop();
                }
            }
        }
        while (res.length){
            if(f(res[res.length - 1]) == false){
                return res;
            }else{
                res.pop();
            }
        }
    },
    /**
     * 创建一个切片数组，去除array中从头部开始到 predicate 返回假值结束部分
     * @param {Array} array   需要切片的数组
     * @param {*} predicate    调用的方法
     */
    dropWhile : function (array, predicate){
        let res = array.slice();
        let f = this.changeToFunction(predicate)
        if(Object.prototype.toString.call(predicate) == "[Object Function]"){
            while (res.length) {
                if(!predicate(res[0],0,res)){
                    return res;
                }else{
                    res.shift()
                }
            }
        }
        while (res.length){
            if(f(res[0]) == false){
                return res;
            }else{
                res.shift();
            }
        }
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
     * 查找从头部fromindex下标开始第一个predicate返回ture的下标
     * @param {Array} array   要检查的数组
     * @param {Function/Array/Object/String} predicate   需要调用的方法
     * @param {Number} fromIndex    从某个下标开始
     */
    findIndex : function(array, predicate, fromIndex = 0){
        let f = this.changeToFunction(predicate)
        for(let i = fromIndex;i < array.length;i++){
            if(f(array[i])){
                return i
            }
        }
    },
    /**
     * 查找从尾部开始fromindex下标第一个predicate返回ture的下标
     * @param {Array} array  要检查的数组
     * @param {Function/Array/Object/String} predicate    需要调用的方法
     * @param {Number} fromIndex   从某个下标开始
     */
    findLastIndex : function(array, predicate, fromIndex = array.length-1){
        let f = this.changeToFunction(predicate);
        for(let i = fromIndex;i >= 0;i--){
            if(f(array[i])){
                return i;
            }
        }
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
     * 数组交集
     * 它接受一个iteratee调用每一个arrays的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：(value)。
     * @param {Array} arrays 要检查的数组
     * @param  {...any} value 数组及iteratee（迭代器）调用每个元素。
     */
    intersectionBy : function(arrays,...value){
        let last = arguments[arguments.length - 1];
        let ans = [];
        if(Array.isArray(last)){
            return this.intersection(...arguments)
        }else{
            let map = {};
            let f = this.changeToFunction(last);
            let ary = Array.from(arguments)
            ary.pop();
            let res = [];
            ary.forEach(it => res.push(it.map(element => f(element))))
            res = this.intersection(...res);
            res.forEach(element => {
                map[element] = element
            });
            return arrays.filter(value => {
                return f(value) in map
            })
        }
        return ans;
    },

    /**
     * 这个方法类似_.intersection，区别是它接受一个comparator调用比较arrays中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：(arrVal, othVal)。
     * @param {Array} array  需要检查的数组
     * @param  {...any} value  对比的数组及comparator比较函数；
     * @returns {Array}
     */
    intersectionWith : function(array,...value){
        let res = [];
        let ary = Array(arguments).slice(1);
        let f = ary.pop();
        array.forEach(element => {
            let count = 0;
            ary.forEach(that => {
                that.forEach(it => {
                    f(it) == f(element)
                    count++;
                });
                if(count == that.length){
                    res.push(element)
                }
            });
        });
        return res;
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
     * （删除数组中的元素）
     * @param {Array} array  要检查的数组
     * @param {Array} values  要移除值的数组。
     * @param {Function/Object/Array} iteratee （迭代器）调用每个元素
     */
    pullAllBy : function(array,values,iteratee){
        let map = {};
        let f = this.changeToFunction(iteratee)
        values.forEach(element => {
            map[f(element)] = element;
        });
        return array.filter(value =>{
            return !(f(value) in map)
        })
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
        if(value > array[array.length - 1] || value < array[0]){
            return -1
        }
        if(value == array[0]){
            return 0
        }
        let low = 0;
        let height = array.length - 1;
        while(low < height){
            let mid = Math.floor((height - low) / 2) + low;
            if(array[mid] == value && array[mid] < array[mid + 1]){
                return mid;
            }else if(array[mid] < value){
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

    /**
     * 
     * @param {Array} array
     * @returns {Array} 
     */
    tail : function(array){
        let res = [];
        for(var i = 1; i < array.length;i++){
            res.push(array[i])
        }
        return res
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} n
     * @returns {Array} 
     */
    take : function(array, n = 1){
        let res = array.slice()
        res.length = n > array.length ? array.length : n;
        return res
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} n
     * @returns {Array} 
     */
    takeRight : function(array, n = 1) {
        let temp = (array.length - n) < 0 ? 0 : (array.length - n)
        let res = [];
        for (let i = temp;i < array.length;i++){
            res.push(array[i])
        }
        return res
    },

    /**
     * 
     * @param  {Array} array
     * @returns {Array} 
     */
    union : function(...array){
        let args = Array.from(arguments);
        let map = {}
        let res = []
        for(var i = 0; i < args.length;i++){
            for(var j = 0; j < args[i].length;j++){
                if(!map[args[i][j]]){
                    res.push(args[i][j])
                    map[args[i][j]] = true;
                }
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} array
     * @return {Array} 
     */
    uniq : function(array){
        let map = {};
        let res = [];
        for(let i = 0; i < array.length;i++){
            if(!map[array[i]]){
                res.push(array[i])
                map[array[i]] = true
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} array 
     * @param  {...any} value
     * @returns {Array} 
     */
    without : function(array,...value){
        let map = {};
        let res = [];
        for(let i = 1;i < arguments.length;i++){
            map[arguments[i]] = true
        }
        for(let j = 0; j < array.length;j++){
            if(!map[array[j]]){
                res.push(array[j])
            }
        }
        return res
    },

    /**
     * 
     * @param  {Array} array
     * @returns {Array} 
     */
    zip : function(...array){
        let max = 0
        for(let i = 0; i < arguments.length;i++){
            max = max > arguments[i].length ? max : arguments[i].length
        }
        let res = Array(max);
        for(let i = 0;i < max;i++){
            for(let j = 0; j < arguments.length;j++){
                if(!res[i]){
                  res[i] = []
                }
                res[i].push(arguments[j][i])
            }
        }
        return res
    },

    /**
     * 
     * @param {Array} props 
     * @param {Array} values
     * @returns {Object} 
     */
    zipObject : function(props, values){
        let obj = {};
        for(let i = 0; i < props.length;i++){
            obj[props[i]] = values[i]
        }
        return obj
    },

    /**
     * 
     * @param {Array} array 
     * @param {Number} value
     * @returns {Number} 
     */
    sortedIndexOf : function(array, value){
        let left = 0;
        let right = array.length - 1;
        while(right - left > 1){
            let mid = Math.floor((right - left) / 2) + left
            if(array[mid] == value && array[mid] > array[mid - 1]){
                return mid
            }else if(array[mid] >= value){
                right = mid
            }else{
                left = mid
            }
        }
        if(array[right] == value && array[right] > array[left]){
          return right;
        }else if(array[left] == value){
          return left;
        }else{
          return -1
        }
    },

    /**
     * 
     * @param {Array} array
     * @returns {Array} 
     */
    unzip : function(array){
        let res = Array(array[0].length);
        for(let i = 0; i < array[0].length;i++){
            for(let j = 0; j < array.length;j++){
                if(!res[i]){
                    res[i] = []
                }
                res[i].push(array[j][i])
            }
        }
        return res
    },

    /**
     * 
     * @param  {Array} array 
     * @returns {Array}
     */
    xor : function(...array){
        let temp = [];
        let res = [];
        for(let i = 0; i < arguments.length; i++){
            for(let j = 0; j < arguments[i].length;j++){
                temp.push(arguments[i][j])
            }
        }
        for(let k = 0; k < temp.length;k++){
            if(temp.indexOf(temp[k]) == temp.lastIndexOf(temp[k])){
                res.push(temp[k])
            }
        }
        return res
    },
    
    /**
     * 
     * @param {Array/string/object} collection 
     * @param {value} value 
     * @param {Number} fromIndex 
     */
    includes : function(collection,value,fromIndex = 0){
        if(typeof(collection) == "string"){
            if(fromIndex >= 0){
                for(let i = fromIndex;i < collection.length;i++){
                    if(collection.slice(i,i + value.length) == value){
                        return true
                    }
                }
            }else{
                for(let i = collection.length + fromIndex;i < collection.length;i++){
                    if(collection.slice(i,i + value.length) == value){
                        return true
                    }
                }
            }
            return false
        }else if(Array.isArray(collection)){
          if(fromIndex >= 0){
                for(let i = fromIndex;i < collection.length;i++){
                    if(collection[i] == value){
                        return true
                    }
                }
            }else{
                for(let i = collection.length + fromIndex;i < collection.length;i++){
                    if(collection[i] == value){
                        return true
                    }
                }
            }
            return false
        }else{
            for(var i in collection){
                if(collection[i] == value){
                    return true
                }
            }
            return false
        }
    },

    /**
     * 
     * @param {Array/Object} collection
     * @returns {value} 
     */
    sample : function(collection){
        if(Array.isArray(collection)){
            return collection[Math.floor(Math.random() * collection.length)]
        }else{
            let len = Math.floor(Math.random() * Object.keys(collection).length);
            let count = 0;
            for(let i in collection){
                if(count == len){
                    return collection[i]
                }
                count++
            }
        }
    },

    /**
     * 
     * @param {Array/Object} collection 
     * @param {Number} n
     * @returns {value} 
     */
    sampleSize : function(collection,n = 1){
        for(let j = 0; j < n;j++){
            if(Array.isArray(collection)){
                return collection[Math.floor(Math.random() * collection.length)]
            }else{
                let len = Math.floor(Math.random() * Object.keys(collection).length);
                let count = 0;
                for(let i in collection){
                    if(count == len){
                        return collection[i]
                    }
                    count++
                }
            }
        }
    },

    /**
     * 
     * @param {Array/Object} collection
     * @returns {Array} 
     */
    shuffle : function(collection){
        if(!Array.isArray(collection)){
            return collection
        }
        if(collection.length <= 1){
            return collection
        }
        let len = collection.length
        let array = new Array(len).fill(false);
        let res = [];
        let count = 0;
        while(count < len){
            let n = Math.floor(Math.random() * n);
            if(!array[n]){
                res.push(collection[n])
                array[n] = true;
                count++
            }
        }
        return res
    },

    /**
     * 
     * @param {Array/string/object} collection
     * @returns {Number} 
     */
    size : function(collection){
        if(collection.length || collection.length == 0){
            return collection.length
        }else{
            return Object.keys(collection).length
        }
    },

    /**
     * 
     * @param {*} value 
     * @param {*} other 
     * @returns {boolean}
     */
    eq : function(value, other){
        if((value !== value) && (other !== other)){
            return true
        }
        if(value === other){
            return true
        }else{
            return false
        }
    },

    /**
     * 
     * @param {*} value 
     * @param {*} other
     * @returns {boolean} 
     */
    gt : function(value,other){
        if(value > other){
            return true
        }else{
            return false
        }
    },

    /**
     * 
     * @param {*} value 
     * @param {*} other
     * @returns {boolean} 
     */
    gte : function(value,other){
        if(value >= other){
            return true
        }else{
            return false
        }
    },

    /**
     * 
     * @param {*} value
     * @returns {Boolean} 
     */
    isArguments : function(value){
        if(typeof(value) == "object" && !Array.isArray(value) && value.length){
            return true
        }else{
            return false
        } 
    },

    /**
     * 
     * @param {*} value
     * @returns {Boolean} 
     */
    isArray : function(value){
        if(Array.isArray(value)){
            return true
        }else{
            return false
        }
    },

    /**
     * 
     * @param {*} value
     * @returns {Boolean} 
     */
    isBoolean : function(value){
        if(value.constructor == Boolean){
            return true
        }else{
            return false
        }
    },

    /**
     * 
     * @param {*} value
     * @returns {boolean} 
     */
    isNaN : function(value){
        if(value.constructor == Number){
            if(value !== value){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    },

    /**
     * 
     * @param {*} value 
     * @returns {boolean}
     */
    isNull : function(value){
        if(typeof(value) == "object" && !null){
            return true
        }else{
            return false
        }
    },

    /**
     * 
     * @param {Number} augend 
     * @param {Number} addend 
     * @returns {Number}
     */
    add : function(augend,addend){
        return augend + addend
    },

    /**
     * 
     * @param {Number} number 
     * @param {Number} precision 
     */
    ceil : function(number,precision = 0){
        let temp = number * (10 ** precision);
        temp = Math.ceil(temp);
        temp /= (10 ** precision)
        return temp
    },

    /**
     * 
     * @param {Array} array
     * @returns {Array} 
     */
    flattenDeep : function(array){
        let res = [];
        function deep(array){
            for(let i = 0; i < array.length;i++){
                if(Array.isArray(array[i])){
                    deep(array[i])
                }else{
                    res.push(array[i])
                }
            }
        }
        deep(array);
        return res;
    },

    flattenDepth : function(array,depth = 1){
        let res = []
        for(let d = 0; d < depth;d++){
            for(let i = 0 ; i < array.length;i++){
                if(Array.isArray(array[i])){
                    for(let j = 0; j < array[i].length;j++){
                        res.push(array[i][j])
                    }
                }else{
                    res.push(array[i])
                }
            }
            array = res;
            res = [];
        }
        return array;
    },

    fromPairs : function(array){
        let map = {};
        for(let i = 0; i < array.length;i++){
            map[array[i][0]] = array[i][1];
        }
        return map;
    },

    /**
     * 
     * @param {Array/Object} collection 
     * @param {Function} predicate 
     * @param {Number} fromIndex
     * @returns {*} 
     * 返回从下标位置开始第一个是true的元素，没有就返回undefined
     */
    find : function(collection, predicate, fromIndex = 0){
        if(Array.isArray(collection)){
            for(let i = fromIndex; i < collection.length;i++){
                if(predicate(collection[i],i,collection)){
                    return collection[i]
                }
            }
        }else{
            let count = 0;
            for(let proto in collection){
                if(collection(collection[proto],proto,collection)){
                    if(count >= fromIndex){
                        return collection[proto];
                        count++;
                    }
                }
            }
        }
        return undefined
    },
    
    /**
     * 
     * @param {Array/Object} collection 
     * @param {Array} iteratee
     * 返回经过函数处理过的扁平化数组 
     */
    flatMap : function (collection, iteratee) {
        let res = [];
        for(let i in collection){
            res.concat(iteratee(collection[i],i,collection));
        }
        return res;
    },

    flatMapDeep : function (collection, iteratee) {
        let res = [];
        for(let i in collection){
            let temp = iteratee(collection[i],i,collection);
            function openArray(array) {
                for(let j = 0; j < array.length;j++){
                    if(Array.isArray(array[j])){
                        openArray
                    }else{
                        res.push(array[j])
                    }
                }
            }
            openArray(temp);
        }
        return res;
    },
    
    /**
     * 
     * @param {Array/Object} collection 
     * @param {Function} predicate
     * @returns {Boolean}
     * 用函数判断集合里所有元素，如果有false返回false，否则返回true 
     */
    every : function(collection, predicate){
        for(let i in collection){
            if(!predicate(collection[i],i,collection)){
                return false
            }
            return true
        }
    },
}