import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>

            <MDBCol md="4" lg="4" xl="4" className='mx-auto mb-4 p-4'>
              <h6 className='text-uppercase fw-bold mb-4'>BUY</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Registration
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Bidding and buying help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="4" xl="3" className='mx-auto mb-4 p-4'>
              <h6 className='text-uppercase fw-bold mb-4'>SELL</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Start selling
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="4" xl="3" className='mx-auto mb-md-0 mb-4 p-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Hyderabad, Telangana 500078, IND
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                bitsbids.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 91 6309 481575
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

    </MDBFooter>
  );
}

export default Footer;