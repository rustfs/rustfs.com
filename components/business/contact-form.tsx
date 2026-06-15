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
import { useRef, useState } from 'react'
import HomeSectionHeader from './home-section-header'

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

interface ContactFormProps {
  sectionNumber?: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token)
  }

  const handleHCaptchaExpire = () => {
    setHCaptchaToken(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
      id='contact'
      className="relative overflow-hidden border-y border-border bg-muted/30 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber={sectionNumber}
          eyebrow="Contact channel"
          title="Contact Us"
          description="Get in touch with the RustFS team for deployment planning, migration support, and enterprise requirements."
        />

        <div className="mx-auto w-full max-w-3xl border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="px-5 py-3">Enterprise inquiry</span>
            <code className="border-l border-border px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-foreground">
              form.submit
            </code>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="country" className="mb-2 block text-sm font-medium text-foreground">
                  Country <span className="text-destructive" aria-hidden="true">*</span>
                </label>
                <Select
                  name="country"
                  required
                  value={formData.country}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
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

            <div>
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

            <div className="flex justify-center">
              <HCaptcha
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                onVerify={handleHCaptchaVerify}
                onExpire={handleHCaptchaExpire}
                ref={captchaRef}
                reCaptchaCompat={false}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="border border-success/30 bg-success/10 p-4 dark:bg-success/20">
                <p className="text-sm font-medium text-success">
                  Thank you for your message! We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="border border-destructive/30 bg-destructive/10 p-4 dark:bg-destructive/20">
                <p className="text-sm font-medium text-destructive">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="min-w-[200px] border border-primary h-12 px-6 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 active:bg-primary/80 active:text-primary-foreground/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
