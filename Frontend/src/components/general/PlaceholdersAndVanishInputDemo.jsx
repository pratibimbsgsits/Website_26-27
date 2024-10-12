import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What did you enjoy the most about our art collection?",
    "How can we improve the user experience on this website?",
    "Do you have any suggestions for future art exhibitions or events?",
    "What features would you like to see added to our website?",
    "How would you rate the overall design and layout of the site?"
  ];
  

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white">
       Give your Valuable Feedback!
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
