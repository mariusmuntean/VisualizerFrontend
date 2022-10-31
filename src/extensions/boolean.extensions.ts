declare global {
    interface Boolean {
        toString: () => string
    }
}

String.prototype.toString = function () {
    return String(this)
}

export {}
