import React from 'react'
import style from './addinstance.less'
import { Button } from 'antd'
import { Icon } from 'antd';


class AddInstance extends React.Component {


    render() {

        return <div className={ style.addInstance } >
            <div className={ style.head }>

                <div className={ style.leftHead }>
                    <div className={ style.title }>
                        Software Engineer
                    </div>
                    <div className={ style.company }>
                        <a>Dialog Axiata</a>
                    </div>
                </div>

                <div className={ style.rightHead } >
                    <div className={ style.ageTag }> posted 3 days ago </div>
                </div>


            </div>

            <div className={ style.body }>
                <div className={ style.meta }>

                    <div className={ style.location }>location : Galle</div>

                    <div className={ style.experiance }>experiance : bigginer</div>
                </div>

                <div className={ style.description }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat vestibulum lectus mauris ultrices. Id aliquet risus feugiat in ante metus dictum at. Sit amet facilisis magna etiam tempor orci eu lobortis. Odio tempor orci
                </div>

                <div className={ style.skills }>skills : Java, RDBMS, Kafka</div>

            </div>

            <div className={ style.footer }>
                <Button type="primary">Applied</Button>
            </div>

        </div>

    }


}

export default AddInstance







