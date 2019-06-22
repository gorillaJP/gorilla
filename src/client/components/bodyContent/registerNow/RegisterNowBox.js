
import React from 'react'
import style from './registernowbox.less'


class RegisterNowBox extends React.Component {

    render() {
        return <React.Fragment>

            <div className={ style.registerBox }>

                <a className={ style.registerNowLable }>Register with Gorilla</a>
            </div>
        </React.Fragment>
    }


}


export default RegisterNowBox
