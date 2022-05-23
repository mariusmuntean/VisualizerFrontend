import { Tabs } from 'antd'

import './App.css'
import 'antd/dist/antd.css'
import { Hashtags } from './components/hashtags'

const { TabPane } = Tabs

function App() {
    return (
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Hashtags" key="1">
                <Hashtags />
            </TabPane>
            <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    )
}

export default App
