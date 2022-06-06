import { Tabs } from 'antd'

import './App.css'
import 'antd/dist/antd.css'
import { LiveHashtagAdded } from './components/hashtagAdded'
import { LiveRankedHashtags } from './components/rankedHashtagsChanged/liveRankedHashtags'

const { TabPane } = Tabs

function App() {
    return (
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
    )
}

export default App
