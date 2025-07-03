"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IconTools } from "@tabler/icons-react";
import { FaRegSquareFull } from "react-icons/fa6";
import { TbExternalLink } from "react-icons/tb";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

// Custom hook for intersection observer
const useInView = (options?: IntersectionObserverInit) => {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

// Custom Timeline component with modified structure for Netz
const NetzTimeline = ({ data }: { data: any[] }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const { language } = useLanguage();
  const heroSection = useInView();

  React.useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = require("motion/react").useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const { useTransform, motion } = require("motion/react");
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div className="max-w-[900px] mx-auto pt-8 md:pt-20 pb-4 px-4">
        <div className="">
          <div 
            ref={heroSection.ref}
            className={`group w-full bg-white shadow-md mt-8 md:mt-16 transition-all duration-1000 overflow-hidden transform ${
              heroSection.inView 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="flex flex-col md:flex-row h-full min-h-[250px] md:max-h-[300px]">
              {/* Left side - Text content */}
              <div className={`w-full md:w-1/3 flex flex-col justify-center gap-4 md:gap-6 items-start p-6 md:p-8 bg-white relative transition-all duration-1200 delay-200 ${
                heroSection.inView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray" />
                  <span className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-light">
                    {t('netzCaseNumber', language)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-strong-gray font-kanit">
                    {t('netzTitle', language)}
                  </h2>
                </div>
              </div>
              
              {/* Right side - Image */}
              <div className={`w-full md:w-2/3 h-48 md:h-full transition-all duration-1200 delay-400 ${
                heroSection.inView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4'
              }`}>
                <img 
                  src="/cases/netz/netzCaseFull.png"
                  alt="NETZ case study"
                  className="w-full h-full object-cover filter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative w-full pb-20">
        {data.map((item, index) => {
          const timelineSection = useInView();
          
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-start pt-8 md:pt-20 gap-6 md:gap-22 overflow-x-clip px-4 md:px-0"
            >
              <div className={`w-full md:sticky md:flex md:flex-col lg:flex-row z-40 items-start md:top-40 self-start max-w-full md:max-w-xs lg:max-w-[430px] md:w-full transition-all duration-1000 ${
                timelineSection.inView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}>
                <div className="h-10 absolute -left-5 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 bg-strong-gray dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 p-2" />
                </div>
                <div className="pl-8 md:pl-20">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-kanit font-extrabold text-strong-gray uppercase mb-4 md:mb-6">
                    {item.title}
                  </h3>
                  {/* Process Steps Divs */}
                  {item.processSteps?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-6 md:mt-10">
                      {item.processSteps?.map((step: any, stepIndex: number) => (
                        <div 
                          key={stepIndex}
                          className={`flex flex-col items-start gap-2 p-3 border border-gray-200 text-start transition-all duration-700 ${
                            timelineSection.inView 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-4'
                          }`}
                          style={{ transitionDelay: `${(stepIndex + 1) * 100}ms` }}
                        >
                          <IconTools strokeWidth={1} className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                          <span className="text-[10px] md:text-[11px] text-gray-600 font-light max-w-[60px] md:max-w-[50px]">
                            {step.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div 
                ref={timelineSection.ref}
                className={`flex w-full max-w-full md:max-w-[870px] justify-center ${item.title === t('netzProductTitle', language) ? "bg-strong-gray" : "bg-white"} pb-8 md:pb-12 transition-all duration-1000 delay-300 ${
                  timelineSection.inView 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="max-w-full md:max-w-[750px] w-full px-4 md:px-6">
                  <div className={`transition-all duration-800 delay-500 ${
                    timelineSection.inView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}>
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-4 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-gray-200 via-strong-gray to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const NetzTimelineComponent = () => {
  const { language } = useLanguage();
  
  const data = [
    {
      title: t('netzDiscoveryTitle', language),
      processSteps: [
        { title: t('netzDeskResearch', language) },
        { title: t('netzCompetitorAnalysis', language) },
        { title: t('netzPersonas', language) },
        { title: t('netzCompetitiveLandscape', language) },
        { title: t('netzSwotMatrix', language) },
        { title: t('netzTouchpoints', language) },
        { title: t('netzUserInterviews', language) }
      ],
      content: (
        <div className="prose max-w-none">
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" />
              {t('netzIntimateProbleSectionTitle', language)}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            {t('netzIntimateProbleSectionText', language)}
          </p>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/netz/competitorAnalysis.png" 
              alt="Competitor Analysis" 
              className="w-full border-[8px] md:border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzOpportunitiesTitle', language)}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            {t('netzOpportunitiesText', language)}
          </p>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/netz/touchPointsAndPersonas.png" 
              alt="Touchpoints and Personas" 
              className="w-full border-[8px] md:border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzWhereFocusTitle', language)}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            {t('netzWhereFocusText', language)}
          </p>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/netz/matrixSwot.png" 
              alt="SWOT Matrix" 
              className="w-full border-[8px] md:border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzInterviewingExpertsTitle', language)}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            {t('netzInterviewingExpertsText', language)}
          </p>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzStudyResultsTitle', language)}
          </h3>
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
            <ul className="text-gray-700 text-sm md:text-base leading-relaxed space-y-2">
              <li>{t('netzStudyResult1', language)}</li>
              <li>{t('netzStudyResult2', language)}</li>
              <li>{t('netzStudyResult3', language)}</li>
              <li>{t('netzStudyResult4', language)}</li>
              <li>{t('netzStudyResult5', language)}</li>
              <li>{t('netzStudyResult6', language)}</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: t('netzIdeationTitle', language),
      processSteps: [
        { title: t('netzMoodboard', language) },
        { title: t('netzUserFlow', language) },
        { title: t('netzWireframes', language) },
        { title: t('netzPrototyping', language) },
        { title: t('netzUserTesting', language) },
        { title: t('netzHandOver', language) }
      ],
      content: (
        <div className="prose max-w-none">
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzMappingPathsTitle', language)}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            {t('netzMappingPathsText', language)}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <img 
                src="/cases/netz/moodboard.png" 
                alt="Moodboard" 
                className="w-full border-[8px] md:border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="/cases/netz/userFlow.png" 
                alt="User Flow" 
                className="w-full border-[8px] md:border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzWireframesTitle', language)}
          </h3>
          <div className="w-full mb-6">
            <img 
              src="/cases/netz/wireframes.png" 
              alt="Wireframes" 
              className="w-full border-[8px] md:border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {t('netzWireframesText', language)}
          </p>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzValidatingSolutionTitle', language)}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {t('netzValidatingSolutionText', language)}
          </p>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-8 md:mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('netzPlatformForPlayersTitle', language)}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {t('netzPlatformForPlayersText', language)}
          </p>
        </div>
      ),
    },
    {
      title: t('netzProductTitle', language),
      processSteps: [],
      content: (
        <div className="space-y-6">
          <div className="w-full">
            <img 
              src="/cases/netz/netzPrimaryMockup.png" 
              alt="Netz Primary Mockup" 
              className="w-full"
            />
          </div>
          
          <div className="w-full">
            <img 
              src="/cases/netz/netzMultipleMockup.png" 
              alt="Netz Multiple Mockup" 
              className="w-full"
            />
          </div>
        </div>
      ),
    },
  ];

  return <NetzTimeline data={data} />;
};

export default function NetzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <NetzTimelineComponent />
      <Footer />
    </div>
  );
} 