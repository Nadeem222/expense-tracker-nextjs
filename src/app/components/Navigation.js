import { ImStatsBars } from 'react-icons/im'
import { useContext } from 'react'
import { authContext } from '../lib/store/auth-context'

function Nav() {
    const { user, loading, logout } = useContext(authContext)
    return (
        <header className="container max-w-2xl px-6 py-6 mx-auto" >
            <div className="flex item justify-between">
                {user && !loading && (

                    <div className="flex items-center gap-x-4">
                        {/* image */}
                        <div className="h-[40px] w-40px] rounded-full overflow-hidden">

                            <img
                                className="w-full h-full object-cover"
                                src={user.photoURL}
                                alt={user.displayName}
                                referrerPolicy='no-referrer'
                            />
                        </div>

                        {/* name */}
                        <small>Hi, {user.displayName}!</small>
                    </div>
                )}

                {user && !loading && (

                    <nav className="flex items-center gap-x-2">

                        <div><ImStatsBars className="text-2xl" /></div>
                        <div><button onClick={logout} className="btn btn-danger">Sign out</button></div>
                    </nav>
                )}
            </div>
            {/* User Information */}
        </header>
    )
}

export default Nav