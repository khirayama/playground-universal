import React, {PropTypes} from 'react';

export default function CountUpButton(props) {
  return (
    <div
      onClick={props.onCountButtonClick}
      >{props.children}</div>
  );
}

CountUpButton.propTypes = {
  children: PropTypes.node,
  onCountButtonClick: PropTypes.func.isRequired,
};
