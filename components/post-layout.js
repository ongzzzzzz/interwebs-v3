import Header from './header'
import Footer from './footer'

export default function PostLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="relative bg-black text-white w-full min-h-screen">
                {children}
                {/* use padding?? */}
            </div>
            <Footer />
        </div>
    )
}