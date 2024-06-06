import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from 'aphrodite'; // Import Aphrodite

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#deb5b545',
  },
  default: {
    backgroundColor: '#f5f5f5ab',
  },
  th: {
    borderBottom: '2px solid #deb5b5',
    padding: '0.5rem',
  },
});

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const rowStyle = isHeader ? styles.header : styles.default;

  return (
    <tr className={css(rowStyle)}>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan={2} className={css(styles.th)}>{textFirstCell}</th>
        ) : (
          <>
            <th className={css(styles.th)}>{textFirstCell}</th>
            <th className={css(styles.th)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.string,
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;