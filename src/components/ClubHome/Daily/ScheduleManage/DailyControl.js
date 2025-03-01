import styles from 'styles/Club/Home/Schedule/DailyControl.module.scss';
import { HiPencil } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { getInfo, deleteSchedule, importantSchedule } from 'apis/calendar';

const DailyControl = ({
  setTitle,
  setPeriod,
  setNo,
  schedule,
  date,
  setPop,
  pop,
  setColor,
  today,
  setSchedule,
  Qdata,
  inDate
}) => {
  const getData = () => {
    getInfo(Qdata.id, today.format('YYYY-MM'))
      .then((res) => setSchedule(res.data.result))
      .catch((err) => alert(err.response.data.msg));
  };
  const onClickModify = (schedule) => {
    setTitle(schedule.title);
    setPeriod([schedule.startDate, schedule.endDate]);
    setNo(schedule.no);
    setColor(schedule.colorCode);
    setPop('ScheduleModify');
  };

  const onDeleteSchedule = async (el) => {
    await deleteSchedule(Qdata.id, el)
      .then((res) => console.log(res))
      .catch((err) => alert(err.response.data.msg));
    await getData();
  };

  const importantModify = (schedule, e) => {
    importantSchedule(Qdata.id, schedule, { important: e }).then((res) =>
      getData()
    );
  };

  if (pop !== 'DailyControl') return null;

  return (
    <div className={styles.wrap} onClick={() => setPop('Calendar')}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{date} 일정</h3>
        </div>
        <MdClose
          className={styles.closeBtn}
          onClick={() => setPop('Calendar')}
        />
        <div className={styles.body}>
          <div className={styles.schedule}>
            {schedule.map((eachScedule, index) => {
              return (
                inDate(eachScedule.startDate, date, eachScedule.endDate) && (
                  <div key={index} className={styles.des}>
                    <div className={styles.importantSchedule}>
                      {eachScedule.important ? (
                        <AiFillStar
                          className={styles.fillStar}
                          onClick={() => importantModify(eachScedule, 0)}
                        />
                      ) : (
                        <AiOutlineStar
                          className={styles.outLineStar}
                          onClick={() => importantModify(eachScedule, 1)}
                        />
                      )}
                      <span key={eachScedule.no}>{eachScedule.title}</span>
                    </div>
                    <div className={styles.edit}>
                      <HiPencil
                        onClick={() => onClickModify(eachScedule)}
                        className={styles.pencil}
                      />
                      <FaTrashAlt
                        onClick={() => {
                          if (eachScedule.important === 0)
                            onDeleteSchedule(eachScedule);
                          else alert('주요 일정은 삭제 할 수 없습니다.');
                        }}
                        className={styles.delete}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyControl;
