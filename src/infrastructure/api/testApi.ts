import { Config } from './../../config'

export const startStreaming = async (): Promise<Response> => {
    return fetch(`https://${Config.visualizerBackendUrl}/Test/startStreaming`, {
        method: 'POST',
    })
}

export const stopStreaming = async (): Promise<Response> => {
    return fetch(`https://${Config.visualizerBackendUrl}/Test/stopStreaming`, {
        method: 'POST',
    })
}
