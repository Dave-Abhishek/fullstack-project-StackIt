import { useState } from 'react'
import Navbar from '../../components/Home/Navbar'
import NavbarTwo from '../../components/Home/NavbarTwo'
import Window from './Window'
import AskQuestion from '../../components/User/UserPostForm/AskQuestion'

const MarketPlace = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
        <Navbar />
        <NavbarTwo onAskClick={() => setIsModalOpen(true)} />
        <AskQuestion isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Window />
        
    </div>
  )
}

export default MarketPlace