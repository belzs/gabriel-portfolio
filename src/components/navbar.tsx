"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ExternalLink, Download, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/translations"
import { useState } from "react"

const languageLabels = {
  en: 'EN',
  pt: 'PT',
  es: 'ES'
}

const languageNames = {
  en: 'English',
  pt: 'Português', 
  es: 'Español'
}

export function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 px-4 sm:px-6 py-4 z-50">
      <div className="max-w-[900px] mx-auto flex items-center justify-between">
        {/* Left side - Name and title */}
        <div className="flex items-center">
          <Link href="/" className="text-sm sm:text-lg text-gray-900 hover:text-gray-700 transition-colors">
            <h1>
              <span className="hidden sm:inline">Gabriel H. Nehls, </span>
              <span className="sm:hidden">G. Nehls, </span>
              <span className="font-bold">{t('jobTitle', language)}</span>
            </h1>
          </Link>
        </div>

        {/* Right side - Navigation items */}
        <div className="flex items-center space-x-2">
          {/* Cases - Always visible */}
          <Button 
            variant="outline" 
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-none text-sm mr-4 sm:mr-0"
            asChild
          >
            <Link href="/cases">
              {t('cases', language)}
            </Link>
          </Button>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2">
            {/* LinkedIn */}
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              asChild
            >
              <a 
                href="https://www.linkedin.com/in/gabriel-henrique-nehls-644521156/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                LinkedIn
              </a>
            </Button>

            {/* Download CV */}
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t('downloadCV', language)}
            </Button>

            {/* Language dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {languageLabels[language]}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {Object.entries(languageNames).map(([code, name]) => (
                  <DropdownMenuItem 
                    key={code}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setLanguage(code as 'en' | 'pt' | 'es')}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button - Hidden on desktop */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Shown when hamburger is clicked */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex flex-col space-y-3">
            {/* LinkedIn */}
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full justify-start"
              asChild
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a 
                href="https://www.linkedin.com/in/gabriel-henrique-nehls-644521156/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>

            {/* Download CV */}
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('downloadCV', language)}
            </Button>

            {/* Language Selection */}
            <div className="pt-2 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Language</div>
              <div className="flex gap-2">
                {Object.entries(languageNames).map(([code, name]) => (
                  <Button
                    key={code}
                    variant={language === code ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLanguage(code as 'en' | 'pt' | 'es')
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-xs"
                  >
                    {languageLabels[code as keyof typeof languageLabels]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
