'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const ClientProfessionalTab = () => {
    const pathname = usePathname()
    return (
        <div>
            {/* Navigation buttons */}
            <div className='flex justify-center items-center gap-4 mt-4'>
                <Link href="/client/how-it-works"
                    className={`cursor-pointer ${pathname == '/client/how-it-works' ? ' border-b-4 border-yellow-300' : 'text-[#242424]'} text-[15px] font-bold leading-[19.14px] flex flex-col items-center`}
                >
                    <h3 className='mb-2'>Client</h3>
                </Link>

                <Link href="/professional/how-it-works"
                    className={`cursor-pointer ${pathname == '/professional/how-it-works' ? ' border-b-4 border-yellow-300' : 'text-[#242424]'} text-[15px] font-bold leading-[19.14px] flex flex-col items-center`}
                >
                    <h3 className='mb-2'>Professionals</h3>
                </Link>
            </div>
        </div>
    )
}

export default ClientProfessionalTab