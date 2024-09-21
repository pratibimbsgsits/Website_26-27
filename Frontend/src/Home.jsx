import { useState } from 'react';

function Home() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [batch, setBatch] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleInputChange = () => {
    if (enrollmentNumber && batch) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div>
      <h1>Enter Details</h1>
      <input
        type="text"
        placeholder="Enrollment Number"
        value={enrollmentNumber}
        onChange={(e) => {
          setEnrollmentNumber(e.target.value);
          handleInputChange();
        }}
      />
      <input
        type="text"
        placeholder="Batch"
        value={batch}
        onChange={(e) => {
          setBatch(e.target.value);
          handleInputChange();
        }}
      />
      <button onClick={handleGoogleAuth} disabled={!isButtonEnabled}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Home;
