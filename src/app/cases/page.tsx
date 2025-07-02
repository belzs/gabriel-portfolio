"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaRegSquareFull } from "react-icons/fa6"
import { TbExternalLink } from "react-icons/tb"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/translations"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CasesPage() {
  const { language } = useLanguage()
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  
  const titleRef = useRef<HTMLDivElement>(null)
  const case1Ref = useRef<HTMLDivElement>(null)
  const case2Ref = useRef<HTMLDivElement>(null)
  const case3Ref = useRef<HTMLDivElement>(null)
  const case4Ref = useRef<HTMLDivElement>(null)

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
      { ref: case1Ref, id: 'case1' },
      { ref: case2Ref, id: 'case2' },
      { ref: case3Ref, id: 'case3' },
      { ref: case4Ref, id: 'case4' },
    ]

    elementsToObserve.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-animate-id', id)
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

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

  const caseData = [
    {
      number: "CASE 1",
      title: "NETZ",
      image: "/netzCase.png",
      href: "/cases/netz",
      ref: case1Ref,
      id: 'case1'
    },
    {
      number: "CASE 2", 
      title: "ZECA",
      image: "/zecaCase.png",
      href: "/cases/zeca",
      ref: case2Ref,
      id: 'case2'
    },
    {
      number: "CASE 3",
      title: "JOORI", 
      image: "/jooriCase.png",
      href: "/cases/joori",
      ref: case3Ref,
      id: 'case3'
    },
    {
      number: "CASE 4",
      title: "ALORE",
      image: "/aloreCase.png",
      href: "/cases/alore",
      ref: case4Ref,
      id: 'case4'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="w-full pt-32 pb-24">
        <div className="max-w-[1000px] mx-auto px-6">
          {/* Page Title */}
          <div 
            ref={titleRef}
            className={`text-start mb-16 ${getAnimationClass('title')}`}
          >
            <h1 className="text-6xl uppercase font-extrabold font-kanit leading-snug text-strong-gray">
              {t('casesPageTitle', language)}
            </h1>
          </div>

          {/* Cases Grid */}
          <div className="space-y-8">
            {caseData.map((caseItem, index) => (
              <Link
                key={index}
                href={caseItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  ref={caseItem.ref}
                  className={`group w-full max-h-[200px] bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer ${getAnimationClass(caseItem.id, index * 200)}`}
                >
                  <div className="flex h-full">
                    {/* Left side - Text content (1/3 width) */}
                    <div className="w-1/3 flex flex-col justify-center items-start p-8 bg-white relative">
                      <div className="flex items-center gap-2 mb-2">
                        <FaRegSquareFull className="text-xs text-gray-600" />
                        <span className="text-sm text-gray-600 uppercase tracking-wider font-light">
                          {caseItem.number}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <h2 className="text-4xl font-extrabold text-strong-gray font-kanit">
                          {caseItem.title}
                        </h2>
                        <TbExternalLink className="w-6 h-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    
                    {/* Right side - Image (2/3 width) */}
                    <div className="w-2/3 h-full">
                      <img 
                        src={caseItem.image}
                        alt={`${caseItem.title} case study`}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 