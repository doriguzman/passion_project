import React, { Component } from 'react';


class CaffeineCards extends Component {
  
  render() {
      let cards= this.props.cards
      let beverage= this.props.beverage
    console.log(cards,beverage)
      return (
          <div className="Cards-Container">

          {console.log(cards)}
          {cards.map(elem=>{

            return(
              <div className='caffeine-card'>  
            {elem.size ==='short' || elem.size ==='small' || elem.size ==='single'? <img className='top-card-image' src={require('../images/coffee1.jpeg')} />:''}
             {elem.size ==='tall' || elem.size ==='medium' || elem.size ==='double' ? <img className='top-card-image' src={require('../images/coffee4.jpg')} />:''}
             {elem.size ==='grande' || elem.size ==='large' || elem.size ==='triple'? <img className='top-card-image' src={require('../images/coffee0.jpg')} />:''}
             {elem.size ==='venti' || elem.size ==='extra-large' ? <img className='top-card-image'  src={require('../images/coffee3.png')} />:''}
             {elem.size ==='trenta'? <img className='top-card-image' src={require('../images/coffee5.jpg')} />:''}

              <div className='caffeine-card-text'> 
              
             <p> Size: {elem.size}</p>
             <p> Caffeine Content: {elem.caffeine}mg</p> 
             <hr className='horizontal-rule-caffeine'width='15%' />
             </div>

             {elem.size ==='short'? <img className='caffeine-card-image' src={require('../images/starbucks-short.png')} />:''}
             {elem.size ==='tall'? <img src={require('../images/starbucks-tall.png')} />:''}
             {elem.size ==='grande'? <img src={require('../images/starbucks-grande.png')} />:''}
             {elem.size ==='venti'? <img src={require('../images/starbucks-venti.png')} />:''}
             {elem.size ==='trenta'? <img src={require('../images/starbucks-trenta.png')} />:''}

             {elem.size ==='small'? <img src={require('../images/dunkin-small.png')} />:''}
             {elem.size ==='medium'? <img src={require('../images/dunkin-medium.png')} />:''}
             {elem.size ==='large'? <img src={require('../images/dunkin-large.png')} />:''}
             {elem.size ==='extra-large'? <img src={require('../images/dunkin-extra-large.png')} />:''}
             





            
       
             </div>

            )
          })}
              
          </div>
        )
    }
}

export default CaffeineCards