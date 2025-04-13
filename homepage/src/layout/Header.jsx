import { useState } from 'react';
import logo from '../assets/images/icons/vite.svg';

function Header() {
  const [count, setCount] = useState(0)

  return (
    <header className='header'>
        <div className='header__inner'>
            <h1>
                <a href="#about" class="navbar__link"><img src={logo} alt="logo" /></a>
            </h1>

            <nav class="navbar">
                <ul class="navbar__list">
                    <li class="navbar__item"><a href="#about" class="navbar__link">회사소개</a></li>
                    <li class="navbar__item"><a href="#services" class="navbar__link">서비스소개</a></li>
                    <li class="navbar__item"><a href="#contact" class="navbar__link">문의하기</a></li>
                </ul>
            </nav>

        </div>
    </header>
  )
}

export default Header
