import styles from '../../../styles/Common/Alarm/AlarmContainer.module.scss';
import { FiDelete } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { changeComp } from 'redux/slices/chageComp';
import { useRouter } from 'next/router';

const alarmCategoriNum = (data) => {
  const result = data.length > 15 ? data.substr(0, 15) + '...' : data;
  return {
    0: `${result}에 댓글이 달렸습니다.`,
    1: `${result}에 답글이 달렸습니다.`,
    2: `${result}에서 가입이 승인되었습니다.`,
    3: `${result}에서 가입이 거절되었습니다.`,
    4: `${result}에 일정이 생성되었습니다.`,
    5: `${result}에 일정이 수정되었습니다.`,
    6: `${result}에 공지가 생성되었습니다.`,
    7: `${result}에 지원했습니다.`,
    8: `${result}에서 탈퇴했습니다.`,
    9: `${result}에 좋아요가 생겼습니다.`
  };
};

const AlarmList = ({ alarm, onAlarmPatch, setIsDelete }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectComp = () => {
    if (alarm.notiCategoryNum === 4 || alarm.notiCategoryNum === 5) return 4;
    else if (alarm.notiCategoryNum === 6) return 2;
    return 1;
  };

  const moveWhenClickAlarm = async (data) => {
    await router.push(`/${alarm.url}`);
    dispatch(changeComp(selectComp()));
    onAlarmPatch(data);
  };

  const clickDeleteIcon = (data) => {
    setIsDelete(true);
    onAlarmPatch(data);
  };

  return (
    <div className={styles.description}>
      <div className={styles.top}>
        <p id={styles.big} onClick={() => moveWhenClickAlarm(alarm.no)}>
          {alarmCategoriNum(alarm.title)[alarm.notiCategoryNum]}
        </p>
        <FiDelete size={15} onClick={() => clickDeleteIcon(alarm.no)} />
      </div>
      <div
        className={styles.bottom}
        onClick={() => moveWhenClickAlarm(alarm.no)}
      >
        <div>
          <p>작성자 {alarm.sender}</p>
          <p>
            {alarm.content.length > 20
              ? alarm.content.substr(0, 20) + '.....'
              : alarm.content}
          </p>
        </div>
        <span>{alarm.inDate.substr(0, 10)}</span>
      </div>
    </div>
  );
};

export default AlarmList;
