type resultType<T> = T | T[] // FIXME - 还有可能是一个对象

type reasonType<T> = T | T[]

type executorType<T> = (
  resolve: (result: resultType<T>) => void,
  reject: (reason: reasonType<T>) => void
) => void

// FIXME - return值不完善
type handleResolvedType<T> = (result: resultType<T>) => void

// FIXME - return值不完善
type handleRejectedType<T> = (reject: reasonType<T>) => void

export default class MPromise<T> {
  static PENDING = 'pending'
  static RESOLVED = 'resolved'
  static REJECTED = 'rejected'
  private status: string
  private promiseResult: resultType<T> | reasonType<T> | null

  constructor(executor: executorType<T>) {
    // 1) 初始化this指向
    this.initBinding()

    // 2) 初始化
    this.status = MPromise.PENDING

    // 3) 保存promise的结果
    this.promiseResult = null

    // 4) 外面传入的executor，初始化Promise实例的时候执行
    // 带两个callback参数（这两个cb，调用时机都是在外面）
    // NOTE - executor一定要在所有状态初始化后再执行
    executor(this.resolve, this.reject)
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
    }
  }

  reject(reason: reasonType<T>) {
    // (因为promise的状态只可以被修改一次，需要确保修改前是PENDING状态的)
    if (this.status === MPromise.PENDING) {
      this.promiseResult = reason
      this.status = MPromise.REJECTED
    }
  }

  then(
    callbackResolved?: handleResolvedType<T>,
    callbackRejected?: handleRejectedType<T>
  ) {
    // 注意：callbackResolved是外面传入.then()的
    callbackResolved && callbackResolved(this.promiseResult as resultType<T>)
    callbackRejected && callbackRejected(this.promiseResult as reasonType<T>)
  }
}
