import React from "react";

const CareerContent = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-16 lg:py-[100px] bg-white">
      {/* Download Header */}
      <div className="flex flex-row  items-center mb-8">
        <h2 className="text-2xl sm:text-[30px] font-bold text-[#000000]  ">
          TDG’s Commitment to Student Development
        </h2>
      </div>

      {/* Introduction */}
      <div className="mb-10 md:mb-12">
        <p className="mb-4 text-base sm:text-lg md:text-[20px]">
          At TDG, we recognize that the future of our industry depends on the
          knowledge, creativity, and passion of the next generation. We are
          committed to supporting the professional and personal development of
          students by providing opportunities to learn, grow, and gain practical
          experience.
        </p>
        <p className="mb-4 text-base sm:text-lg md:text-[20px]">
          Through collaboration with educational institutions, internships,
          training initiatives, and mentoring programs, TDG actively invests in
          building pathways for young people to develop their skills and prepare
          for meaningful careers. Our goal is to empower students with not only
          technical expertise but also the confidence and vision to contribute
          to innovation and progress.
        </p>

        <p className="mb-4 text-base sm:text-lg md:text-[20px]">
          We firmly believe that by supporting students today, we are shaping
          the leaders, innovators, and experts of tomorrow. This commitment
          reflects TDG’s values of responsibility, excellence, and long-term
          partnership with the communities in which we operate.
        </p>
      </div>

      {/* Training Section */}
      <div className="mb-10 md:mb-12">
        <ul className="mb-4 text-base sm:text-lg md:text-[20px] list-disc ml-6 md:ml-8 space-y-1">
          <li className="mb-4">
            Students interested in internship and COOP opportunities are
            encouraged to <br /> send their resumes to{" "}
            <a
              href="mailto:careers@tdgdesign.com?subject=Internship%20and%20COOP%20Opportunities"
              className="bg-[#DBE2E7] px-5 py-2 rounded-md font-semibold text-[18px] sm:text-[20px] inline-block hover:bg-gray-300 transition-colors duration-200 "
            >
              Send Email
            </a>
          </li>

          <li className="mb-4">
            this is the email we created where people : careers@tdgdesign.com{" "}
            <br /> send their resumes to{" "}
            <a
              href="mailto:careers@tdgdesign.com?subject=Internship%20and%20COOP%20Opportunities"
              className="bg-[#DBE2E7] px-5 py-2 rounded-md font-semibold text-[18px] sm:text-[20px] inline-block hover:bg-gray-300 transition-colors duration-200 "
            >
              Send Email
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CareerContent;
