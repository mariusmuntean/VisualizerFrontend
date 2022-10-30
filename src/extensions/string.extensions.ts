import moment from 'moment'

declare global {
    interface String {
        toNumber: () => number
        toBoolean: () => boolean
        toArray: (separator?: string) => Array<string>
        toDate: () => Date
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
    return moment(this as string).toDate()
}

export {}
