import styles from '../../../styles/Message/Option.module.scss';
import { FiMail } from 'react-icons/fi';
import { useRef, useEffect } from 'react';
import router from 'next/router';
import { useSelector } from 'react-redux';

const Option = ({ setOpenOptions, setOpenMessage, routePath }) => {
  const ref = useRef(null);
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenOptions(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.rect} />
      <ul ref={ref} className={styles.dropdownMenu}>
        {user?.id !== post?.studentId && (
          <li className={styles.send} onClick={() => setOpenMessage(true)}>
            <FiMail />
            쪽지 보내기
          </li>
        )}
        {post?.studentId !== '익명1' && (
          <li className={styles.profile} onClick={() => router.push(routePath)}>
            프로필
          </li>
        )}
      </ul>
    </div>
  );
};

export default Option;
