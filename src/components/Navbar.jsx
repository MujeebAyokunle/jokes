
import React from 'react';
import './Homescreen.scss';

const Navbar = () => {

  return (
    <div>
      <div className='divclass'>

        <p className='tablinks'> SO FUNKTIONIERT'S </p>
        <p className='tablinks2'> SONDERANGEBOTE </p>

        <div className='navLinks2' >
          <p ><img src={require('../assets/assets_Homework_Front-End_02/shape.png')} style={{ marginRight: '5px' }} alt='avatar' /></p>
          <p > MEIN BEREICH </p>
          <p><img src={require('../assets/assets_Homework_Front-End_02/path.png')} alt='dropdown' style={{ marginLeft: '15px' }} /></p>
          <div className='dropdown-content' >
            <a href='#' > My published jokes </a>
            <a href='#' > My saved jokes </a>
            <a href='#' > Account Information </a>
            <a href='#' > Publish new joke </a>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className='divclassmobile'>

        <div className='navLinks2' >
          <p ><img src={require('../assets/assets_Homework_Front-End_02/shape.png')} style={{ marginRight: '5px' }} alt='avatar' /></p>
          <p > MEIN BEREICH </p>
          <p><img src={require('../assets/assets_Homework_Front-End_02/path.png')} alt='dropdown' style={{ marginLeft: '15px' }} /></p>
          <div className='dropdown-content' >
            <a href='#' > My published jokes </a>
            <a href='#' > My saved jokes </a>
            <a href='#' > Account Information </a>
            <a href='#' > Publish new joke </a>
          </div>
        </div>
        <div className="navLinks3">
          <div className="dropbtn" >
            <div className='menubar'></div>
            <div className='menubar'></div>
            <div className='menubar'></div>
          </div>

          <div className="dropdown-content3">
            <a href="#" >SO FUNKTIONIERT'S</a>
            <a href="#" >SONDERANGEBOTE</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
