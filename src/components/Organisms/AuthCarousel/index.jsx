import React from 'react';
import { Col } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import Image from 'next/image';

// Import Images
import logoLight from '../../../../public/images/logo-light.png';

const AuthSlider = () => {
  return (
    <React.Fragment>
      <Col lg={6}>
        <div className="p-lg-5 p-4 auth-one-bg h-100">
          <div className="bg-overlay"></div>
          <div className="position-relative h-100 d-flex flex-column">
            <div className="mb-4">
              <Link href="/dashboard" className="d-block">
                <Image src={logoLight} alt="" height="18" />
              </Link>
            </div>
            <div className="mt-auto">
              <div className="mb-3">
                <i className="ri-double-quotes-l display-4 text-success"></i>
              </div>

              <Carousel
                showThumbs={false}
                autoPlay={true}
                showArrows={false}
                showStatus={false}
                infiniteLoop={true}
                className="carousel slide"
                id="qoutescarouselIndicators">
                <div className="carousel-inner text-center text-white-50 pb-5">
                  <div className="item">
                    <p className="fs-15 fst-italic">"Turning Data into Relationships, Seamlessly."</p>
                  </div>
                </div>
                <div className="carousel-inner text-center text-white-50 pb-5">
                  <div className="item">
                    <p className="fs-15 fst-italic">" Strengthening Bonds, Driving Results"</p>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default AuthSlider;
