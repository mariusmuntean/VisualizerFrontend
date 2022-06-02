export const startStreaming = async (): Promise<Response> => {
    return fetch('https://localhost:7083/Test/startStreaming', {
        method: 'POST',
    })
}

export const stopStreaming = async (): Promise<Response> => {
    return fetch('https://localhost:7083/Test/stopStreaming', {
        method: 'POST',
    })
}
