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

// Custom Timeline component with modified structure for Zeca
const ZecaTimeline = ({ data }: { data: any[] }) => {
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
      <div className="max-w-[900px] mx-auto pt-8 md:pt-20 pb-4 px-4 overflow-x-hidden">
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
                    {t('zecaCaseNumber', language)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-strong-gray font-kanit">
                    {t('zecaTitle', language)}
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
                  src="/cases/zeca/zecaCaseFull.png"
                  alt="ZECA case study"
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
                className={`flex w-full max-w-full md:max-w-[870px] justify-center ${item.title === t('zecaProductTitle', language) ? "bg-strong-gray" : "bg-white"} pb-8 md:pb-12 transition-all duration-1000 delay-300 overflow-x-hidden ${
                  timelineSection.inView 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="max-w-full md:max-w-[750px] w-full px-4 md:px-6 overflow-x-hidden">
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

const ZecaTimelineComponent = () => {
  const { language } = useLanguage();
  
  const data = [
    {
      title: t('zecaDiscoveryTitle', language),
      processSteps: [
        { title: t('zecaDeskResearch', language) },
        { title: t('zecaCsdMatrix', language) },
        { title: t('zecaStorytelling', language) },
        { title: t('zecaPersonas', language) },
        { title: t('zecaUserInterviews', language) },
      ],
      content: (
        <div className="prose max-w-none">
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" />
              {t('zecaContextTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaContextText1', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaContextText2', language)}
          </p>
          
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <img 
                src="/cases/zeca/persona.png" 
                alt="Persona" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/zeca/affinityDiagram.png" 
                alt="Affinity Diagram" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <img 
                src="/cases/zeca/benchmark.png" 
                alt="Benchmark" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/zeca/csdMatrix.png" 
                alt="CSD Matrix" 
                className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('zecaInterviewsTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaInterviewsText1', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaInterviewsText2', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6 font-semibold">
            {t('zecaInterviewsText3', language)}
          </p>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('zecaBigInsightTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaBigInsightText1', language)}
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaBigInsightText2', language)}
          </p>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/zeca/affinityDiagram2.png" 
              alt="Affinity Diagram 2" 
              className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('zecaBigChallengeTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaBigChallengeText1', language)}
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="text-gray-700 text-base leading-relaxed space-y-2">
              <li>{t('zecaActionsList1', language)}</li>
              <li>{t('zecaActionsList2', language)}</li>
              <li>{t('zecaActionsList3', language)}</li>
              <li>{t('zecaActionsList4', language)}</li>
              <li>{t('zecaActionsList5', language)}</li>
            </ul>
          </div>
          
          
        </div>
      ),
    },
    {
      title: t('zecaIdeationTitle', language),
      processSteps: [
        { title: t('zecaPrototyping', language) },
        { title: t('zecaUserTesting', language) },
        { title: t('zecaMindMap', language) },
        { title: t('zecaUserflows', language) },
        { title: t('zecaHandOver', language) }
      ],
      content: (
        <div className="prose max-w-none">
         
         <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('zecaOrganizationTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaOrganizationText', language)}
          </p>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/zeca/mindMap.png" 
              alt="Mind Map" 
              className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          
          <div className="w-full mb-6">
            <img 
              src="/cases/zeca/userFlow.png" 
              alt="User Flow" 
              className="w-full border-[12px] border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('zecaEvolutionTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {t('zecaEvolutionText', language)}
          </p>
          
          <h3 className="uppercase font-semibold text-strong-gray font-kanit mb-4 flex items-center gap-2 mt-12">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> 
              {t('zecaEcosystemTitle', language)}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            {t('zecaEcosystemText', language)}
          </p>
        </div>
      ),
    },
    {
      title: t('zecaProductTitle', language),
      processSteps: [],
      content: (
        <div className="space-y-6">
          <div className="w-[95%] mt-12">
            <img 
              src="/cases/zeca/zecaPrimaryMockup.png" 
              alt="Zeca Primary Mockup" 
              className="w-full"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <img 
                src="/cases/zeca/zecaMockup1.png" 
                alt="Zeca Mockup 1" 
                className="w-full"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/zeca/zecaMockup2.png" 
                alt="Zeca Mockup 2" 
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <img 
                src="/cases/zeca/zecaMockup3.png" 
                alt="Zeca Mockup 3" 
                className="w-full"
              />
            </div>
            <div className="w-1/2">
              <img 
                src="/cases/zeca/zecaMockup4.png" 
                alt="Zeca Mockup 4" 
                className="w-full"
              />
            </div>
          </div>
          
          <div className="w-full">
            <img 
              src="/cases/zeca/zecaLp.png" 
              alt="Zeca Landing Page" 
              className="w-full"
            />
          </div>
        </div>
      ),
    },
  ];

  return <ZecaTimeline data={data} />;
};

export default function ZecaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ZecaTimelineComponent />
      <Footer />
    </div>
  );
} 