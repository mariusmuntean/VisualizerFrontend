import { CSSProperties, useEffect, useRef } from 'react'
import { Data, Network, Options } from 'vis-network'

// source: https://www.jamestharpe.com/react-visjs/

interface Props {
    data: Data
    options?: Options
    style?: CSSProperties
    onNodeSelect?: (params: any) => void
}

export const VisNetwork = ({ data, options = {}, style, onNodeSelect }: Props) => {
    const visJsRef = useRef(null)
    useEffect(() => {
        if (!visJsRef.current) {
            return
        }

        const network = new Network(visJsRef.current, data, options)
        if (onNodeSelect) {
            network.on('selectNode', (p) => onNodeSelect(p))
        }
        // Use `network` here to configure events, etc
    }, [visJsRef, data, options])

    return <div ref={visJsRef} style={style} />
}
