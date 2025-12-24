"use client";

import React, { useMemo, useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BadgeCheck } from "lucide-react";
import { fetchCareers } from "@/lib/api";

const CareerContent = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCareers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCareers();
        setJobOpenings(data || []);
      } catch (err) {
        console.error("Error loading careers:", err);
        setError(
          "Failed to load career opportunities. Please try again later."
        );
        setJobOpenings([]);
      } finally {
        setLoading(false);
      }
    };

    loadCareers();
  }, []);

  return (
    <div className="max-w-[1300px] mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-[100px] bg-white">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-bold text-[#000000] leading-tight">
          TDG's Commitment to Student Development
        </h2>
      </div>

      {/* Introduction */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <p className="mb-4 sm:mb-5 text-[17px] leading-6 sm:leading-7 md:leading-8 text-[#1f2937]">
          At TDG, we recognize that the future of our industry depends on the
          knowledge, creativity, and passion of the next generation. We are
          committed to supporting the professional and personal development of
          students by providing opportunities to learn, grow, and gain practical
          experience.
        </p>
        <p className="mb-4 sm:mb-5 text-[17px] leading-6 sm:leading-7 md:leading-8 text-[#1f2937]">
          Through collaboration with educational institutions, internships,
          training initiatives, and mentoring programs, TDG actively invests in
          building pathways for young people to develop their skills and prepare
          for meaningful careers. Our goal is to empower students with not only
          technical expertise but also the confidence and vision to contribute
          to innovation and progress.
        </p>

        <p className="mb-4 sm:mb-5 text-[17px] leading-6 sm:leading-7 md:leading-8 text-[#1f2937]">
          We firmly believe that by supporting students today, we are shaping
          the leaders, innovators, and experts of tomorrow. This commitment
          reflects TDG's values of responsibility, excellence, and long-term
          partnership with the communities in which we operate.
        </p>
      </div>

      {/* Vacancies */}
      <div className="mb-10 sm:mb-12 md:mb-16">
        <section>
          <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold uppercase text-[#000000] mb-4 tracking-[2px] sm:mb-6">
            Current Opportunities
          </h3>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">
                Loading career opportunities...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-10">
              <p className="text-lg text-red-600">{error}</p>
            </div>
          )}

          {/* Job Listings */}
          {!loading && !error && (
            <JobAccordionList
              className="mt-4 sm:mt-6"
              jobOpenings={jobOpenings}
            />
          )}

          {/* Empty State */}
          {!loading && !error && jobOpenings.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">
                No career opportunities available at this time. Please check
                back later.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Training Section */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <ul className="space-y-4 sm:space-y-5 text-[17px] md:text-[17px] leading-6 sm:leading-7 list-disc ml-5 sm:ml-6 md:ml-8">
          <li className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="text-[#1f2937]">Students / internship :</span>
            <a
              href="mailto:careers@tdgdesign.com?subject=Internship%20and%20COOP%20Opportunities"
              className="bg-[#DBE2E7] px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-md font-semibold text-[17px] md:text-[18px] hover:bg-gray-300 active:bg-gray-400 transition-colors duration-200 min-h-[44px] flex items-center justify-center w-fit"
            >
              Send Email
            </a>
          </li>

          <li className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="text-[#1f2937]">Careers :</span>
            <a
              href="mailto:careers@tdgdesign.com?subject=Career%20Opportunities"
              className="bg-[#DBE2E7] px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-md font-semibold text-[17px] md:text-[18px] hover:bg-gray-300 active:bg-gray-400 transition-colors duration-200 min-h-[44px] flex items-center justify-center w-fit"
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

const JobAccordionList = ({ className = "", jobOpenings = [] }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className={`space-y-3 sm:space-y-4 md:space-y-5 ${className}`}>
      {jobOpenings.map((job, index) => (
        <JobAccordionItem
          key={job.title}
          job={job}
          index={index}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </div>
  );
};

const JobAccordionItem = ({ job, index, activeIndex, setActiveIndex }) => {
  const isOpen = activeIndex === index;

  const gradientSummaryStyles = useMemo(
    () =>
      isOpen
        ? "!bg-[#edeff3] shadow-sm text-black border-l-4 border-[#0E54C4]"
        : "!bg-gray-50 !text-black hover:bg-gray-100",
    [isOpen]
  );

  // Helper function to check if a value has content
  const hasContent = (value) => {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return true;
  };

  const structuredSections = [
    hasContent(job.overview) && {
      title: "Who we are",
      paragraphs: [job.overview],
    },
    hasContent(job.whyWork) && {
      title: "Why work for us",
      paragraphs: [job.whyWork],
    },
    hasContent(job.jobDescription) && {
      title: "Job Description",
      list: job.jobDescription,
    },
    hasContent(job.requirements) && {
      title: "Requirements & Experience",
      list: job.requirements,
    },
    hasContent(job.specialSkills) && {
      title: "Special Skill Requirements",
      list: job.specialSkills,
    },
    hasContent(job.desiredExperience) && {
      title: "Desired Experience",
      list: job.desiredExperience,
    },
    hasContent(job.workingConditions) && {
      title: "Working Conditions",
      list: job.workingConditions,
    },
    hasContent(job.education) && {
      title: "Education",
      list: job.education,
    },
  ].filter(Boolean);

  const hasStructuredSections = structuredSections.length > 0;

  return (
    <Accordion
      expanded={isOpen}
      onChange={() => setActiveIndex(isOpen ? -1 : index)}
      disableGutters
      square={false}
      elevation={0}
      sx={{
        borderRadius: "0px !important",
        "&::before": { display: "none" },
        overflow: "hidden",
        backgroundColor: "transparent",
        my: { xs: 0.5, sm: 1 },
        boxShadow: isOpen
          ? "0 2px 8px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease",
        marginBottom: { xs: "12px", sm: "16px" },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            className="text-black flex-shrink-0"
            sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }}
          />
        }
        className={`${
          isOpen
            ? "!border-l-4 !border-[#2d4a86]"
            : "border-b border-gray-200 !bg-gray-50"
        } !flex w-full !px-1 sm:!px-4 md:!px-5 !py-3 sm:!py-4 text-left transition-colors ${gradientSummaryStyles} min-h-[80px] sm:min-h-[85px]`}
        sx={{
          "&:hover": {
            backgroundColor: isOpen ? undefined : "#E6F2FF",
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: "8px", sm: "12px", md: "16px" },
            width: "100%",
            "&.Mui-expanded": {
              margin: 0,
            },
          },
        }}
      >
        {/* Title and Status Container */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Job Title */}
          <h4 className="text-[17px] md:text-lg lg:text-xl font-semibold text-[#000000] tracking-[1px] break-words flex-1">
            {job.title}
          </h4>

          {/* Status Badge */}
          <div className="flex items-center text-xs sm:text-sm font-semibold text-[#0E54C4] flex-shrink-0">
            <BadgeCheck className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{job.status}</span>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className="!bg-gray-50 !px-2 sm:!px-4 md:!px-5 !pb-4 sm:!pb-6 !pt-3 sm:!pt-4 text-[#0F172A]">
        {hasStructuredSections ? (
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {structuredSections.map((section) => (
              <DetailSection key={section.title} section={section} />
            ))}
          </div>
        ) : (
          <>
            {hasContent(job.summary) && (
              <p className="mb-4 text-[16px] leading-6 sm:leading-7 text-[#1f2937]">
                {job.summary}
              </p>
            )}
          </>
        )}
        <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap items-center gap-3">
          {job.applyUrl ? (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A66C2] rounded-md px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#084c93] active:bg-[#063d7a] min-h-[44px] flex items-center justify-center"
            >
              Apply through LinkedIn
            </a>
          ) : (
            <p className="text-xs sm:text-sm text-[#475569] leading-5">
              To apply, email careers@tdgdesign.com and reference the job title.
            </p>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const DetailSection = ({ section: { title, paragraphs, list } }) => (
  <div>
    <h5 className="mb-2 sm:mb-3 text-xs sm:text-sm font-bold uppercase tracking-wide text-[#0E54C4]">
      {title}
    </h5>
    {paragraphs &&
      paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="mb-3 sm:mb-4 text-[16px] leading-6 sm:leading-7 text-[#1f2937]"
        >
          {paragraph}
        </p>
      ))}
    {list && (
      <ul className="list-disc pl-5 sm:pl-6 text-[16px] leading-6 sm:leading-7 text-[#1f2937] space-y-1.5 sm:space-y-2">
        {list.map((item) => (
          <li key={item} className="mb-1">
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
);
