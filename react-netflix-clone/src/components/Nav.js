// rfc
import React, { useEffect, useState } from 'react';
import "./Nav.css"
import { useNavigate } from 'react-router-dom';


export default function Nav() {


  // 스크롤할때 검정색으로 되는 기능
  const [show, setShow] = useState(false); // 처음에는 항상 작동금지

  // 검색할때 상태관리
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

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
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
        className='nav__logo'
        onClick={() => window.location.reload()} // 클릭시 처음화면으로 리로드
      />

      <input
        value={searchValue}
        onChange={handleChange}
        className='nav__input'
        type='text'
        placeholder='영화를 검색해주세요.'/>

      <img
        alt='유저 로고'
        src='https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg'
        className='nav__avatar'
      />
    </nav>
  )
}
