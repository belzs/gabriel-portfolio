"use client"

import { useEffect, useRef, useState } from "react"
import { TbHeart } from "react-icons/tb"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/translations"

export function NautixSection() {
  const { language } = useLanguage()
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [isHovered, setIsHovered] = useState(false)
  
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
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
      { ref: contentRef, id: 'content' },
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

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        
        {/* Responsive layout - Stacked on mobile, side by side on desktop */}
        <div 
          ref={contentRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${getAnimationClass('content')}`}
        >
          {/* Content */}
          <div className="flex flex-col text-left">
            {/* Subtitle */}
            <div 
              ref={subtitleRef}
              className={`mb-3 sm:mb-4 ${getAnimationClass('subtitle', 200)}`}
            >
              <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-[0.3em] font-light">
                {t('personalProject', language)}
              </p>
            </div>

            {/* Title with Heart Icon */}
            <div 
              ref={titleRef}
              className={`mb-6 sm:mb-8 ${getAnimationClass('title', 400)}`}
            >
              <div className="flex items-center justify-start gap-3 sm:gap-4 mb-2">
                <TbHeart strokeWidth={1.5} className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 text-gray-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-strong-gray font-kanit leading-tight">
                    {t('nautixTitle1', language)}
                  </h3>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-strong-gray font-kanit leading-tight">
                    {t('nautixTitle2', language)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-600 leading-relaxed font-light text-justify">
              <p className="text-sm sm:text-base">
                {t('nautixDescription', language)}
              </p>
            </div>
          </div>

          {/* Mobile Mockup */}
          <div 
            ref={mockupRef}
            className={`flex items-center justify-center ${getAnimationClass('mockup', 600, 'right')}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src="/nautixMobileMockup.png" 
              alt="Nautix Mobile Application Mockup" 
              className={`h-auto w-full max-w-[300px] sm:max-w-[350px] md:max-w-none md:max-h-[500px] object-contain hover:scale-100 transition-all duration-500 ${
                isHovered ? '' : 'filter grayscale'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
} 