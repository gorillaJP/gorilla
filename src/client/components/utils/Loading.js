import React from 'react'
import { Spin } from 'antd'

const Loading = () => {

    return <React.Fragment>

        <div style={ {
            position: 'absolute',
            textAlign: "center",
            background: 'rgba( 0, 0, 0, 0.5 )',
            zIndex: 50000,
            width: '100%',
            height: '100%',
            position: 'absolute'

        } }>

            <div style={ {
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100%',
                verticalAlign: 'middle',
                justifyItems: 'center',
                alignItems: 'center'
            } }>
                <Spin size="large" />
            </div>

        </div>

    </React.Fragment>
}


export default Loading