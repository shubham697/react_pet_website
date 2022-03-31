import React, { Component } from 'react'

const initData = {
    heading: "Trusted by 4000+",
    content: "High performing team worldwide"
}

const data = [
    {
        count: "145052",
        title:  "Downloads"
    },
    {
        count: '4400+',
        title: 'Active Installs'
    },
    {
        count: '5000+',
        title: 'Paid Users'
    }

]

class ProductCounter extends Component{
    render(){
        return(
            <section className="product-counter-section ptb-50">
            <div className="product-counter-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-6">
                            <div className="counter-content-wrap">
                                <span className="ti-cup"></span>
                                <h6 className="counter-title"><strong>{initData.heading}</strong></h6>
                                <p>{initData.content}</p>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-6">
                            <ul className="counter-list list-inline text-right">
                                {data.map((item, idx) => {
                                    return(
                                        <li key={`pc_${idx}`}>
                                            <span className="count">{item.count}</span>
                                            <span className="title">{item.title}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default ProductCounter