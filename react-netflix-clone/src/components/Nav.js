// rfc
import React, { useEffect, useState } from 'react';
import "./Nav.css"


export default function Nav() {


  // 스크롤할때 검정색으로 되는 기능
  const [show, setShow] = useState(false); // 처음에는 항상 작동금지

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50){
        setShow(true);
      }else {
        setShow(false);
      }
    });
    // 이 이펙트를 사용하지 않을때 닫음
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    // false 일때는 nav만 된다.
    <nav className={`nav ${show && "nav__black"}`}> 
      <img
        alt='넷플릭스 로고'
        src='https://w7.pngwing.com/pngs/280/326/png-transparent-logo-netflix-logos-and-brands-icon-thumbnail.png'
        className='nav__logo'
        onClick={() => window.location.reload()} // 클릭시 처음화면으로 리로드
      />
      <img
        alt='유저 로고'
        src='https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg'
        className='nav__avatar'
      />
    </nav>
  )
}
