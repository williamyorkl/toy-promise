
type executorType = (resolve:() => void,reject:() => void) => void


module.exports = class MPromise {
    static PENDING = 'pending'
    static RESOLVED = 'resolved'
    static REJECTED = 'rejected'

    constructor(executor:executorType){
        // 1) 外面传入的executor，初始化Promise实例的时候执行
        // 带两个callback参数（这两个cb，调用时机都是在外面）
        executor(this.resolve,this.reject)
    }
    

    resolve(){}


    reject(){}
}
