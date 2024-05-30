import Time from './Time'

export default abstract class Timer {
  static Wait<T>(ms: number, v?: T): Promise<T | undefined> {
    return new Promise((resolve) => setTimeout(() => resolve(v), ms));
  }
  static WaitS<T>(s: number, v?: T): Promise<T | undefined> {
    return Timer.Wait(Time.S(s), v)
  }
  static WaitM<T>(m: number, v?: T): Promise<T | undefined> {
    return Timer.Wait(Time.M(m), v)
  }
}
