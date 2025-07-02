"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { TbPuzzle, TbSearch, TbBulb, TbLayout, TbCode, TbArrowRight, TbExternalLink } from "react-icons/tb"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/translations"

export function WorkSection() {
  const { language } = useLanguage()
  const router = useRouter()
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const companyTitleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute('data-animate-id')
          if (elementId) {
            setVisibleElements(prev => new Set(prev).add(elementId))
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const elementsToObserve = [
      { ref: titleRef, id: 'title' },
      { ref: subtitleRef, id: 'subtitle' },
      { ref: companyTitleRef, id: 'company' },
      { ref: gridRef, id: 'grid' },
    ]

    elementsToObserve.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-animate-id', id)
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  const getAnimationClass = (elementId: string, delay: number = 0, direction: 'up' | 'left' | 'right' = 'up') => {
    const isVisible = visibleElements.has(elementId)
    const baseClasses = "transition-all duration-1000 ease-out"
    const delayClass = delay > 0 ? `delay-${delay}` : ''
    
    let transform = 'translate-y-8'
    if (direction === 'left') transform = '-translate-x-8'
    if (direction === 'right') transform = 'translate-x-8'
    
    return `${baseClasses} ${delayClass} ${
      isVisible 
        ? 'opacity-100 translate-y-0 translate-x-0' 
        : `opacity-0 ${transform}`
    }`
  }

  const processSteps = [
    { icon: TbPuzzle, textKey: "processProduct" },
    { icon: TbSearch, textKey: "processResearch" },
    { icon: TbBulb, textKey: "processIdeation" },
    { icon: TbLayout, textKey: "processPrototyping" },
    { icon: TbCode, textKey: "processFrontEnd" }
  ]

  return (
    <section className="w-full py-24">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Title and Workflow Image */}
        <div 
          ref={titleRef}
          className={`flex items-center justify-between gap-8 mb-16 ${getAnimationClass('title')}`}
        >
          <div className="flex-1">
            <h2 className="text-6xl uppercase font-extrabold font-kanit leading-snug text-strong-gray">
              {t('workTitle1', language)}
              <br />
              <span className="text-[#515151]">{t('workTitle2', language)}</span>
            </h2>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="/workflow.png" 
              alt="Workflow" 
              className="max-w-[400px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Large spacing */}
        <div className="mb-40"></div>

        {/* Subtitle */}
       

        {/* Company Title and Process Steps */}
        <div 
          ref={companyTitleRef}
          className={`flex items-center justify-between gap-8 mb-18 ${getAnimationClass('company', 400)}`}
        >
          <div className="flex-1">
          <div 
          ref={subtitleRef}
          className={`mb-4 ${getAnimationClass('subtitle', 200)}`}
        >
          <p className="text-sm text-gray-600 uppercase tracking-[0.3em] font-light">
            {t('multiProductStartup', language)}
          </p>
        </div>
            <h3 className="text-4xl font-extrabold text-strong-gray font-kanit">
              0XCARBON
            </h3>
          </div>
          <div className="flex gap-4">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div 
                  key={index}
                  className="flex flex-col  gap-2 p-3 border border-gray-300  min-w-[80px]"
                >
                  <IconComponent strokeWidth={1} className="w-7 h-7 text-gray-600" />
                  <span className="text-xs text-gray-600 text-center font-light">
                    {t(step.textKey as keyof typeof import("@/lib/translations").translations, language)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Images Grid */}
        <div 
          ref={gridRef}
          className={`space-y-6 ${getAnimationClass('grid', 600)}`}
        >
          {/* First row - Half image, half text */}
          <div className="grid grid-cols-2 gap-6">
            <div 
              className="border-[19px] w-full h-full border-white shadow-sm hover:shadow-2xl transition-all  hover:cursor-pointer duration-500 overflow-hidden group relative"
              onClick={() => window.open('/cases/zeca', '_blank')}
            >
              {/* Background image */}
              <img 
                src="/zecaCardBackground.png" 
                alt="Project background" 
                className="w-full max-h-[320px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Logo in the middle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/zecaLogo.png" 
                  alt="Zeca Logo" 
                  className="w-38 h-32 object-contain filter grayscale group-hover:grayscale-0 -translate-y-10 group-hover:-translate-y-28 transition-all duration-500 z-10"
                />
              </div>
              
              {/* Phone mockup at the bottom */}
              <div className="absolute  bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4/4 group-hover:translate-y-15/20 transition-all duration-500">
                <img 
                  src="/zecaMockup.png" 
                  alt="Zeca Mobile App" 
                  className="h-80 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-180"
                />
              </div>

              {/* External link icon at top-right corner */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <TbExternalLink className="w-6 h-6 text-gray-400 drop-shadow-lg" />
              </div>
            </div>
            <div className="flex flex-col justify-center px-4">
              <h4 className="text-xl font-bold text-strong-gray mb-4">
                {t('productsDescription', language)}
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify mb-6">
                {t('workDescription', language)}
              </p>
              
              <Button 
                variant="outline" 
                size={"lg"} 
                className="w-full justify-start !py-6 bg-transparent border-gray-300 rounded-none hover:cursor-pointer"
                onClick={() => router.push('/cases')}
              >
                {t('checkDesignProcess', language)}
                <TbArrowRight className="w-4 h-4" />    
              </Button>
            </div>
          </div>

          {/* Second row - Two half images */}
          <div className="grid grid-cols-2 gap-6">
            <div 
              className="border-[19px] border-white shadow-sm hover:shadow-2xl transition-all hover:cursor-pointer duration-500 overflow-hidden group relative"
              onClick={() => window.open('/cases/alore', '_blank')}
            >
              {/* Background image */}
              <img 
                src="/aloreCardBackground.png" 
                alt="Problem solution" 
                className="w-full max-h-[320px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Logo in the middle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/aloreLogo.png" 
                  alt="Alore Logo" 
                  className="w-42 h-42 object-contain filter grayscale group-hover:grayscale-0 -translate-y-10 group-hover:-translate-y-30 transition-all duration-500 z-10"
                />
              </div>
              
              {/* Phone mockup at the bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2/4 group-hover:translate-y-2/10 transition-all duration-500">
                <img 
                  src="/aloreMockup.png" 
                  alt="Alore Mobile App" 
                  className="h-80 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-160"
                />
              </div>

              {/* External link icon at top-right corner */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <TbExternalLink className="w-6 h-6 text-gray-400 drop-shadow-lg" />
              </div>
            </div>
            <div 
              className="border-[19px] border-white shadow-sm hover:shadow-2xl transition-all hover:cursor-pointer duration-500 overflow-hidden group relative"
              onClick={() => window.open('/cases/netz', '_blank')}
            >
              {/* Background image */}
              <img 
                src="/netzCardBackground.png" 
                alt="Window design" 
                className="w-full max-h-[320px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Logo in the middle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/netzLogo.png" 
                  alt="Netz Logo" 
                  className="w-26 h-26 object-contain filter grayscale group-hover:grayscale-0 -translate-y-10 group-hover:-translate-y-30 transition-all duration-500 z-10"
                />
              </div>
              
              {/* Phone mockup at the bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2/4 group-hover:translate-y-2/10 transition-all duration-500">
                <img 
                  src="/netzMockup.png" 
                  alt="Netz Mobile App" 
                  className="h-80 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-160"
                />
              </div>

              {/* External link icon at top-right corner */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <TbExternalLink className="w-6 h-6 text-gray-400 drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Third row - Full width image */}
            <div 
              className="border-[19px] border-white shadow-sm hover:shadow-2xl transition-all hover:cursor-pointer duration-500 overflow-hidden group relative"
              onClick={() => window.open('/cases/joori', '_blank')}
            >
            {/* Background image */}
            <img 
              src="/jooriCardBackground.png" 
              alt="Joori background" 
              className="w-full  h-full max-h-[300px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            
            {/* Logo in the middle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/jooriLogo.png" 
                alt="Joori Logo" 
                className="w-36 h-36 object-contain filter grayscale group-hover:grayscale-0 -translate-y-5 group-hover:-translate-y-20 transition-all duration-500 z-10"
              />
            </div>
            
            {/* Phone mockup at the bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-9/10 group-hover:translate-y-7/10 transition-all duration-500">
              <img 
                src="/jooriMockup.png" 
                alt="Joori Mobile App" 
                className="h-80 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-160"
              />
            </div>

            {/* External link icon at top-right corner */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <TbExternalLink className="w-6 h-6 text-gray-400 drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 