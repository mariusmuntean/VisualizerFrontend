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
                searchParams.set(paramName, newValue.toString())
                setSearchParams(searchParams) // Just deleting the search param doesn't trigger a re-render
            } else {
                searchParams.delete(paramName)
                setSearchParams(searchParams) // Just deleting the search param doesn't trigger a re-render
            }
        },
    ]
}

export const useBoolUrlState = (paramName: string, defaultValue: boolean | undefined): [boolean | undefined, (newValue: boolean | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? 'true' : undefined)

    return [
        strVal?.toBoolean(),
        (newValue: boolean | undefined) => {
            strValSetter(String(newValue))
        },
    ]
}

export const useNumberUrlState = (paramName: string, defaultValue: number | undefined): [number | undefined, (newValue: number | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? 'true' : undefined)

    return [
        Number(strVal),
        (newValue: number | undefined) => {
            strValSetter(String(newValue))
        },
    ]
}

export const useArrayUrlState = <T,>(paramName: string, defaultValue: string[] | undefined): [string[] | undefined, (newValue: string[] | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? 'true' : undefined)

    return [
        strVal?.toArray(),
        (newValue: string[] | undefined) => {
            strValSetter(newValue?.join(','))
        },
    ]
}

export const useDateUrlState = (paramName: string, defaultValue: Date | undefined): [Date | undefined, (newValue: Date | undefined) => void] => {
    const [strVal, strValSetter] = useUrlState(paramName, defaultValue ? 'true' : undefined)

    return [
        strVal?.toDate(),
        (newValue: Date | undefined) => {
            strValSetter(newValue?.toUTCString())
        },
    ]
}
