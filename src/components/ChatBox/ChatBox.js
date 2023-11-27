import React from 'react';
import "./ChatBox.css";

// const ChatBox = () => {
//   return (
//     <section style={{ backgroundColor: '#eee' }}>
//       <div className="container py-5">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-8 col-lg-6 col-xl-4">
//             <div className="card" id="chat1" style={{ borderRadius: '15px' }}>
//               <div className="card-header d-flex justify-content-between align-items-left p-3 bg-info text-white border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
//                 <i className="fas fa-angle-left"></i>
//                 <p className="mb-0 fw-bold">Live chat</p>
//                 <i className="fas fa-times"></i>
//               </div>
//               <div className="card-body">
//                 {/* Chat content goes here */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChatBox;



const ChatBox = () => {
  return (
    <section style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container p-0">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="card" id="chat1" style={{ borderRadius: '0px', backgroundColor: '#FFFFFF'  }}>
              <div className="card-header d-flex justify-content-between align-items-center p-0 bg-#CDDCDF text-#CDDCDF border-bottom-0"
                style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
                <i className="fas fa-angle-left"></i>
                <p className="mb-0 p-4 fw-bold" style={{ color: '#000000' ,backgroundColor: '#CDDCDF', width: '100%', height: '100%' }}>abcd-anonym</p>
                <i className="fas fa-times"></i>
              </div>
              <div className="card-body">
                {/* Chat messages */}
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                  <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: '#cddcdf' }}>
                    <p className="small mb-0">Hello!</p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                  <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: '#cddcdf' }}>
                    <p className="small mb-0">I have recieved the payment for the product. I will send it over soon.</p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4">
                  <div className="p-3 me-3 border" style={{ borderRadius: '15px', backgroundColor: '#cddcdf' }}>
                    <p className="small mb-0">That's great!</p>
                  </div>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                </div>
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                  <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: '#cddcdf' }}>
                    <p className="small mb-0">Have you recieved it yet?</p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4">
                  <div className="p-3 me-3 border" style={{ borderRadius: '15px', backgroundColor: '#cddcdf' }}>
                    <p className="small mb-0">Yes, I have.</p>
                  </div>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                </div>
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                  <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: '#cddcdf' }}>
                    <p className="small mb-0">Is the product to your satistaction?</p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4">
                  <div className="p-3 me-3 border" style={{ borderRadius: '15px', backgroundColor: '#cddcdf' }}>
                    <p className="small mb-0">Yes thank you, I really like your product.</p>
                  </div>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                </div>
                {/* Chat input */}
                {/* <div className="form-outline">
                  <textarea className="form-control" id="textAreaExample" rows="1">Type</textarea>
                </div> */}
                
                <div className="input-group mb-0 p-3" style={{ maxHeight: '100px' }}>
      <input
        type="Type something"
        className="form-control rounded form-control-lg w-100"
        placeholder="Type something"
        aria-label="Type something"
        aria-describedby="Type something-addon"
      />
      </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;

