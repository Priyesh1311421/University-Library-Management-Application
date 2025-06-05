// components/UserCard.tsx
import env from '@/lib/config'
import { Verified } from 'lucide-react'

import Image from 'next/image'

interface UserCardProps {
  fullName: string
  email: string
  universityId: number
  profileImage: string
  universityCard: string 
}

const IMAGEKIT_BASE_URL = env.env.imagekit.urlEndpoint;

const UserCard: React.FC<UserCardProps> = ({
  fullName,
  email,
  universityId,
  universityCard,
}) => {
  const universityCardURL = `${IMAGEKIT_BASE_URL}${universityCard}`

  return (
    <div className="relative max-w-md mx-auto bg-gradient-to-br from-[#232839] to-[#12141D] text-white rounded-2xl shadow-2xl p-6 space-y-16 pt-16 space-x-2 font-ibm-plex-sans h-auto">
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-16 h-24 bg-[#454c6a] rounded-b-full">
            <div className='bg-[#1E2230] h-3 w-12 left-2 rounded-r-full rounded-l-full absolute bottom-8'>

            </div>
        </div>
      {/* Top Section */}
      <div className="flex items-center space-x-8 ">
        <Image
          src='https://github.com/shadcn.png'
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full border-4 border-[#333C5C]"
        />
        <div className='space-y-1'>
          <span className="text-xs text-gray-300 flex items-center gap-2"><Verified height={16} width={16} fill='#FFE1BD' stroke='#12141D'/><p>Verified Student</p></span>
          <p className="text-xl font-semibold text-white">{fullName}</p>
          <p className="text-sm text-gray-300 font-thin">{email}</p>
          
        </div>
      </div>

      {/* Info Section */}
      <div className='space-y-8'>
        <div className='space-y-1'>
            <p className="text-lg text-gray-400 ">University</p>
            <p className="font-bold text-2xl">JS Mastery Pro</p>
        </div>
        <div className='space-y-1'>
            <p className="text-lg text-gray-400">Student ID</p>
            <p className="font-bold text-2xl">{universityId}</p>
        </div>
      </div>

      {/* University Card Image */}
        <Image
          src={universityCardURL}
          alt="University Card"
          width={486}
          height={287}
          className="rounded-md border-none"
        />
    </div>
  )
}

export default UserCard
