import { useSearchParams } from 'react-router-dom'

type DefaultType = string | undefined
type ReturnType = string | undefined

export const useUrlState = (paramName: string, defaultValue: DefaultType): [ReturnType, (newValue: ReturnType) => void] => {
    const [searchParams, setSearchParams] = useSearchParams()

    let value: ReturnType
    if (searchParams.has(paramName)) {
        value = searchParams.get(paramName)!
    } else {
        value = defaultValue
    }

    return [
        value,
        (newValue: ReturnType) => {
            if (newValue) {
                setSearchParams((prevSearchParams) => {
                    const newSearchParams = new URLSearchParams(prevSearchParams)
                    newSearchParams.set(paramName, newValue.toString())
                    return newSearchParams
                })
            } else {
                setSearchParams((prevSearchParams) => {
                    const newSearchParams = new URLSearchParams(prevSearchParams)
                    newSearchParams.delete(paramName)
                    return newSearchParams
                })
            }
        },
    ]
}

export const useBoolUrlState = (paramName: string, defaultValue: boolean | undefined): [boolean | undefined, (newValue: boolean | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? 'true' : undefined)

    return [
        strVal?.toBoolean(),
        (newValue: boolean | undefined) => {
            strValSetter(newValue?.toString())
        },
    ]
}

type InputNumberType = number | undefined
type ReturnNumberType<T> = T extends number ? number : InputNumberType
export const useNumberUrlState = <T extends InputNumberType>(paramName: string, defaultValue: T): [ReturnNumberType<T>, (newValue: number | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? defaultValue.toString() : undefined)

    return [
        Number(strVal),
        (newValue: number | undefined) => {
            strValSetter(String(newValue))
        },
    ]
}

export const useStringArrayUrlState = (paramName: string, defaultValue: string[] | undefined): [string[] | undefined, (newValue: string[] | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? defaultValue.join(',') : undefined)

    return [
        strVal?.toArray(),
        (newValue: string[] | undefined) => {
            strValSetter(newValue?.join(','))
        },
    ]
}

type InputNumberArrayType = number[] | undefined
type ReturnNumberArrayType<T> = T extends number[] ? number[] : InputNumberArrayType
export const useNumberArrayUrlState = <T extends InputNumberArrayType>(paramName: string, defaultValue: T): [ReturnNumberArrayType<T>, (newValue: number[] | undefined) => void] => {
    const [strArrVal, strArrValSetter] = useStringArrayUrlState(paramName, defaultValue ? defaultValue.map((s) => s.toString()) : undefined)

    return [
        strArrVal?.map((s) => s.toNumber()) as ReturnNumberArrayType<T>,
        (newValue: number[] | undefined) => {
            strArrValSetter(newValue?.map((s) => s.toString()))
        },
    ]
}

export const useDateUrlState = (paramName: string, defaultValue: Date | undefined): [Date | undefined, (newValue: Date | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? defaultValue.toUTCString() : undefined)

    return [
        strVal?.toDate(),
        (newValue: Date | undefined) => {
            strValSetter(newValue?.toUTCString())
        },
    ]
}
