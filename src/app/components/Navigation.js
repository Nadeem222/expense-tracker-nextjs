import {ImStatsBars} from 'react-icons/im'

function Nav() {
    return (
        <header className="container max-w-2xl px-6 py-6 mx-auto" >
            <div className="flex item justify-between">

                <div className="flex items-center gap-x-2">
                    {/* image */}
                    <div className="h-[40px] w-40px] rounded-full overflow-hidden">

                        <img
                            className="w-full h-full object-cover"
                            src="https://www.pngkit.com/png/full/355-3550300_voc-no-centro-de-tudo-happy-man.png"
                            alt="profile image"
                        />
                    </div>

                    {/* name */}
                    <small>Hi, Nadeem</small>
                </div>

                <nav className="flex items-center gap-x-2">

                    <div><ImStatsBars className="text-2xl" /></div>
                    <div><button className="btn btn-danger">Sign out</button></div>
                </nav>
            </div>
            {/* User Information */}
        </header>
    )
}

export default Nav