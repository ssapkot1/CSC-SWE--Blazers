import React, { useState } from 'react';

const Rating = ({ onRate, movie }) => {
  const [rating, setRating] = useState(0);
  const validRatingRange = { min: 1, max: 10 };

  // Create an array of buttons for ratings 1 through 10
  const ratingButtons = Array.from({ length: validRatingRange.max }, (_, i) => i + 1).map((num) => (
    <button
      key={num}
      className={`rating-button ${rating === num ? 'selected' : ''}`}
      onClick={() => setRating(num)}
    >
      {num}
    </button>
  ));

  // Handle the rating submission
  const handleRatingSubmission = () => {
    // Check if the rating is within the valid range
    if (rating >= validRatingRange.min && rating <= validRatingRange.max) {
      onRate(movie?._id, rating);
    } else {
      console.error(`Rating is out of bounds: ${rating}`);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div>
      <h3>{movie?.title || 'Movie Title'}</h3>
      <div className="rating-buttons">
        {ratingButtons}
      </div>
      <button 
        onClick={handleRatingSubmission}
        disabled={rating === 0 || !movie?._id} // Ensure movie has an _id
      >
        Rate Movie
      </button>
    </div>
  );
};

export default Rating;
