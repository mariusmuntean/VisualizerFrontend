import { Button, Col, Row, Tabs } from 'antd'
import { DownloadOutlined, StopOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

import { useLocation, useNavigate } from 'react-router-dom'

import { LiveHashtagAdded } from './components/hashtagAdded'
import { LiveRankedHashtags } from './components/rankedHashtagsChanged/liveRankedHashtags'
import { useIsStreaming } from './components/hooks/useIsStreamingHook'
import { Social } from './components/social/social'
import { Tweets } from './components/tweets'
import { useStartStreamingMutation, useStopStreamingMutation } from './generated/graphql'
import { Geo } from './components/geo'

import './App.css'

const { TabPane } = Tabs

function App() {
    const location = useLocation()
    const navigate = useNavigate()

    const isStreaming = useIsStreaming()
    const [startStreaming] = useStartStreamingMutation()
    const [stopStreaming] = useStopStreamingMutation()

    const onTabChange = (newTabName: string) => {
        navigate(newTabName)
    }

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
                    <Tabs defaultActiveKey="hashtags" activeKey={location.pathname} defaultValue="hashtags" onChange={onTabChange} centered destroyInactiveTabPane={true}>
                        <TabPane tab="Hashtag Added" key="/hashtags">
                            <LiveHashtagAdded />
                        </TabPane>
                        <TabPane tab="Ranked Hashtags" key="/rankedhashtags">
                            <LiveRankedHashtags />
                        </TabPane>
                        <TabPane tab="Tweets" key="/tweets">
                            <Tweets />
                        </TabPane>
                        <TabPane tab="Social Graph" key="/social">
                            <Social />
                        </TabPane>
                        <TabPane tab="Geo" key="/geo">
                            <Geo />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </>
    )
}

export default App
