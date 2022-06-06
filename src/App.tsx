import { Button, Col, Row, Tabs } from 'antd'
import { DownloadOutlined, StopOutlined, UpCircleOutlined } from '@ant-design/icons'

import './App.css'
import 'antd/dist/antd.css'
import { LiveHashtagAdded } from './components/hashtagAdded'
import { LiveRankedHashtags } from './components/rankedHashtagsChanged/liveRankedHashtags'
import { startStreaming, stopStreaming } from './infrastructure/api/testApi'
import { useIsStreaming } from './components/hooks/useIsStreamingHook'

const { TabPane } = Tabs

function App() {
    const isStreaming = useIsStreaming()

    return (
        <>
            <Row style={{ margin: '1em' }}>
                <Col span={6}></Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" danger icon={<DownloadOutlined />} size={'large'} onClick={startStreaming} disabled={isStreaming === true}>
                        Start Streaming
                    </Button>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" icon={<StopOutlined />} size={'large'} onClick={stopStreaming} disabled={isStreaming === false}>
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
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </>
    )
}

export default App
