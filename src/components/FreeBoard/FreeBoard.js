import Header from "../Common/Header";
import FreeBoardTable from "./FreeBoardTable";
import FreeBoardSearch from "./FreeBoardSearch";
import FreeBoardPagination from "./FreeBoardPagination";
import styles from "./FreeBoard.module.sass";

function FreeBoard() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <FreeBoardTable />
        <div>
          <FreeBoardSearch />
          <button>✏️ 글쓰기</button>
        </div>
        <FreeBoardPagination />
      </div>
    </div>
  );
}

export default FreeBoard;
