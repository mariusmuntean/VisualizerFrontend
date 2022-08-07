import configJson from './config.json'

interface VisualizerConfiguration {
    visualizerBackendUrl: string
}

export const Config: VisualizerConfiguration = configJson as any
