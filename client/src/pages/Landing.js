import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'

function Landing() {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>

        <div className='container page'>
            {/* info */}
            <div className='info'>
                <h1> Job <span>tracking</span> app </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nihil, eius omnis facere officia cum minima libero facilis? Commodi, quae nesciunt culpa neque ut mollitia cum possimus odio laudantium enim tempora vero, optio, dolorem eveniet sequi minus asperiores nam id. Ex quam dignissimos, ipsa tempore aut perspiciatis autem suscipit sunt.</p>
                <Link to='/register' className='btn btn-hero'>
                    Login/Register
                </Link>
            </div>

            <img src={main} alt='job hunt' className='img main-img' />
        </div>
    </Wrapper>
  )
}

export default Landing