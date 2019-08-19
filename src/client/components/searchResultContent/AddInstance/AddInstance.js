import React from 'react'
import style from './addinstance.less'
import { Button } from 'antd'
import { Icon } from 'antd';


const AddInstance = ( props ) => {


    console.log( 'RRRRRRR', props )

    return <div className={ style.addInstance } >
        <div className={ style.head }>

            <div className={ style.leftHead }>
                <div className={ style.title }>
                    { props.jobAdd.title }
                </div>
                <div className={ style.company }>
                    <a>{ props.jobAdd.company }</a>
                </div>
            </div>

            <div className={ style.rightHead } >
                <div className={ style.ageTag }> posted 3 days ago </div>
            </div>

        </div>

        <div className={ style.body }>
            <div className={ style.meta }>

                <div className={ style.location }>location :  { props.jobAdd.location }</div>

                <div className={ style.experiance }>experiance : { props.jobAdd.experiance }</div>
            </div>

            <div className={ style.description }>
                { props.jobAdd.description }
            </div>

            <div className={ style.skills }>skills :
                { props.jobAdd.skills }
            </div>

        </div>

        <div className={ style.footer }>
            <Button type="primary">Applied</Button>
        </div>

    </div>

}

export default AddInstance







