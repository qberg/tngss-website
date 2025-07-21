import PropTypes from 'prop-types';

export default function ShineGrdnt({ className, cN1 = '', cN2 = '' }) {

    return (
        <div className={`absolute flex ${className}`}>
            <div className={`absolute bg-radial from-red-500 ${cN1}`}></div>
            <div className={`absolute ${cN2}`}></div>
        </div>
    );
}

ShineGrdnt.propTypes = {
    className: PropTypes.string.isRequired,
    cN1: PropTypes.string,
    cN2: PropTypes.string,
};

ShineGrdnt.defaultProps = {
    cN1: '', // Default value for cN1
    cN2: '', // Default value for cN2
};
