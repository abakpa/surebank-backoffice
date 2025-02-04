// import { useEffect } from "react";
// import { CheckCircle, XCircle } from "lucide-react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";


const NotificationPopup = ({ messages, type, onClose }) => {
    if (!messages || messages.length === 0) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-80 min-h-[250px] flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2">
            {type === "success" ? (
              <AiOutlineCheckCircle className="text-green-700 w-6 h-6" />
            ) : (
              <AiOutlineCloseCircle className="text-red-700 w-6 h-6" />
            )}
            <h3 className={`text-lg font-semibold ${type === "success" ? "text-green-700" : "text-red-700"}`}>
              {type === "success" ? "Success" : "Error"}
            </h3>
          </div>
          <ul className="mt-2 text-center">
            {messages.map((msg, index) => (
              <li key={index} className={`text-sm ${type === "success" ? "text-green-600" : "text-red-600"}`}>
                {msg}
              </li>
            ))}
          </ul>
          <button 
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-900 w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default NotificationPopup;
  

// const YourComponent = ({ showSuccess, showError, deposit, withdrawal, customerAccount, depositError, withdrawalError, customerAccountError, setShowSuccess, setShowError }) => {
//   useEffect(() => {
//     if (showSuccess || showError) {
//       const timer = setTimeout(() => {
//         setShowSuccess(false);
//         setShowError(false);
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [showSuccess, showError]);

//   return (
//     <>
//       {showSuccess && (
//         <NotificationPopup 
//           messages={[deposit?.message, withdrawal?.message, customerAccount?.message].filter(Boolean)}
//           type="success"
//           onClose={() => setShowSuccess(false)}
//         />
//       )}
//       {showError && (
//         <NotificationPopup 
//           messages={[depositError, withdrawalError, customerAccountError].filter(Boolean)}
//           type="error"
//           onClose={() => setShowError(false)}
//         />
//       )}
//     </>
//   );
// };

// export default YourComponent;
