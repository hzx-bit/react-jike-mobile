//1.定义泛型接口

export type ResType<T> = {
    message: string
    data: T
}