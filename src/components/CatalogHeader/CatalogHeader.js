import bg from '../../assets/footer-bg.jpg';

import './CatalogHeader.scss';

function CatalogHeader({ children }) {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
            <h2>{children}</h2>
        </div>
    );
}

export default CatalogHeader;
