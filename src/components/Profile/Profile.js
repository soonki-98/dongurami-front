import { useCallback, useEffect, useState } from 'react';
import Scraps from './Scraps';
import styles from 'styles/Profile/Profile.module.scss';
import UserInfo from './UserInfo/UserInfo';
import MyPost from './MyPost';
import { useRouter } from 'next/router';
import { getScraps, getUserInfo } from 'apis/profile';
import getToken from 'utils/getToken';
import { useDispatch } from 'react-redux';
import { signOut } from 'redux/slices/user';

function Profile() {
  const dispatch = useDispatch();
  const [comp, setComp] = useState('프로필');
  const [userInfo, setUserInfo] = useState({});
  const [profile, setProfile] = useState({});
  const [id, setId] = useState('');
  const [clubNo, setClubNo] = useState(0);
  const [dataArr, setDataArr] = useState([]);
  const [token, setToken] = useState(getToken());
  const [isOpen, setIsOpen] = useState(false);
  const [leaveIsOpen, setLeaveIsOpen] = useState(false);

  const router = useRouter();

  const logout = useCallback(() => {
    window.localStorage.removeItem('jwt');
    dispatch(signOut());
    router.push('/');
  }, [dispatch, router]);

  const baseImg =
    'https://blog.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg';

  const matchTitle = useCallback((title) => {
    if (matchMedia('screen and (max-width: 280px)').matches) {
      return title.length >= 5 ? title.substring(0, 3) + '..' : title;
    } else if (matchMedia('screen and (max-width: 530px)').matches) {
      return title.length >= 6 ? title.substring(0, 4) + '..' : title;
    }
    return title.length >= 8 ? title.substring(0, 6) + '..' : title;
  }, []);

  const setState = (data) => {
    setUserInfo(data.userInfo);
    setProfile(data.profile);
    setClubNo(data.profile.clubs.length === 0 ? 0 : data.profile.clubs[0].no);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getUserInfo(router.query.pid, token)
      .then((res) => setState(res.data))
      .catch((err) => {
        alert(err.response.data.msg);
        router.back();
      });
  }, [token, router]);

  useEffect(() => {
    if (!router.isReady) return;
    setId(router.query.pid);
    setToken(getToken());
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = 'visible';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <button
          style={comp !== '프로필' ? { background: '#f2f2f2' } : null}
          className={styles.profileBtn}
          onClick={() => setComp('프로필')}
        >
          프로필
        </button>
        {userInfo.id === profile.id && (
          <button
            style={comp !== '스크랩' ? { background: '#f2f2f2' } : null}
            className={styles.scrapBtn}
            onClick={() => {
              if (profile.clubs.length > 0) setComp('스크랩');
              else alert('가입된 동아리가 없습니다.');
            }}
          >
            스크랩
          </button>
        )}
        <button
          style={comp !== '작성글' ? { background: '#f2f2f2' } : null}
          className={styles.myPost}
          onClick={() => {
            setComp('작성글');
          }}
        >
          작성글
        </button>
      </div>
      {comp !== '스크랩' ? (
        <UserInfo
          logout={logout}
          baseImg={baseImg}
          userInfo={userInfo}
          profile={profile}
          comp={comp}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          leaveIsOpen={leaveIsOpen}
          setLeaveIsOpen={setLeaveIsOpen}
          clubNo={clubNo}
        />
      ) : (
        <Scraps
          userInfo={userInfo}
          profile={profile}
          setClubNo={setClubNo}
          clubNo={clubNo}
          getScraps={getScraps}
          dataArr={dataArr}
          setDataArr={setDataArr}
          id={id}
          matchTitle={matchTitle}
        />
      )}
      {comp === '작성글' && <MyPost />}
    </div>
  );
}

export default Profile;
