import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="default__layout">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
