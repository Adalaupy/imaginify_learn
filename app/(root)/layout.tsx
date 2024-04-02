import Sidebar from '@/components/shared/Sidebar'
import { SignedIn } from '@clerk/nextjs'





const layout = ({ children }: { children: React.ReactNode }) => {


    return (


        <div className='root'>
            <Sidebar />
            <SignedIn>
                {children}
            </SignedIn>
        </div>
    )
}

export default layout