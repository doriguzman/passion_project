import React, { Component } from 'react';


class LandingPage extends React.Component{
    constructor(){
        super();
        this.state={};

    }

    render(){
        return(
            <div className= 'Landing-Divs'>
                <div className= 'top-Landing-Div'>
                    <p> this is where the short intro to the page is going to be and about what it does</p>
                    <button id='signup' onClick={this.props.setForm}>
                    sign up
                    </button> to track your caffeine intake!
                    Already have an account? 
                    <button id = 'login' onClick ={this.props.setForm}>
                    Login
                    </button>
                </div>

                <div className='middle-Landing-Div'>
                    <h2> Caffeine info on input drink </h2>
                    <input type='text' />
                </div>

            <div className='bottom-Landing-Div'>

                <div className='left-Comparison-Input'>
                <input type='text'/>
                </div>

                    <h2> VS </h2>
                
                <div className= 'right-Comparison-Input'>
                <input type='text'/>
                </div>
            </div>


          
            </div>
        )
    }
}

export default LandingPage;