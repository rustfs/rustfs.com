'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { ArrowUpRightIcon, MailIcon, MessageCircleIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import HomeSectionHeader from './home-section-header'

interface ContactFormProps {
  sectionNumber?: string;
}

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Portugal',
  'Ireland',
  'Japan',
  'South Korea',
  'Singapore',
  'Hong Kong',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Argentina',
  'Chile',
  'South Africa',
  'United Arab Emirates',
  'Saudi Arabia',
  'Israel',
  'Turkey',
  'Russia',
  'Other'
]

const CONTACT_CHANNELS = [
  {
    title: 'Email',
    description: 'For deployment planning, migration support, and enterprise requirements.',
    href: 'mailto:hello@rustfs.com',
    value: 'hello@rustfs.com',
    icon: MailIcon
  },
  {
    title: 'GitHub',
    description: 'For issues, discussions, pull requests, and open-source roadmap tracking.',
    href: 'https://github.com/rustfs/rustfs',
    value: 'rustfs/rustfs',
    icon: GitHubIcon
  },
  {
    title: 'Discord',
    description: 'For community questions and lightweight technical discussion.',
    href: 'https://discord.gg/NcKBCEJp6P',
    value: 'Join the community',
    icon: MessageCircleIcon
  }
]

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export default function ContactForm({ sectionNumber }: ContactFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    message: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token)
  }

  const handleHCaptchaExpire = () => {
    setHCaptchaToken(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!hCaptchaToken) {
      setSubmitStatus('error')
      alert('Please complete the captcha verification')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '6646b46d-5e9e-4cf4-99fd-701b15c8bf6e',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || undefined,
          country: formData.country,
          company: formData.company,
          message: formData.message,
          'h-captcha-response': hCaptchaToken,
          from_name: 'RustFS Contact Form'
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          company: '',
          message: ''
        })
        setHCaptchaToken(null)
        captchaRef.current?.resetCaptcha()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y border-border bg-muted/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber={sectionNumber}
          eyebrow="Contact channel"
          title="Contact Us"
          description="Get in touch with the RustFS team for deployment planning, migration support, and enterprise requirements."
          headingLevel={1}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
          <form
            onSubmit={handleSubmit}
            className="motion-card min-w-0 border border-border bg-card p-6 sm:p-8"
          >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-foreground">
                First Name <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full text-foreground"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-foreground">
                Last Name <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full text-foreground"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Business Email <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-foreground"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                Business Phone <span className="text-muted-foreground text-sm">(Optional)</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., +1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-foreground"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-medium text-foreground">
                Country <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <Select
                name="country"
                required
                value={formData.country}
                onValueChange={(value) => setFormData((previous) => ({ ...previous, country: value }))}
              >
                <SelectTrigger id="country" className="w-full text-foreground">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                Company <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Enter your company name"
                value={formData.company}
                onChange={handleChange}
                className="w-full text-foreground"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
              Message <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Please tell us about your inquiry, requirements, or how we can help you. Include any specific details about your use case, expected scale, or technical requirements."
              value={formData.message}
              onChange={handleChange}
              className="w-full text-foreground"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <HCaptcha
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              onVerify={handleHCaptchaVerify}
              onExpire={handleHCaptchaExpire}
              ref={captchaRef}
              reCaptchaCompat={false}
            />
          </div>

          {submitStatus === 'success' && (
            <div className="mt-6 bg-success/10 p-4 dark:bg-success/20">
              <p className="text-sm font-medium text-success">
                Thank you for your message! We&apos;ll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 bg-destructive/10 p-4 dark:bg-destructive/20">
              <p className="text-sm font-medium text-destructive">
                Something went wrong. Please try again later.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="h-12 min-w-56 px-6 text-sm font-semibold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
          </form>

          <div className="grid border border-border bg-card/70 sm:grid-cols-3 lg:grid-cols-1">
            {CONTACT_CHANNELS.map((channel) => {
              const Icon = channel.icon

              return (
                <a
                  key={channel.title}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative flex min-h-48 flex-col justify-between border-b border-border p-6 transition-colors hover:bg-muted/50 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="inline-flex size-10 shrink-0 items-center justify-center bg-muted text-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <p className="truncate font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                        {channel.title}
                      </p>
                    </div>
                    <ArrowUpRightIcon className="size-4 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {channel.description}
                    </p>
                    <p className="mt-5 text-sm font-semibold text-foreground">
                      {channel.value}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
