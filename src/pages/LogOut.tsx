import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';
import styles from './LogOut.module.css'
const LogOut = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    // navigate('/');
  };
  return (
    <>
      <button className={styles.logOut} onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default LogOut;