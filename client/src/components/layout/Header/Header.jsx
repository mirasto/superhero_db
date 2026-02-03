import Logo from './Logo/Logo';
import Nav from './Nav/Nav';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Logo />
                    <Nav />
                </div>
            </div>
        </header>
    );
};

export default Header;
