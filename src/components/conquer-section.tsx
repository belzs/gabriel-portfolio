"use client"

import { useEffect, useRef, useState } from "react"
import { TbPuzzle, TbSearch, TbBulb, TbLayout } from "react-icons/tb"

export function ConquerSection() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [isHovered, setIsHovered] = useState(false)
  
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const companyTitleRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

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
      { ref: mockupRef, id: 'mockup' },
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
    { icon: TbPuzzle, text: "Product" },
    { icon: TbSearch, text: "Research" },
    { icon: TbBulb, text: "Ideation" },
    { icon: TbLayout, text: "Prototyping" }
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="max-w-[900px] mx-auto px-4 md:px-6">
        
        {/* Company Title and Process Steps - Responsive Layout */}
        <div 
          ref={companyTitleRef}
          className={`flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 mb-16 md:mb-28 ${getAnimationClass('company', 400)}`}
        >
          {/* Title and Subtitle - Mobile First */}
          <div className="flex-1 text-left md:text-right md:order-2">
            <div 
              ref={subtitleRef}
              className={`mb-3 md:mb-4 ${getAnimationClass('subtitle', 200)}`}
            >
              <p className="text-xs md:text-sm text-gray-600 uppercase tracking-[0.2em] md:tracking-[0.3em] font-light">
                SOFT SKILLS TRAINING STARTUP
              </p>
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-strong-gray font-kanit">
              CONQUER
            </h3>
          </div>

          {/* Process Steps - Mobile: Below title, Desktop: Left side */}
          <div className="flex justify-start md:justify-start gap-2 md:gap-4 md:order-1">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div 
                  key={index}
                  className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 border border-gray-200 min-w-[60px] md:min-w-[80px]"
                >
                  <IconComponent strokeWidth={1} className="w-5 h-5 md:w-7 md:h-7 text-gray-600 mx-auto" />
                  <span className="text-[10px] md:text-xs text-gray-600 text-center font-light">
                    {step.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Full Width Mockup Container */}
        <div className="relative">
          {/* Mobile Mockup positioned outside overflow container - Hidden on mobile */}
          <div 
            className="hidden lg:block absolute top-0 right-0 h-full flex items-center z-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src="/conquerMobileMockup.png"  
              alt="Conquer Mobile Mockup" 
              className={`h-auto max-h-[400px] lg:max-h-[500px] object-contain transition-all duration-500  ${
                isHovered ? '' : 'filter grayscale'
              }`}
            />
          </div>
          
          <div 
            ref={mockupRef}
            className={`border-[8px] md:border-[19px] border-white relative shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 overflow-hidden group max-h-[300px] md:max-h-[450px] ${getAnimationClass('mockup', 600)}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Fixed Navbar at Top */}
            <div className="relative z-10">
              <img 
                src="/conquerNavbar.png" 
                alt="Conquer Navigation" 
                className={`w-full object-cover transition-all duration-500 ${
                  isHovered ? '' : 'filter grayscale'
                }`}
              />
            </div>
            
            {/* Scrolling Mockup Below Navbar */}
            <div className="relative overflow-hidden">
              <img 
                src="/conquerMockup.png" 
                alt="Conquer App Mockup" 
                className={`w-full object-cover transition-all duration-7000 ease-out ${
                  isHovered 
                    ? 'transform -translate-y-32 md:-translate-y-190' 
                    : 'transform translate-y-0 filter grayscale'
                }`}
                style={{
                  minHeight: '250px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 