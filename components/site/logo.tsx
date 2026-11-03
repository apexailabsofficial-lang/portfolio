import NextImage from 'next/image'

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Apex AI Labs home">
     <img 
        src="/brand/logo.png" 
        alt="Apex AI Labs Logo" 
        width={140} 
        height={40} 
        className="h-20 w-auto object-contain"
      />

    </a>
  )
}
