

module.exports = class MPromise {
    static PENDING = 'pending'
    static RESOLVED = 'resolved'
    static REJECTED = 'rejected'

    constructor(executor){
        // 0) 初始化this指向
        this.initBinding()

        

        // 1) 初始化
        this.status = MPromise.PENDING

        // 2) 保存promise的结果
        this.promiseResult = null

        // 3) 外面传入的executor，初始化Promise实例的时候执行
        // 带两个callback参数（这两个cb，调用时机都是在外面）
        executor(this.resolve,this.reject)

        
    }
    
    /** 
     * 绑定resolve, reject的this指向
     *  （因为resolve()；reject()单独执行的时候，this指向全局，导致： TypeError: Cannot read property 'status' of undefined）
     * */
    initBinding(){
       this.resolve = this.resolve.bind(this)
       this.reject = this.reject.bind(this)
    }

    resolve(result){
        
      // (因为promise的状态只可以被修改一次，需要确保修改前是PENDING状态的)
     if(this.status === MPromise.PENDING){
        this.promiseResult = result
        this.status = MPromise.RESOLVED
     }
    }


    reject(reason){
        // (因为promise的状态只可以被修改一次，需要确保修改前是PENDING状态的)
        if(this.status === MPromise.PENDING){
           this.promiseResult = reason
           this.status = MPromise.REJECTED
        }
       }
}
