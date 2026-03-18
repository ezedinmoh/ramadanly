import React from 'react';

const NavigationFooter = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onBookmark,
  isBookmarked
}) => {
  return (
    <div className="navigation-footer">
      <button
        className="btn-nav btn-previous"
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <i className="fa-solid fa-chevron-left"></i>
        <span>Previous</span>
      </button>

      <button
        className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
        onClick={onBookmark}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
      >
        <i className={`fa-solid fa-bookmark`}></i>
        <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>

      <button
        className="btn-nav btn-next"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <span>Next</span>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default NavigationFooter;
