type resultType<T> = T | T[] | null // FIXME - 还有可能是一个对象或MPromise

type reasonType<T> = T | T[] | null

type executorType<T> = (
  resolve: (result: resultType<T>) => void,
  reject: (reason: reasonType<T>) => void
) => void

// .then 传入的cb，返回值有可能是空值
type handleResolvedType<T> = (
  result: resultType<T>
) => resultType<T> | void | MPromiseLike<T>

type handleRejectedType<T> = (
  reject: reasonType<T>
) => resultType<T> | void | MPromiseLike<T>

type cbType<T> = (params: T) => ReturnType<handleResolvedType<T>> | void

// 源码中PromiseLike和Promise的区别就是是否有.catch()的类型
interface MPromiseLike<T> {
  then(
    callbackResolved?: handleResolvedType<T> | null | undefined,
    callbackRejected?: handleRejectedType<T> | null | undefined
  ): MPromiseLike<T>
}

export default class MPromise<T> {
  static PENDING = 'pending'
  static RESOLVED = 'resolved'
  static REJECTED = 'rejected'
  private status: string
  private promiseResult: reasonType<T>
  private promiseReason: reasonType<T>

  private cbResolvedArray: cbType<resultType<T>>[]
  private cbRejectedArray: cbType<reasonType<T>>[]

  constructor(executor?: executorType<T>) {
    // 1) 初始化this指向
    this.initBinding()

    // 2) 初始化
    this.status = MPromise.PENDING

    // 3) 保存promise的结果
    this.promiseResult = null
    this.promiseReason = null

    // 4) 保存.then的cb数组
    this.cbResolvedArray = []
    this.cbRejectedArray = []

    // 5) 外面传入的executor，初始化Promise实例的时候执行
    // 带两个callback参数（这两个cb，调用时机都是在外面）
    // NOTE - executor一定要在所有状态初始化后再执行
    try {
      executor && executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error) // 直接调用this.reject处理即可（既可以赋值；又可以改变状态）
    }
  }

  /**
   * 绑定resolve, reject的this指向
   *  （因为resolve()；reject()单独执行的时候，this指向全局，导致： TypeError: Cannot read property 'status' of undefined）
   * */
  initBinding() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve(result: resultType<T>) {
    // (因为promise的状态只可以被修改一次，需要确保修改前是PENDING状态的)
    if (this.status === MPromise.PENDING) {
      this.promiseResult = result
      this.status = MPromise.RESOLVED
      this.cbResolvedArray.length > 0 &&
        this.cbResolvedArray.forEach((cbRes) => {
          const returnVal = cbRes(this.promiseResult)
          // 为了能让后面的.then可以用到上一个.then的返回值
          this.promiseResult = returnVal as resultType<T> // FIXME - 断言其实不好👎
          return returnVal
        })
    }
  }

  reject(reason: reasonType<T>) {
    // (因为promise的状态只可以被修改一次，需要确保修改前是PENDING状态的)
    if (this.status === MPromise.PENDING) {
      this.promiseReason = reason
      this.status = MPromise.REJECTED
      this.cbRejectedArray.length &&
        this.cbRejectedArray.forEach((cbRes) => cbRes(this.promiseReason))
    }
  }

  then(
    callbackResolved?: handleResolvedType<T> | null | undefined,
    callbackRejected?: handleRejectedType<T> | null | undefined

    // callbackResolved?: any,
    // callbackRejected?: any
  ) {
    // 如果executor里面有异步函数，则让then()里面的回调函数也变成异步函数，然后再让executor里面的异步函数优先进入异步队列（问题会导致如果executor里的异步函数慢的话，这里就会失败）；所以要判断，如果this.status还是pending的状态的话，得把callback都推进数组，然后等到this.status为非pending后，循环执行callback；问题：怎样时刻监视this.status的状态呢？
    // setTimeout(() => {
    //   // 注意：callbackResolved是外面传入.then()的
    //   callbackResolved && callbackResolved(this.promiseResult)
    //   callbackRejected && callbackRejected(this.promiseReason)
    // })
    if (this.status === MPromise.PENDING) {
      // NOTE - 这里不一定要在推入时包裹一层setTimeout？
      this.cbResolvedArray.push((result: resultType<T>) => {
        return callbackResolved && callbackResolved(result)
      })
      this.cbRejectedArray.push((reason) => {
        return callbackRejected && callbackRejected(reason)
      })
    }
    // 注意：这里不能用于监视this.status，然后执行cbResolvedArray，因为最外面的.then只会执行一次，而这一次只是用于把回调cb推入数组cbResolvedArray；正确执行遍历数组：1）应该放在this.status状态变化后（可以用get和set），2）或者放在每次的resolve/reject后面

    // 关于then的return值，默认是return一个MPromise实例，return出去的值，要做到：1）值穿透；2）如果callbackResolved这类传入的cb执行后，有返回值的话，要按其返回值来return
    // 结合这个理解：https://kiwi-jacket-c6b.notion.site/Object-create-new-59dda0f4d526473395f53dcfaf3a292c
    return new MPromise<T>()

    /**
     *  .then()的返回值需要结合对比：
     *  1） new MPromise()
     *  2） Object.create(this)
     *  3） Object.create(MPromise)
     */
  }

  catch(callbackReject: handleRejectedType<T>) {
    callbackReject(this.promiseReason)
  }
}
