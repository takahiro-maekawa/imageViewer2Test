import { useEffect, useState } from "react";
import styled from 'styled-components';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import dynamic from "next/dynamic";

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon), { ssr: true });

const PasswordReveal = styled.span`
  position: absolute;
  left: auto;
  right: 10px;
  top: 10px;
  height: auto;
  cursor: pointer;
`;

export default function PasswordInput() {
  // パスワード表示制御用のstate
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePassword = () => {
    setIsRevealPassword(prevState => !prevState);
  };

  return (<div style={{ position: 'relative' }} >
    <input id="apiKey" name="apiKey" type={isRevealPassword ? 'text' : 'password'} className="bg-black p-2 px-2" placeholder="APIキー" />
    {isClient && (
      <PasswordReveal
        onClick={togglePassword}
        role="presentation"
      >
        <FontAwesomeIcon icon={isRevealPassword ? faEye : faEyeSlash} />
      </PasswordReveal>
    )}
  </div >
  )
}