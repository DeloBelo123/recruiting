type SafeResult<T> = {
    error: boolean
    message: string
    output: T | null
}

export function safe<T extends (...args: any[]) => any>(
    func: T,
    selfHandle: "selfHandle" | "throw" = "throw"
) {
    return function wrapper(...args: Parameters<T>): 
        T extends (...args: any[]) => Promise<any> ? Promise<SafeResult<Awaited<ReturnType<T>>>> : SafeResult<ReturnType<T>> 
    {
        try {
            const result = func(...args)

            if (result instanceof Promise) {
                return (result
                    .then((res) => selfHandle === "selfHandle" ? { error: false, message: '', output: res } : res)
                    .catch((err) => {
                        console.error(`Error in safe function:`, err)
                        if (selfHandle) {
                            return { error: true, message: String(err), output: null }
                        } else {
                            throw err
                        }
                    })) as any
            }

            // Sync-Fall
            if (selfHandle === "selfHandle") {
                return { error: false, message: 'func erfolgreich ausgeführt', output: result } as any
            }
            return result as any

        } catch (err: any) {
            console.error(`Error in safe function:`, err)
            if (selfHandle === "selfHandle") {
                return { error: true, message: String(err), output: undefined } as any
            }
            throw err
        }
    }
}