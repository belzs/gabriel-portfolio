"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ExternalLink, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/translations"

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

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 px-6 py-4 z-50">
      <div className="max-w-[900px] mx-auto flex items-center justify-between">
        {/* Left side - Name and title */}
        <div className="flex items-center">
          <Link href="/" className="text-lg text-gray-900 hover:text-gray-700 transition-colors">
            <h1>
              Gabriel H. Nehls, <span className="font-bold">{t('jobTitle', language)}</span>
            </h1>
          </Link>
        </div>

        {/* Right side - Navigation items */}
        <div className="flex items-center space-x-2">
          {/* Cases */}
          <Button 
            variant="outline" 
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-none"
            asChild
          >
            <Link href="/cases">
              {t('cases', language)}
            </Link>
          </Button>

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
      </div>
    </nav>
  )
}
