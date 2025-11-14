"use client";

import React, { useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BadgeCheck } from "lucide-react";

const jobOpenings = [
  {
    title: "Intermediate Mechanical Designer",
    company: "TDG Transit Design Group Inc",
    location: "Mississauga, Ontario, Canada",
    status: "Actively Hiring",
    posted: "2 weeks ago",
    applyUrl:
      "https://ca.linkedin.com/jobs/view/intermediate-mechanical-designer-at-tdg-transit-design-group-inc-4331164094?position=1&pageNum=0&refId=%2BD3skSs8gsA%2FxQ7wgLAtHQ%3D%3D&trackingId=0X551IEZosLDU4txsulPEg%3D%3D",
    summary:
      "Support new rail-lighting programs by translating customer specs into robust CAD assemblies and validation plans.",
    overview:
      "TDG is a global leader in building complete interior and exterior lighting systems for rail applications. With corporate headquarters based in Mississauga, TDG specializes in LED innovations, continually introducing new technology to provide customers the best in the market.",
    whyWork:
      "We are growing and looking for quality people to join our team. TDG has grown rapidly over the last 5 years and we are searching for talented individuals to grow with our company.",
    jobDescription: [
      "Exterior and interior design of lighting systems for locomotive and rail passenger vehicles.",
      "Production of detailed 3D models, general assemblies, and fabrication drawings using SolidWorks.",
      "Perform detailed 3D designs, drawings, and bills of materials.",
      "Revise designs and drawings based on internal and customer feedback to develop engineered solutions that meet or exceed customer requirements.",
      "Keep project design records and files up to date.",
      "Maintain an organized filing system for all CAD files according to TDG procedures.",
      "Adhere to timelines and project schedules.",
    ],
    requirements: [
      "5+ years’ experience as a Mechanical Designer.",
      "Experience with 3D modeling software such as CATIA, Inventor, Pro-E, SolidEdge, etc.; SolidWorks expertise is an asset.",
      "Advanced SolidWorks skills for sheet metal design.",
      "Knowledge of manufacturing processes including CNC machining, sheet metal, metal and plastic extruding, fabrication, 3D printing, injection molding, die-casting, and stamping.",
      "Working knowledge of GD&T.",
      "Basic understanding of electronics / PCB.",
      "Proficiency with Microsoft Office (Word, Excel, Outlook, PowerPoint).",
      "Strong written and verbal communication skills.",
      "Excellent capacity for synthesis, analysis, and innovation.",
    ],
    workingConditions: [
      "Competitive salary.",
      "Stable schedule from Monday to Friday.",
    ],
    education: [
      "Diploma in Mechanical Engineering Technology (Design) or University degree in Mechanical Engineering.",
    ],
    responsibilities: [
      "Develop detailed 3D models and drawings for lighting components and mounting hardware.",
      "Collaborate with electrical and testing teams to resolve integration issues.",
      "Support prototype builds and drive continuous improvement initiatives.",
    ],
  },
  {
    title: "Production Supervisor",
    company: "TDG Transit Design Group Inc",
    location: "Mississauga, Ontario, Canada",
    status: "Actively Hiring",
    posted: "18 hours ago",
    applyUrl:
      "https://ca.linkedin.com/jobs/view/production-supervisor-at-tdg-transit-design-group-inc-4335883435?position=2&pageNum=0&refId=qol7vb%2Ff5tccRgAdaawmzg%3D%3D&trackingId=2ZBLxdJat%2BftA5baiFpWyQ%3D%3D",
    summary:
      "Lead plant efficiency and production scheduling efforts while ensuring high standards for quality, safety, and team development across TDG’s rail-lighting manufacturing lines.",
    overview:
      "TDG Transit Design Group is a non-unionized global leader in complete interior and exterior lighting for rail applications, delivering innovative LED solutions from its Mississauga headquarters since 1989.",
    whyWork:
      "We’re growing quickly and need an organized leader to manage day-to-day production functions. This mid-senior role suits professionals with 8–10 years of manufacturing experience who excel at scheduling, supervision, and technical oversight.",
    jobDescription: [
      "Own overall plant efficiency, productivity, and production scheduling.",
      "Supervise teams to achieve corporate production and sales targets.",
      "Recruit, coach, and evaluate production employees while meeting quality standards.",
      "Train staff to meet customer and corporate requirements; drive KPI and ISO documentation updates.",
      "Coordinate preventive maintenance with vendors and internal resources.",
      "Improve and sustain 5S practices; host weekly productivity reviews with senior management.",
    ],
    requirements: [
      "8–10 years of experience in a manufacturing environment.",
      "ISO environment or auditing exposure considered an asset.",
      "Proficiency with Microsoft Word, Excel, and Outlook.",
      "Experience supervising teams of 20+ employees.",
      "Mechanical and electrical assembly background preferred.",
    ],
    specialSkills: [
      "Ability to lay out and execute production schedules.",
      "Comfort leading a diverse workforce with strong time-management and organization skills.",
      "Effective cross-functional communicator with engineering, design, and other teams.",
      "Knowledge of Ontario employment legislation and regulations.",
    ],
    workingConditions: ["Full-time schedule, Monday through Friday."],
    education: ["Post-secondary education in a technical field (asset)."],
  },
  {
    title: "Electrical Engineer",
    company: "TDG Transit Design Group Inc",
    location: "Mississauga, Ontario, Canada",
    status: "Actively Hiring",
    posted: "2 weeks ago",
    applyUrl:
      "https://ca.linkedin.com/jobs/view/electrical-engineer-at-tdg-transit-design-group-inc-4331147820?trk=public_jobs_topcard-title",
    summary:
      "Design and validate intricate embedded hardware PCBs that power TDG’s global rail-lighting platforms, from schematic capture through EMI qualification.",
    overview:
      "TDG is a global leader in complete interior and exterior lighting systems for rail applications. Our Mississauga-based team has delivered LED innovations to transit agencies worldwide since 1989.",
    whyWork:
      "We’re looking for an organized engineer with 10–15 years of electronic design experience who thrives on hands-on PCB development and rigorous validation.",
    jobDescription: [
      "Design electronic circuits, validate concepts with simulation software, and capture schematics.",
      "Layout PCB assemblies and build prototype boards using milling/routing equipment for hardware verification.",
      "Analyze and troubleshoot analog circuits; write microcontroller software and manage EMI qualification tests.",
      "Maintain documentation across PCBs and software, including international travel to TDG/customer sites when required.",
    ],
    requirements: [
      "Industry experience in electronic design and engineering.",
      "Proficiency with CAD tools (Altium preferred) and SPICE simulation software.",
      "SMPS design expertise plus strong PCB layout techniques and microcontroller experience.",
      "Excellent communication skills for both technical and non-technical audiences.",
      "10–15 years of relevant experience.",
    ],
    desiredExperience: [
      "Proficiency with Altium Designer and SolidWorks.",
      "LED circuit design experience.",
      "Ethernet hardware experience and familiarity with Ethernet protocols.",
    ],
    education: [
      "University degree in Electronic Engineering or equivalent post-secondary education.",
      "Registered Professional Engineer (PEO) or eligible for registration.",
    ],
  },
  {
    title: "SMT Supervisor",
    company: "TDG Transit Design Group Inc",
    location: "Mississauga, Ontario, Canada",
    status: "Actively Hiring",
    posted: "2 weeks ago",
    applyUrl:
      "https://ca.linkedin.com/jobs/view/smt-supervisor-at-tdg-transit-design-group-inc-4319412180?trk=public_jobs_topcard-title",
    summary:
      "Oversee SMT production across setup, equipment maintenance, and operator coaching while ensuring assemblies meet IPC and J-STD workmanship standards.",
    overview:
      "TDG is a global leader in rail lighting systems, delivering LED innovations from our Mississauga headquarters since 1989. We are seeking an experienced SMT supervisor to manage program setup, equipment maintenance, and team performance.",
    whyWork:
      "This Monday-to-Friday role offers a competitive salary, stable schedule, and the opportunity to lead a dynamic, quality-focused team.",
    jobDescription: [
      "Supervise daily SMT production activities, including setup, operation, and maintenance of SMT lines and equipment.",
      "Ensure assemblies meet IPC-610 and J-STD-001 workmanship standards.",
      "Monitor schedules to hit output, quality, and delivery targets; train, mentor, and evaluate SMT operators and technicians.",
      "Partner with engineering and quality teams to resolve process or quality issues.",
      "Oversee equipment calibration, preventive maintenance, and troubleshooting, including forklift operations when necessary.",
      "Maintain production documentation, reports, and process records; drive process improvements to optimize efficiency and reduce defects.",
    ],
    requirements: [
      "Minimum 3–5 years of SMT manufacturing or electronics assembly experience.",
      "Supervisory or team-lead experience in a production environment.",
      "Certification and working knowledge of IPC-A-610 and J-STD-001 standards.",
      "Valid forklift license plus strong knowledge of SMT equipment (pick-and-place, reflow, AOI, stencil printers).",
      "Excellent leadership, communication, and problem-solving skills; ability to interpret technical drawings, BOMs, and work instructions.",
      "Proficiency in Microsoft Office.",
    ],
    education: ["Diploma in a relevant technical field."],
  },
];

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
        <p className="mb-4 text-base sm:text-lg md:text-[17px] leading-[33px]">
          At TDG, we recognize that the future of our industry depends on the
          knowledge, creativity, and passion of the next generation. We are
          committed to supporting the professional and personal development of
          students by providing opportunities to learn, grow, and gain practical
          experience.
        </p>
        <p className="mb-4 text-base sm:text-lg md:text-[17px] leading-[33px]">
          Through collaboration with educational institutions, internships,
          training initiatives, and mentoring programs, TDG actively invests in
          building pathways for young people to develop their skills and prepare
          for meaningful careers. Our goal is to empower students with not only
          technical expertise but also the confidence and vision to contribute
          to innovation and progress.
        </p>

        <p className="mb-4 text-base sm:text-lg md:text-[17px] leading-[33px]">
          We firmly believe that by supporting students today, we are shaping
          the leaders, innovators, and experts of tomorrow. This commitment
          reflects TDG’s values of responsibility, excellence, and long-term
          partnership with the communities in which we operate.
        </p>
      </div>

      {/* Vacancies */}
      <div className="mb-12 md:mb-16">
        <section>
          <h3 className="text-2xl font-bold uppercase text-[#000000]">
            Current Opportunities
          </h3>
          <JobAccordionList className="mt-6" />
        </section>
      </div>

      {/* Training Section */}
      <div className="mb-10 md:mb-12">
        {/* <ul className="mb-4 text-base sm:text-lg md:text-[20px] list-disc ml-6 md:ml-8 space-y-1">
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
        </ul> */}

        <ul className="mb-4 text-base sm:text-lg md:text-[17px] list-disc ml-6 md:ml-8 space-y-1">
          <li className="mb-5">
            Students / internship :
            <a
              href="mailto:careers@tdgdesign.com?subject=Internship%20and%20COOP%20Opportunities"
              className="bg-[#DBE2E7] ml-5 px-5 py-2 rounded-md font-semibold text-[18px] sm:text-[20px] inline-block hover:bg-gray-300 transition-colors duration-200 "
            >
              Send Email
            </a>
          </li>

          <li className="mb-4">
            Careers :
            <a
              href="mailto:careers@tdgdesign.com?subject=Career%20Opportunities"
              className="bg-[#DBE2E7] ml-5 px-5 py-2 rounded-md font-semibold text-[18px] sm:text-[20px] inline-block hover:bg-gray-300 transition-colors duration-200 "
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

