import PropTypes from 'prop-types';

export default function Button({ children, onClick }) {
  return (
    <button className="Button" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
