"use client"

import { useEffect, useRef, useState } from "react"
import { TbX, TbArrowsMaximize } from "react-icons/tb"

interface Experience {
  id: string
  image: string
  title: string
  description: string
  orientation: 'horizontal' | 'vertical'
}

export function OtherExperiencesSection() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalAnimating, setIsModalAnimating] = useState(false)
  
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const experiences: Experience[] = [
    {
      id: "brla",
      image: "/brla.png",
      title: "BRLA",
      description: "A project of rebranding and rebuilding a app for a brazillian stable coin.",
      orientation: "horizontal"
    },
    {
      id: "looli",
      image: "/looli.png", 
      title: "Looli",
      description: "An evolution of Zeca. It became a app to integrate into your routine.",
      orientation: "vertical"
    },
    {
      id: "joorib2c",
      image: "/jooriB2c.png",
      title: "Joori B2C",
      description: "The B2C side of Joori. It's an app focused on small legal claims that don't involve lawyers.",
      orientation: "vertical"
    },
    {
      id: "oxlp",
      image: "/0xLP.png",
      title: "0xLP",
      description: "The landing page we built to 0xcarbon.",
      orientation: "horizontal"
    },
    {
      id: "stackos",
      image: "/stackOS.png",
      title: "StackOS",
      description: "Sistema operacional em nuvem que simplifica o desenvolvimento e deployment de aplicações, otimizando workflows para equipes de desenvolvimento.",
      orientation: "horizontal"
    },
    {
      id: "zecahub",
      image: "/zecaHub.png",
      title: "Zeca Hub",
      description: "A coding product that would use our AI, something similar to whats now cursor.",
      orientation: "vertical"
    }
  ]

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const getAnimationClass = (elementId: string, delay: number = 0) => {
    const isVisible = visibleElements.has(elementId)
    const baseClasses = "transition-all duration-1000 ease-out"
    const delayClass = delay > 0 ? `delay-${delay}` : ''
    
    return `${baseClasses} ${delayClass} ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`
  }

  const openModal = (experience: Experience) => {
    setSelectedExperience(experience)
    setIsModalAnimating(true)
    setTimeout(() => setIsModalOpen(true), 50)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setIsModalAnimating(false)
      setSelectedExperience(null)
    }, 400)
  }

  const renderGridItem = (experience: Experience, gridClass: string) => (
    <div
      key={experience.id}
      className={`${gridClass} cursor-pointer`}
      onClick={() => openModal(experience)}
    >
      <div className="relative border-[19px] border-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full max-h-[400px] bg-gray-100">
        <img 
          src={experience.image}
          alt={experience.title}
          className={`w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500 ${
            experience.orientation === 'vertical' 
              ? 'object-contain object-center' 
              : 'object-cover object-center'
          }`}
        />
        
        {/* Maximize Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-500">
            <TbArrowsMaximize className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <section className="w-full py-24 ">
        <div className="max-w-[900px] mx-auto px-6">
          {/* Title */}
          <div 
            ref={titleRef}
            className={`mb-16 ${getAnimationClass('title')}`}
          >
            <h2 className="text-5xl uppercase font-extrabold font-kanit text-strong-gray">
              + OTHER EXPERIENCES
            </h2>
          </div>

          {/* Grid */}
          <div 
            ref={gridRef}
            className={`space-y-8 ${getAnimationClass('grid', 400)}`}
          >
            {/* Line 1: brla.png (horizontal), looli.png (vertical) */}
            <div className="grid grid-cols-3 gap-6 h-[400px]">
              {renderGridItem(experiences[0], "col-span-2")}
              {renderGridItem(experiences[1], "col-span-1")}
            </div>

            {/* Line 2: joorib2c.png (vertical), 0xLP.png (horizontal) */}
            <div className="grid grid-cols-3 gap-6 h-[400px]">
              {renderGridItem(experiences[2], "col-span-1")}
              {renderGridItem(experiences[3], "col-span-2")}
            </div>

            {/* Line 3: stackOS.png (horizontal), zecaHub.png (vertical) */}
            <div className="grid grid-cols-3 gap-6 h-[400px]">
              {renderGridItem(experiences[4], "col-span-2")}
              {renderGridItem(experiences[5], "col-span-1")}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {(isModalAnimating || isModalOpen) && selectedExperience && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-400 ease-out ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-400 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Modal Content */}
          <div 
            className={`relative w-full h-full flex flex-col transition-all duration-500 ease-out transform ${
              isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className={`absolute top-8 right-8 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 transform ${
                isModalOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-45'
              }`}
            >
              <TbX className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div 
                className={`max-w-4xl max-h-[70vh] border-[19px] border-white shadow-2xl overflow-hidden transition-all duration-600 ease-out transform ${
                  isModalOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Description Section with Gradient */}
            <div 
              className={`relative transition-all duration-700 ease-out transform ${
                isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`} 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent transition-all duration-500 ${
                isModalOpen ? 'opacity-100' : 'opacity-0'
              }`} />
              
              {/* Content */}
              <div className="relative z-10 p-8 pb-12">
                <div className="max-w-4xl mx-auto text-center">
                  <h3 className={`text-4xl font-extrabold text-white mb-6 font-kanit transition-all duration-600 ease-out transform ${
                    isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {selectedExperience.title}
                  </h3>
                  <p className={`text-lg text-gray-200 leading-relaxed font-light max-w-3xl mx-auto transition-all duration-700 ease-out transform ${
                    isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}>
                    {selectedExperience.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 