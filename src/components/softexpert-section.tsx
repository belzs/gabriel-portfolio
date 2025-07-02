"use client"

import { useEffect, useRef, useState } from "react"
import { TbSearch, TbBulb, TbLayout } from "react-icons/tb"

export function SoftexpertSection() {
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
    { icon: TbSearch, text: "Research" },
    { icon: TbBulb, text: "Ideation" },
    { icon: TbLayout, text: "Prototyping" }
  ]

  return (
    <section className="w-full py-24 ">
      <div className="max-w-[900px] mx-auto px-6">
        
        {/* Company Title and Process Steps - Titles on Left */}
        <div 
          ref={companyTitleRef}
          className={`flex items-center justify-between gap-8 mb-18 ${getAnimationClass('company', 400)}`}
        >
          {/* Title and Subtitle on the Left */}
          <div className="flex-1 text-left">
            <div 
              ref={subtitleRef}
              className={`mb-4 ${getAnimationClass('subtitle', 200)}`}
            >
              <p className="text-sm text-gray-600 uppercase tracking-[0.3em] font-light">
                BIG ERP TECH COMPANY
              </p>
            </div>
            <h3 className="text-4xl font-extrabold text-strong-gray font-kanit">
              SOFTEXPERT
            </h3>
          </div>

          {/* Process Steps on the Right */}
          <div className="flex gap-4">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div 
                  key={index}
                  className="flex flex-col gap-2 p-3 border border-gray-300 min-w-[80px]"
                >
                  <IconComponent strokeWidth={1} className="w-7 h-7 text-gray-600" />
                  <span className="text-xs text-gray-600 text-center font-light">
                    {step.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mockup Container - Simple without mobile mockup or scrolling */}
        <div className="relative">
          <div 
            ref={mockupRef}
            className={`border-[19px] border-white relative shadow-xl hover:shadow-2xl transition-all  duration-500 overflow-hidden group ${getAnimationClass('mockup', 600)}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src="/softexpertMockup.png" 
              alt="SoftExpert Application Mockup" 
              className={`w-full object-cover transition-all duration-500 ${
                isHovered ? '' : 'filter grayscale'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
} 