const JobAccordionList = ({ className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(5);

  return (
    <div className={`space-y-4 ${className}`}>
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
        ? "bg-gradient-to-r from-[#E6F2FF] via-[#D0E7FF] to-[#E6F2FF] shadow-sm text-black border-l-4 border-[#0E54C4]"
        : "!bg-[#F5F5F5] !text-black hover:bg-[#E6F2FF]",
    [isOpen]
  );

  const structuredSections = [
    job.overview && {
      title: "Who we are",
      paragraphs: [job.overview],
    },
    job.whyWork && {
      title: "Why work for us",
      paragraphs: [job.whyWork],
    },
    job.jobDescription && {
      title: "Job Description",
      list: job.jobDescription,
    },
    job.requirements && {
      title: "Requirements & Experience",
      list: job.requirements,
    },
    job.specialSkills && {
      title: "Special Skill Requirements",
      list: job.specialSkills,
    },
    job.desiredExperience && {
      title: "Desired Experience",
      list: job.desiredExperience,
    },
    job.workingConditions && {
      title: "Working Conditions",
      list: job.workingConditions,
    },
    job.education && {
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
        borderRadius: "0px",
        "&::before": { display: "none" },
        overflow: "hidden",
        backgroundColor: "transparent",
        my: 5,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="text-black" />}
        className={`${
          isOpen ? "!border-l-4 !border-[#0E54C4]" : "border-b bg-[#F5F5F5]"
        } flex w-full flex-col gap-3 px-4 py-4 text-left transition-colors sm:flex-row sm:items-center sm:gap-6 ${gradientSummaryStyles}`}
      >
        <div className="flex items-center gap-3">
          <img
            src="/icons/logo.svg"
            alt="TDG logo"
            className="h-12 w-12 flex-shrink-0 object-contain"
          />
          <div>
            <h4 className="text-lg font-semibold text-[#000000]">
              {job.title}
            </h4>
            {/* <p className="text-sm font-semibold text-[#0F172A]">
              {job.company}
            </p>
            <p className="text-sm text-[#475569]">{job.location}</p> */}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start justify-center gap-2 text-sm font-semibold text-[#0E54C4] sm:items-end">
          <div className="flex items-center text-sm font-semibold text-[#0E54C4]">
            <BadgeCheck className="mr-2 h-4 w-4" />
            {job.status}
          </div>
          {/* <span className="text-xs font-semibold uppercase text-[#1BA301]">
            {job.posted}
          </span> */}
        </div>
      </AccordionSummary>
      <AccordionDetails className="bg-[#F5F5F5] px-4 pb-6 pt-2 text-[#0F172A]">
        {hasStructuredSections ? (
          <div className="space-y-6">
            {structuredSections.map((section) => (
              <DetailSection key={section.title} section={section} />
            ))}
          </div>
        ) : (
          <>
            {job.summary && (
              <p className="mb-4 text-sm leading-relaxed">{job.summary}</p>
            )}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <>
                <h5 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#0E54C4]">
                  Key Responsibilities
                </h5>
                <ul className="list-disc pl-5 text-sm leading-relaxed text-[#1f2937]">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {job.applyUrl ? (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0A66C2] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#084c93]"
            >
              Apply with LinkedIn
            </a>
          ) : (
            <p className="text-xs text-[#475569]">
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
    <h5 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#0E54C4]">
      {title}
    </h5>
    {paragraphs &&
      paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="mb-3 text-sm leading-relaxed text-[#1f2937]"
        >
          {paragraph}
        </p>
      ))}
    {list && (
      <ul className="list-disc pl-5 text-sm leading-relaxed text-[#1f2937]">
        {list.map((item) => (
          <li key={item} className="mb-1">
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
);
