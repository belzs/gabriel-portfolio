"use client"

import { FaRegSquareFull } from "react-icons/fa6";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";
import { useEffect, useRef, useState } from "react";

export function ExperienceSection() {
  const { language } = useLanguage();
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const titleRef = useRef<HTMLDivElement>(null);
  const careerSection1Ref = useRef<HTMLDivElement>(null);
  const careerSection2Ref = useRef<HTMLDivElement>(null);
  const careerSection3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute('data-animate-id');
          if (elementId) {
            setVisibleElements(prev => new Set(prev).add(elementId));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all animated elements
    const elementsToObserve = [
      { ref: titleRef, id: 'title' },
      { ref: careerSection1Ref, id: 'career1' },
      { ref: careerSection2Ref, id: 'career2' },
      { ref: careerSection3Ref, id: 'career3' },
    ];

    elementsToObserve.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-animate-id', id);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (elementId: string, delay: number = 0) => {
    const isVisible = visibleElements.has(elementId);
    const baseClasses = "transition-all duration-1000 ease-out";
    const delayClass = delay > 0 ? `delay-${delay}` : '';
    
    return `${baseClasses} ${delayClass} ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`;
  };

  const getTimelineClass = (elementId: string, delay: number = 300) => {
    const isVisible = visibleElements.has(elementId);
    return `transition-all duration-1000 ease-out delay-${delay} transform origin-top ${
      isVisible ? 'scale-y-100' : 'scale-y-0'
    }`;
  };

  const getContentClass = (elementId: string, delay: number = 500) => {
    const isVisible = visibleElements.has(elementId);
    return `transition-all duration-700 ease-out delay-${delay} ${
      isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-4'
    }`;
  };

  return (
    <section className="w-full py-36 bg-white">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Title and Image Row */}
        <div 
          ref={titleRef}
          className={`flex flex-col lg:flex-row items-start lg:justify-between gap-6 lg:gap-8 mb-12 md:mb-16 ${getAnimationClass('title')}`}
        >
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-6xl uppercase font-bold font-kanit leading-snug">
              <span className="text-strong-gray">{t('experienceTitle1', language)}</span>
              <br />
              <span className="text-strong-gray">& </span>
              <span className="text-[#696969]">{t('experienceTitle2', language)}</span>
            </h2>
          </div>
          <div className="flex-shrink-0">
            <div className="">
              <p className="text-sm leading-relaxed text-gray-500 sm:max-w-64 text-justify italic font-light">
                {t('personalHobbies', language)}
              </p>
            </div>
          </div>
        </div>

        {/* Career Journey */}
        <div className="space-y-12">
          {/* Início da carreira */}
          <div 
            ref={careerSection1Ref}
            className={`relative ${getAnimationClass('career1', 200)}`}
          >
            <h3 className="uppercase font-bold text-strong-gray mb-4 pl-2 flex items-center gap-2">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> {t('careerBeginning', language)}
            </h3>
            {/* Timeline line */}
            <div className="pl-3 flex gap-6 flex-row">
              <div className={`w-[2px] min-h-full my-2 bg-gray-200 ${getTimelineClass('career1', 300)}`}></div>
              <div className="flex flex-col gap-4 my-1">
                <p 
                  className={`text-gray-600 leading-relaxed max-w-4xl font-light ${getContentClass('career1', 500)}`}
                  dangerouslySetInnerHTML={{ __html: t('careerBeginningParagraph1', language) }}
                />
                <p 
                  className={`text-gray-600 leading-relaxed max-w-4xl mt-4 font-light ${getContentClass('career1', 700)}`}
                  dangerouslySetInnerHTML={{ __html: t('careerBeginningParagraph2', language) }}
                />
              </div>
            </div>
          </div>

          {/* Crescimento e novos horizontes */}
          <div 
            ref={careerSection2Ref}
            className={`relative ${getAnimationClass('career2', 400)}`}
          >
            <h3 className="uppercase font-bold text-strong-gray mb-4 pl-2 flex items-center gap-2">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> {t('growthTitle', language)}
            </h3>
            {/* Timeline line */}
            <div className="pl-3 flex gap-6 flex-row">
              <div className={`w-[1px] min-h-full bg-gray-200 my-2 ${getTimelineClass('career2', 500)}`}></div>
              <p 
                className={`text-gray-600 leading-relaxed max-w-4xl my-1 font-light ${getContentClass('career2', 700)}`}
                dangerouslySetInnerHTML={{ __html: t('growthParagraph', language) }}
              />
            </div>
          </div>    

          {/* Hoje */}
          <div 
            ref={careerSection3Ref}
            className={`relative ${getAnimationClass('career3', 600)}`}
          >
            <h3 className="uppercase font-bold text-strong-gray mb-4 pl-2 flex items-center gap-2">
              <FaRegSquareFull className="text-xs text-gray-600 bg-strong-gray mr-1 mt-0.5" /> {t('currentChallengeTitle', language)}
            </h3>
            <div className="pl-3 flex gap-6 flex-row">
              <div className={`w-[1px] min-h-full bg-gray-200 my-2 ${getTimelineClass('career3', 700)}`}></div>
              <div className="flex flex-col gap-4 my-1">
                <p 
                  className={`text-gray-700 leading-relaxed max-w-4xl font-light ${getContentClass('career3', 900)}`}
                  dangerouslySetInnerHTML={{ __html: t('currentChallengeParagraph', language) }}
                />
                <div className="pt-4">
                  <p 
                    className={`text-gray-700 leading-relaxed max-w-4xl italic font-light ${getContentClass('career3', 1100)}`}
                    dangerouslySetInnerHTML={{ __html: t('finalReflection', language) }}
                  />    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-timeline {
          animation: timeline-grow 1s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.7s ease-out forwards;
        }
        
        @keyframes timeline-grow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        [data-animate-id="career1"] .animate-timeline {
          animation-delay: 0.3s;
        }
        
        [data-animate-id="career1"] .animate-fade-in-right:nth-of-type(1) {
          animation-delay: 0.5s;
        }
        
        [data-animate-id="career1"] .animate-fade-in-right:nth-of-type(2) {
          animation-delay: 0.7s;
        }
        
        [data-animate-id="career2"] .animate-timeline {
          animation-delay: 0.5s;
        }
        
        [data-animate-id="career2"] .animate-fade-in-right {
          animation-delay: 0.7s;
        }
        
        [data-animate-id="career3"] .animate-timeline {
          animation-delay: 0.7s;
        }
        
        [data-animate-id="career3"] .animate-fade-in-right:nth-of-type(1) {
          animation-delay: 0.9s;
        }
        
        [data-animate-id="career3"] .animate-fade-in-right:nth-of-type(2) {
          animation-delay: 1.1s;
        }
      `}</style>
    </section>
  )
} 