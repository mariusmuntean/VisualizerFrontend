import { Button, Col, Row, Tabs } from 'antd'
import { DownloadOutlined, StopOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

import './App.css'
import { LiveHashtagAdded } from './components/hashtagAdded'
import { LiveRankedHashtags } from './components/rankedHashtagsChanged/liveRankedHashtags'
import { useIsStreaming } from './components/hooks/useIsStreamingHook'
import { Social } from './components/social/social'
import { Tweets } from './components/tweets'
import { useStartStreamingMutation, useStopStreamingMutation } from './generated/graphql'

const { TabPane } = Tabs

function App() {
    const isStreaming = useIsStreaming()
    const [startStreaming, startStreamingStatus] = useStartStreamingMutation()
    const [stopStreaming, stopStreamingStatus] = useStopStreamingMutation()

    return (
        <>
            <Row style={{ margin: '1em' }}>
                <Col span={6}></Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" danger icon={<DownloadOutlined />} size={'large'} onClick={() => startStreaming()} disabled={isStreaming === true}>
                        Start Streaming
                    </Button>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" icon={<StopOutlined />} size={'large'} onClick={() => stopStreaming()} disabled={isStreaming === false}>
                        Stop Streaming
                    </Button>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Tabs defaultActiveKey="1" centered destroyInactiveTabPane={true}>
                        <TabPane tab="Hashtag Added" key="1">
                            <LiveHashtagAdded />
                        </TabPane>
                        <TabPane tab="Ranked Hashtags" key="2">
                            <LiveRankedHashtags />
                        </TabPane>
                        <TabPane tab="Tweets" key="3">
                            <Tweets />
                        </TabPane>
                        <TabPane tab="Social Graph" key="4">
                            <Social></Social>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </>
    )
}

export default App
