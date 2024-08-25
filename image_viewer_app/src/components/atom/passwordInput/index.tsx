import { useState } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordReveal = styled.span`
  position: absolute;
  left: auto;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export default function PasswordInput() {
  // パスワード表示制御用のstate
  const [isRevealPassword, setIsRevealPassword] = useState(true);

  const togglePassword = () => {
    setIsRevealPassword(prevState => !prevState);
  };

  return (<div style={{ position: 'relative' }} >
    <input id="apiKey" name="apiKey" type={isRevealPassword ? 'text' : 'password'} className="bg-black p-2 px-2" placeholder="APIキー" />
    <PasswordReveal
      onClick={togglePassword}
      role="presentation"
    >
      <FontAwesomeIcon icon={isRevealPassword ? faEye : faEyeSlash} />
    </PasswordReveal>
  </ div >
  )
}