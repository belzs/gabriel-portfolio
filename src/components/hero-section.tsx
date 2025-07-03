"use client"

import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/translations"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const { language } = useLanguage()
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  
  const imageRef = useRef<HTMLDivElement>(null)
  const welcomeRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const experienceBoxesRef = useRef<HTMLDivElement>(null)

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

    // Observe all animated elements
    const elementsToObserve = [
      { ref: imageRef, id: 'image' },
      { ref: welcomeRef, id: 'welcome' },
      { ref: titleRef, id: 'title' },
      { ref: descriptionRef, id: 'description' },
      { ref: experienceBoxesRef, id: 'experience-boxes' },
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

  const getBoxAnimationClass = (index: number, elementId: string) => {
    const isVisible = visibleElements.has(elementId)
    const delay = 100 + (index * 100) // 100ms, 200ms, 300ms delays
    
    return `transition-all duration-800 ease-out delay-${delay} ${
      isVisible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-4 scale-95'
    }`
  }

  return (
    <section className="w-full pb-8 pt-16 sm:pb-12 sm:pt-24 lg:pb-16 lg:pt-32">
      <div className="max-w-[900px] mx-auto px-6 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-12 lg:gap-20">
          {/* Left side - Image */}
          <div 
            ref={imageRef}
            className={`flex-shrink-0 mx-auto lg:mx-0 ${getAnimationClass('image', 0, 'left')}`}
          >
            <div className="border-[8px] sm:border-[12px] lg:border-[19px] border-white shadow-2xl overflow-hidden mt-10 sm:mt-0">
              <img 
                src="/gabriel.png" 
                alt="Gabriel" 
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col gap-2 text-left">
            {/* Welcome text */}
            <p 
              ref={welcomeRef}
              className={`text-xs sm:text-sm text-gray-700 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4 ${getAnimationClass('welcome', 200, 'right')}`}
            >
              {t('welcome', language)}
            </p>

            {/* Main title */}
            <h1 
              ref={titleRef}
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-strong-gray mb-4 sm:mb-6 font-kanit ${getAnimationClass('title', 400, 'right')}`}
            >
              {t('heroTitle', language)}
            </h1>

            {/* Subtitle */}
            <div 
              ref={descriptionRef}
              className={getAnimationClass('description', 600, 'right')}
            >
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 w-full max-w-[400px] font-light mb-2 leading-relaxed">
                {t('heroDescription1', language)}
              </p>
              <p 
                className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-[400px] font-light mb-6 sm:mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: t('heroDescription2', language).replace('<strong>', '<span class="font-bold">').replace('</strong>', '</span>').replace('<strong>', '<span class="font-bold">').replace('</strong>', '</span>')
                }}
              />
            </div>

            {/* Experience boxes */}
            <div 
              ref={experienceBoxesRef}
              className="flex gap-3 sm:gap-4 lg:gap-6"
            >
              {[
                { years: '6', skill: 'UX' },
                { years: '6', skill: 'UI' },
                { years: '2', skill: 'DEV', note: ' (?)' }
              ].map((item, index) => (
                <div 
                  key={item.skill}
                  className={`flex-1 min-w-0 h-20 sm:h-24 lg:h-28 gap-2 sm:gap-3 lg:gap-4 bg-strong-gray text-white px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex flex-col justify-start items-start text-left ${getBoxAnimationClass(index, 'experience-boxes')}`}
                >
                  <div className="text-xs sm:text-sm mb-1 tracking-wide">
                    {item.years} {t('years', language)}{item.note || ''}
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold font-kanit tracking-widest">
                    {item.skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 