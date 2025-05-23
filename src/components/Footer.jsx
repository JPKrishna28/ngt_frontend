const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {year} Employee Time Tracker App</p>
      </div>
    </footer>
  );
};

export default Footer;