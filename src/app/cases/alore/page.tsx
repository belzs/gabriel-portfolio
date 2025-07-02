"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IconTools } from "@tabler/icons-react";
import { FaRegSquareFull } from "react-icons/fa6";
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

// Custom Timeline component with modified structure for Alore
const AloreTimeline = ({ data }: { data: any[] }) => {
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
      className="w-full bg-gray-50 dark:bg-neutral-950 font-sans"
      ref={containerRef}
    >
      <div className="max-w-[900px] mx-auto pt-20 pb-4 px-4">
        <div className="">
          <div 
            ref={heroSection.ref}
            className={`group w-full max-h-[300px] h-full bg-white shadow-md mt-16 transition-all duration-1000 overflow-hidden transform ${
              heroSection.inView 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="flex h-full max-h-[300px]">
              {/* Left side - Text content (1/3 width) */}
              <div className={`w-1/3 flex flex-col justify-center gap-6 items-start p-8 bg-white relative transition-all duration-1200 delay-200 ${
                heroSection.inView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray" />
                  <span className="text-sm text-gray-600 uppercase  tracking-wider font-light">
                    {t('aloreCaseNumber', language)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="text-5xl font-extrabold text-strong-gray font-kanit">
                    {t('aloreTitle', language)}
                  </h2>
                </div>
              </div>
              
              {/* Right side - Image (2/3 width) */}
              <div className={`w-2/3 h-full transition-all duration-1200 delay-400 ${
                heroSection.inView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4'
              }`}>
                <img 
                  src="/cases/alore/aloreFullCase.png"
                  alt="ALORE case study"
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
              className="flex justify-start pt-10 md:pt-20 md:gap-22"
            >
              <div className={`sticky flex flex-col md:flex-row z-40 items-start top-40 self-start max-w-xs lg:max-w-[430px] md:w-full transition-all duration-1000 ${
                timelineSection.inView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}>
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 bg-strong-gray dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 p-2" />
                </div>
                <div className="md:pl-20">
                  <h3 className="text-xl md:text-4xl font-kanit font-extrabold text-strong-gray uppercase mb-6">
                    {item.title}
                  </h3>
                  {/* Process Steps Divs */}
                  <div className="grid grid-cols-3 gap-5 mt-10">
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
                        <IconTools strokeWidth={1} className="w-5 h-5 text-gray-600" />
                        <span className="text-[11px] text-gray-600 font-light max-w-[50px]">
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div 
                ref={timelineSection.ref}
                className={`flex max-w-[870px] w-full justify-center ${item.title === "PRODUCT" ? "bg-strong-gray" : "bg-white"} pb-12 transition-all duration-1000 delay-300 ${
                  timelineSection.inView 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="max-w-[750px] w-full px-6">
                  <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                    {item.title}
                  </h3>
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
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
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

const AloreTimelineComponent = () => {
  const { language } = useLanguage();
  
  const data = [
    {
      title: t('aloreDiscoveryTitle', language),
      processSteps: [
        { title: t('aloreDeskResearch', language) },
        { title: t('aloreCompetitorAnalysis', language) },
        { title: t('alorePersonas', language) },
        { title: t('aloreCompetitiveLandscape', language) },
        { title: t('aloreSemanticPanel', language) }
      ],
      content: (
        <div className="prose max-w-none">
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" />
              {t('aloreMarketNeedTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreMarketNeedText1', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreMarketNeedText2', language)}
          </p>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('aloreCompetitiveAnalysisTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreCompetitiveAnalysisText', language)}
          </p>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/alore/competitionAnalysis.png" 
              alt="Competition Analysis" 
              className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('aloreEngagementPatternsTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreEngagementPatternsText1', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreEngagementPatternsText2', language)}
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="text-gray-700 text-base leading-relaxed space-y-2">
              <li>{t('aloreEngagementPoint1', language)}</li>
              <li>{t('aloreEngagementPoint2', language)}</li>
              <li>{t('aloreEngagementPoint3', language)}</li>
              <li>{t('aloreEngagementPoint4', language)}</li>
              <li>{t('aloreEngagementPoint5', language)}</li>
            </ul>
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('aloreVisualPositioningTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreVisualPositioningText1', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreVisualPositioningText2', language)}
          </p>
          
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <img 
                src="/cases/alore/competitiveLandscape.png" 
                alt="Competitive Landscape" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/alore/semanticPanel.png" 
                alt="Semantic Panel" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t('aloreIdeationTitle', language),
      processSteps: [
        { title: t('aloreCsdMatrix', language) },
        { title: t('aloreSitemap', language) },
        { title: t('aloreUserFlow', language) },
        { title: t('alorePrototyping', language) },
        { title: t('aloreUserTesting', language) },
        { title: t('aloreHandOver', language) }
      ],
      content: (
        <div className="prose max-w-none">
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('aloreCsdMatrixTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreCsdMatrixText', language)}
          </p>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/alore/csdMatrix.png" 
              alt="CSD Matrix" 
              className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('aloreFlowMappingTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreFlowMappingText', language)}
          </p>
          
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <img 
                src="/cases/alore/siteMap.png" 
                alt="Site Map" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/alore/userFlows.png" 
                alt="User Flows" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('alorePrototypingValidationTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('alorePrototypingValidationText1', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('alorePrototypingValidationText2', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('alorePrototypingValidationText3', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('alorePrototypingValidationText4', language)}
          </p>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('aloreApiDocumentationTitle', language)}
          </h3>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/alore/apiGuide.png" 
              alt="API Guide" 
              className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('aloreApiDocumentationText1', language)}
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="text-gray-700 text-base leading-relaxed space-y-2">
              <li>{t('aloreApiFeature1', language)}</li>
              <li>{t('aloreApiFeature2', language)}</li>
              <li>{t('aloreApiFeature3', language)}</li>
            </ul>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {t('aloreApiDocumentationText2', language)}
          </p>
        </div>
      ),
    },
    {
      title: t('aloreProductTitle', language),
      processSteps: [],
      content: (
        <div className="space-y-6">
          <div className="w-full">
            <img 
              src="/cases/alore/alorePrimaryMockup.png" 
              alt="Alore Primary Mockup" 
              className="w-full"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <img 
                src="/cases/alore/aloreMockup1.png" 
                alt="Alore Mockup 1" 
                className="w-full"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/alore/aloreMockup2.png" 
                alt="Alore Mockup 2" 
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <img 
                src="/cases/alore/aloreMockup3.png" 
                alt="Alore Mockup 3" 
                className="w-full"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/alore/aloreMockup4.png" 
                alt="Alore Mockup 4" 
                className="w-full"
              />
            </div>
          </div>
          
          <div className="w-full">
            <img 
              src="/cases/alore/aloreLP.png" 
              alt="Alore Landing Page" 
              className="w-full"
            />
          </div>
        </div>
      ),
    },
  ];

  return <AloreTimeline data={data} />;
};

export default function AlorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AloreTimelineComponent />
      <Footer />
    </div>
  );
} 