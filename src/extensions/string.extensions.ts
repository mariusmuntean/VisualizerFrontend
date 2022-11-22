import dayjs from 'dayjs'
import { SortOrder } from '../generated/graphql'

declare global {
    interface String {
        toNumber: () => number
        toBoolean: () => boolean
        toArray: (separator?: string) => Array<string>
        toDate: () => Date
        toSortOrder: () => SortOrder | null
    }
}

String.prototype.toNumber = function () {
    return Number(this)
}
String.prototype.toBoolean = function () {
    return this.toLowerCase() === 'true' ? true : false
}
String.prototype.toArray = function (separator: string = ',') {
    return (this as unknown as string).split(separator)
}
String.prototype.toDate = function () {
    return dayjs(this as string).toDate()
}
String.prototype.toSortOrder = function (): SortOrder | null {
    if (!this) {
        return null
    }

    if (this.toLowerCase().startsWith('asc')) {
        return SortOrder.Ascending
    }

    if (this.toLowerCase().startsWith('desc')) {
        return SortOrder.Descending
    }

    return null
}

export {}
