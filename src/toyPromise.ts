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

  private cbResolvedArray: any[] // FIXME - 数组里面存储的是对象,且该对象要符合{ cbResolveFn: xxx , subResolve: xxx  }
  private cbRejectedArray: cbType<reasonType<T>>[]

  private thenPromise: MPromiseLike<T> | null | undefined // undefined的原因是给他赋值了一个未被声明的值

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

    // 初始化thenPromise
    this.thenPromise = null

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
      this.promiseResult = result // 把传入的值保存在promise内部
      this.status = MPromise.RESOLVED // 改变MPromise状态

      // // 执行.then收集的回调
      // this.cbResolvedArray.forEach((cbRes) => {
      //   // 情况2：.then执行后，返回一个普通值
      //   if (this.status === MPromise.PENDING) {
      //     const nextPromise = this.thenPromise?.then((res: reasonType<T>) => {
      //       cbRes(res) // 下一个then里面的回调，需要执行完才知道return值
      //     })

      //     this.status = MPromise.PENDING

      //     this.thenPromise = nextPromise
      //   } else {
      //     // 情况1: .then的返回值是一个MPromise
      //     const returnVal = cbRes(this.promiseResult)

      //     // 判断then里面回调的返回值
      //     if (returnVal && returnVal instanceof MPromise) {
      //       this.status = MPromise.PENDING

      //       this.thenPromise = returnVal
      //     } else {
      //       // 当then返回的不是promise
      //       cbRes(this.promiseResult)
      //     }
      //   }
      // })

      /**
       * NOTE - 如果是return下一轮的promise实例
       */

      // forEach的时候就可以把下一轮promise实例中的resolve“拿”出来；同时可以获得.then里面cb执行后的结果
      this.cbResolvedArray.forEach(({ cbResolveFn, subResolve }) => {
        const thenPromise = cbResolveFn(this.promiseResult)
        if (thenPromise instanceof MPromise) {
          thenPromise.then((res) => {
            subResolve(res) // 这里就是通过return出去的子promise的resolve了then里面的回调
          })
        }
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
  ): MPromiseLike<T> {
    // 如果executor里面有异步函数，则让then()里面的回调函数也变成异步函数，然后再让executor里面的异步函数优先进入异步队列（问题会导致如果executor里的异步函数慢的话，这里就会失败）；所以要判断，如果this.status还是pending的状态的话，得把callback都推进数组，然后等到this.status为非pending后，循环执行callback；问题：怎样时刻监视this.status的状态呢？
    // setTimeout(() => {
    //   // 注意：callbackResolved是外面传入.then()的
    //   callbackResolved && callbackResolved(this.promiseResult)
    //   callbackRejected && callbackRejected(this.promiseReason)
    // })

    // if (this.status === MPromise.PENDING) {
    //   // NOTE - 这里不一定要在推入时包裹一层setTimeout？
    //   this.cbResolvedArray.push((result: resultType<T>) => {
    //     return callbackResolved && callbackResolved(result)
    //   })
    //   this.cbRejectedArray.push((reason) => {
    //     return callbackRejected && callbackRejected(reason)
    //   })
    // }

    // 注意：这里不能用于监视this.status，然后执行cbResolvedArray，因为最外面的.then只会执行一次，而这一次只是用于把回调cb推入数组cbResolvedArray；正确执行遍历数组：1）应该放在this.status状态变化后（可以用get和set），2）或者放在每次的resolve/reject后面

    // 关于then的return值，默认是return一个MPromise实例，return出去的值，要做到：1）值穿透；2）如果callbackResolved这类传入的cb执行后，有返回值的话，要按其返回值来return
    // 结合这个理解：https://kiwi-jacket-c6b.notion.site/Object-create-new-59dda0f4d526473395f53dcfaf3a292c

    // return this // 如果this.thenPromise为null的话，则返回this

    /**
     * NOTE - 如果是return下一轮的promise实例
     */

    return new MPromise<T>((resolve, reject) => {
      // 以下的会在return的时候马上创建了新的promise实例，对象里面的方法会马上执行
      if (this.status === MPromise.PENDING) {
        this.cbResolvedArray.push({
          // 1）
          cbResolveFn: (result: resultType<T>) => {
            return callbackResolved && callbackResolved(result)
          },
          // 2）
          subResolve: resolve,
        })
        // TODO - 后面再完善reject
      }
    })

    /**
     *  .then()的返回值需要结合对比：
     *  1） new MPromise()
     *    - mpromise实例，有实例方法；实例属性
     *  2） Object.create(this)
     *    - 没有this上的实例属性
     *  3） Object.create(MPromise)
     *    - 没有this上的实例属性
     *  4)  Object.create(new MPromise())
     */
  }

  catch(callbackReject: handleRejectedType<T>) {
    callbackReject(this.promiseReason)
  }
}
