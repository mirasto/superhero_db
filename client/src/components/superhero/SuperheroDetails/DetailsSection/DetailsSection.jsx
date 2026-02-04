import styles from './DetailsSection.module.css';

const DetailsSection = ({ title, children, className = '' }) => (
    <section className={`${styles.detailsSection} ${className}`}>
        <h2>{title}</h2>
        {children}
    </section>
);

export default DetailsSection;
