import React, {Component} from 'react'
import md from './moreDate.module.css'
class MoreData extends Component{

    moreClick(){
        return this.props.moreReturn({a:1})
    }

    render(){
        return (
            <div className={md.wrap}>
                <span onClick={this.moreClick.bind(this)}>{this.props.moreDataWord}</span>
            </div>
        )
    }
    
}

export default MoreData