export const startStreaming = async (): Promise<Response> => {
    return fetch('https://visualizer-backend.mangoplant-a01d49a3.westeurope.azurecontainerapps.io/Test/startStreaming', {
        method: 'POST',
    })
}

export const stopStreaming = async (): Promise<Response> => {
    return fetch('https://visualizer-backend.mangoplant-a01d49a3.westeurope.azurecontainerapps.io/Test/stopStreaming', {
        method: 'POST',
    })
}
