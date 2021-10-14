import styles from '../../../styles/Club/Home/Intro/ClubInfo.module.scss';
import LogoUpdate from './LogoUpdate';

const ClubInfo = ({ infos }) => {
  const result = infos.result[0];
  const client = infos.clientInfo;
  return (
    <div className={styles.container}>
      <div className={styles.desc}>
        <div className={styles.thumbnail}>
          <h1>{result.name}</h1>
        </div>
        <div className={styles.categori}>
          <p>{result.category} 동아리</p>
        </div>
        <div className={styles.population}>
          <span>동아리원: {result.genderWomen + result.genderMan} 명 </span>
          <span> 남: {result.genderMan} 명</span>
          <span> 여: {result.genderWomen} 명</span>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img
          src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F422926d7-2e69-4f9f-83ce-afe8a510f99b%2F02B3A73B-6D8D-4BC9-9ABC-39BC38B1B353.jpeg?table=block&id=e30b5df2-5a04-4809-8237-84f0fee40686&spaceId=065109dd-4d22-4e3f-9455-ff3805b7d264&width=250&userId=601054f0-a611-49e0-84b9-04831ec920f4&cache=v2"
          alt={result.fileId}
        />
        {client.leader === 1 && <LogoUpdate />}
      </div>
    </div>
  );
};

export const getClubName = (data) => {
  return data;
};

export default ClubInfo;
