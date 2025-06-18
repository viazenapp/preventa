import { useState } from 'react';

const TestLandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    console.log('Button clicked!');
    alert('Button works!');
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Viazen Test Page</h1>
      
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg"
      >
        Test Button - Unite a la Preventa
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Modal funciona!</h2>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestLandingPage;
